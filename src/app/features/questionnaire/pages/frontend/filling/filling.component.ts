import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Models & Service
import { SurveyService } from '../../../services/survey.service';
import { QuestionnaireModel } from '../../../models/questionnaire-model';
import { QuestionType } from '../../../models/question-model';
import { UserResponseModel } from '../../../models/user-response-model';

// Models & Service

@Component({
  selector: 'app-filling',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // 引入響應式表單模組
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
  QuestionType = QuestionType; // 讓 HTML 可以使用 Enum 判斷題型

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    // 1. 取得網址列的 ID
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadSurvey(Number(idParam));
    }
  }

  // 2. 載入問卷資料
  loadSurvey(id: number): void {
    this.surveyService.getQuestionnaireById(id).subscribe(data => {
      if (data) {
        this.survey = data;
        this.initForm(); // 資料回來後，開始建立表單
      } else {
        alert('找不到此問卷！');
        this.router.navigate(['/questionnaire/list']);
      }
    });
  }

  // 3. 初始化動態表單 (優化版：支援讀取暫存)
  initForm(): void {
    // A. 嘗試從 Session 抓取之前填過的暫存資料
    const sessionData = sessionStorage.getItem('temp_survey_response');
    let savedData: UserResponseModel|null = null;

    if (sessionData) {
      savedData = JSON.parse(sessionData);
      // 安全防呆：確保 Session 裡面的問卷 ID 跟現在這份問卷是同一份
      // 如果不是同一份（例如使用者填到一半跑去點另一份問卷），就不套用暫存
      if (savedData?.surveyId !== this.survey?.id) {
        savedData = null;
      }
    }

    // B. 建立基本資料欄位（如果有暫存就填入，沒有就給預設值）
    this.fillForm = this.fb.group({
      name: [savedData ? savedData.name : '', Validators.required],
      phone: [savedData ? savedData.phone : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [savedData ? savedData.email : '', [Validators.required, Validators.email]],
      age: [savedData ? savedData.age : ''],
      answers: this.fb.array([]) // 這裡用來放動態產生的題目答案
    });

    // C. 根據題目動態產生對應數量的 FormControl
    if (this.survey && this.survey.questions) {
      const answersArray = this.fillForm.get('answers') as FormArray;

      this.survey.questions.forEach(q => {
        // 找出這題之前存過的答案 (如果有的話) // 03/01 修改 1: q.questId 改成 q.id
        const previousAnswer = savedData?.answers.find((a: any) => a.questionId === q.id);

        // 決定初始值：有舊答案用舊的，沒有舊答案則多選給 []，單選/文字給 ''
        let initialValue: string | number[] = q.type === QuestionType.Multi ? [] : '';
        if (previousAnswer) {
          initialValue = previousAnswer.answer;
        }

        // 判斷是否必填 // 03/01 修改 2: q.required 改成 q.isRequired
        const validators = q.isRequired ? [Validators.required] : [];

        // 把這一題加進 FormArray 裡面
        answersArray.push(this.fb.group({
          questionId: [q.id], // 03/01 修改 3: q.questId 改成 q.id
          answer: [initialValue, validators]
        }));
      });
    }
  }

  // 取得 answers FormArray 方便在 HTML 中使用
  get answers(): FormArray {
    return this.fillForm.get('answers') as FormArray;
  }

// --- 讓 HTML 判斷要不要打勾 ---
  isChecked(questionIndex: number, optionCode: number): boolean {
    const answerControl = this.answers.at(questionIndex).get('answer');
    const currentValue: number[] = answerControl?.value || [];
    // 如果目前的陣列裡面有這個選項的 Code，就回傳 true (打勾)
    return currentValue.includes(optionCode);
  }

  // --- onCheckboxChange 方法 ---
  onCheckboxChange(event: any, index: number, optionCode: number): void {
    const answerControl = this.answers.at(index).get('answer');
    const currentValue: number[] = answerControl?.value || [];

    if (event.checked) {
      // 勾選：先檢查陣列裡面是不是已經有了，沒有才加進去 (防止薯條薯條的問題)
      if (!currentValue.includes(optionCode)) {
        answerControl?.setValue([...currentValue, optionCode]);
      }
    } else {
      // 取消勾選：從陣列移除
      answerControl?.setValue(currentValue.filter(val => val !== optionCode));
    }
  }
  // 點擊下一步 (前往確認頁)
  onSubmit(): void {
    if (this.fillForm.valid) {
      // 1. 取得表單填寫的資料
      const formData = this.fillForm.value;

      // 🕒 小工具：把當下時間轉成 'YYYY-MM-DD' 字串格式
      const d = new Date();
      const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;


      // 2. 組合出完全符合 UserResponseModel 格式的物件
      const responseData: UserResponseModel = {
        surveyId: this.survey!.id!, // 加上 ! 確保有值
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        age: formData.age,
        submissionDate: dateString, // 這裡已經變字串了，紅線解除！
        answers: formData.answers // 直接存原始的表單答案
      };

      // 3. 存入 SessionStorage (瀏覽器分頁關閉就會消失的暫存)
      sessionStorage.setItem('temp_survey_response', JSON.stringify(responseData));

      // 4. 跳轉至確認頁
      this.router.navigate(['/questionnaire/confirm']);

    } else {
      this.fillForm.markAllAsTouched();
      alert('請檢查是否有漏填的必填欄位！');
    }
  }

  // 返回列表
  goBack(): void {
    this.router.navigate(['/questionnaire/list']);
  }
}
