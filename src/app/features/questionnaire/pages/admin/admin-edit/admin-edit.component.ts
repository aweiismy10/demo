import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SurveyService } from '../../../services/survey.service';
import { QuestionType } from '../../../models/question-model';
import { QuestionnaireModel } from '../../../models/questionnaire-model';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatTabsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    MatIconModule, MatSelectModule, MatCheckboxModule, MatSnackBarModule
  ],
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  isEditMode = false;
  editId?: number;
  surveyForm!: FormGroup;
  selectedIndex = 0;
  QuestionType = QuestionType;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      questions: this.fb.array([])
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.editId = Number(idParam);
      this.loadSurveyData(this.editId);
    } else {
      this.addQuestion();
    }
  }

  loadSurveyData(id: number): void {
    this.surveyService.getQuestionnaireById(id).subscribe(data => {
      if (data) {
        this.surveyForm.patchValue({
          title: data.title,
          description: data.description,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate)
        });

        data.questions.forEach((q, qIndex) => {
          const questionGroup = this.fb.group({
            questName: [q.questName, Validators.required],
            type: [q.type],
            required: [q.isRequired],
            options: this.fb.array([])
          });

          this.questions.push(questionGroup);

          const optionsArray = this.getOptions(qIndex);
          if (q.type !== QuestionType.Text && q.options) {
            q.options.forEach(opt => {
              optionsArray.push(this.fb.control(opt.optionName, Validators.required));
            });
          }
        });
      } else {
        alert('找不到此問卷資料！');
        this.router.navigate(['/questionnaire/admin/list']);
      }
    });
  }

  nextTab(): void {
    const basicInfoValid =
      this.surveyForm.get('title')?.valid &&
      this.surveyForm.get('description')?.valid &&
      this.surveyForm.get('startDate')?.valid &&
      this.surveyForm.get('endDate')?.valid;

    if (basicInfoValid) {
      this.selectedIndex = 1;
    } else {
      this.surveyForm.markAllAsTouched();
      alert('請先填寫完問卷名稱與時間等必填欄位！');
    }
  }

  goBack(): void {
    this.router.navigate(['/questionnaire/admin/list']);
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      questName: ['', Validators.required],
      type: [this.QuestionType.Single],
      required: [false],
      options: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    } else {
      alert('問卷至少要有一個題目喔！');
    }
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    const options = this.getOptions(questionIndex);
    const hasEmptyOption = options.controls.some(
      control => !control.value || control.value.trim() === ''
    );

    if (hasEmptyOption) {
      alert('請先填寫現有的空白選項，再新增新選項');
      return;
    }
    options.push(this.fb.control('', Validators.required));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.getOptions(questionIndex);
    if (options.length > 1) {
      options.removeAt(optionIndex);
    } else {
      alert('選擇題至少要有一個選項喔！');
    }
  }

  onTypeChange(questionIndex: number, event: any): void {
    const selectedType = event.value;
    const optionsArray = this.getOptions(questionIndex);

    if (selectedType === QuestionType.Text) {
      optionsArray.clear();
    } else {
      if (optionsArray.length === 0) {
        optionsArray.push(this.fb.control('', Validators.required));
      }
    }
  }

  // ✅ 加入 publish 參數：true = 儲存並發佈，false = 僅儲存草稿
  saveSurvey(publish: boolean): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      alert('請檢查是否有漏填的欄位！');
      return;
    }

    const formValue = this.surveyForm.value;

    const formatDate = (date: Date) => {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${d.getFullYear()}-${month}-${day}`;
    };

    const surveyData: QuestionnaireModel = {
      title: formValue.title,
      description: formValue.description,
      startDate: formatDate(formValue.startDate),
      endDate: formatDate(formValue.endDate),
      isPublished: publish, // ✅ 由呼叫端決定是否發佈
      questions: formValue.questions.map((q: any) => ({
        questName: q.questName,
        type: q.type,
        isRequired: q.required,
        options: q.type === QuestionType.Text ? [] : q.options.map((optName: string, oIndex: number) => ({
          code: oIndex + 1,
          optionName: optName
        }))
      }))
    };

    const successMessage = publish ? '問卷發佈成功！' : '草稿儲存成功！';

    if (this.isEditMode && this.editId) {
      this.surveyService.updateQuestionnaire(this.editId, surveyData).subscribe(() => {
        this.snackBar.open(successMessage, '關閉', { duration: 3000 });
        this.router.navigate(['/questionnaire/admin/list']);
      });
    } else {
      this.surveyService.createQuestionnaire(surveyData).subscribe({
        next: () => {
          this.snackBar.open(successMessage, '關閉', { duration: 3000 });
          this.router.navigate(['/questionnaire/admin/list']);
        },
        error: (err) => {
          console.error('儲存失敗:', err);
          alert('儲存失敗，請檢查 F12 Console 的錯誤訊息！');
        }
      });
    }
  }
}
