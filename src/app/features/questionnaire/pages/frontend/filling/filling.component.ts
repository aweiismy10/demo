import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SurveyService } from '../../../services/survey.service';
import { QuestionnaireModel } from '../../../models/questionnaire-model';
import { QuestionType } from '../../../models/question-model';
import { UserResponseModel } from '../../../models/user-response-model';

@Component({
  selector: 'app-filling',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './filling.component.html',
  styleUrl: './filling.component.scss'
})
export class FillingComponent implements OnInit {
  survey?: QuestionnaireModel;
  fillForm!: FormGroup;
  QuestionType = QuestionType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadSurvey(Number(idParam));
    }
  }

  loadSurvey(id: number): void {
    this.surveyService.getQuestionnaireById(id).subscribe(data => {
      if (data) {
        this.survey = data;
        this.initForm();
      } else {
        alert('找不到此問卷！');
        this.router.navigate(['/questionnaire/list']);
      }
    });
  }

  initForm(): void {
    const sessionData = sessionStorage.getItem('temp_survey_response');
    let savedData: UserResponseModel | null = null;

    if (sessionData) {
      savedData = JSON.parse(sessionData);
      if (savedData?.surveyId !== this.survey?.id) {
        savedData = null; // 確保暫存是同一份問卷
      }
    }

    this.fillForm = this.fb.group({
      name: [savedData ? savedData.name : '', Validators.required],
      phone: [savedData ? savedData.phone : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [savedData ? savedData.email : '', [Validators.required, Validators.email]],
      age: [savedData ? savedData.age : ''],
      answers: this.fb.array([])
    });

    if (this.survey?.questions) {
      const answersArray = this.fillForm.get('answers') as FormArray;

      this.survey.questions.forEach(q => {
        const previousAnswer = savedData?.answers.find((a: any) => a.questionId === q.id);
        const initialValue = previousAnswer ? previousAnswer.answer : (q.type === QuestionType.Multi ? [] : '');
        const validators = q.isRequired ? [Validators.required] : [];

        answersArray.push(this.fb.group({
          questionId: [q.id],
          answer: [initialValue, validators]
        }));
      });
    }
  }

  get answers(): FormArray {
    return this.fillForm.get('answers') as FormArray;
  }

  isChecked(questionIndex: number, optionCode: number): boolean {
    const currentValue: number[] = this.answers.at(questionIndex).get('answer')?.value || [];
    return currentValue.includes(optionCode);
  }

  onCheckboxChange(event: any, index: number, optionCode: number): void {
    const answerControl = this.answers.at(index).get('answer');
    const currentValue: number[] = answerControl?.value || [];

    if (event.checked) {
      if (!currentValue.includes(optionCode)) {
        answerControl?.setValue([...currentValue, optionCode]);
      }
    } else {
      answerControl?.setValue(currentValue.filter(val => val !== optionCode));
    }
  }

  onSubmit(): void {
    if (this.fillForm.valid) {
      const formData = this.fillForm.value;
      const d = new Date();
      const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      const responseData: UserResponseModel = {
        surveyId: this.survey!.id!,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        age: formData.age,
        submissionDate: dateString,
        answers: formData.answers
      };

      sessionStorage.setItem('temp_survey_response', JSON.stringify(responseData));
      this.router.navigate(['/questionnaire/confirm']);
    } else {
      this.fillForm.markAllAsTouched();
      alert('請檢查是否有漏填的必填欄位！');
    }
  }

  goBack(): void {
    this.router.navigate(['/questionnaire/list']);
  }
}
