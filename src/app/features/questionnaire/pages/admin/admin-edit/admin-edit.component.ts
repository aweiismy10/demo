import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

// Material Modules (請務必確認都有匯入)
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // 這是鑰匙2
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Models & Service
import { SurveyService } from '../../../services/survey.service';
import { QuestionType } from '../../../models/question-model';
import { QuestionnaireModel, SurveyStatus } from '../../../models/questionnaire-model';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatTabsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    MatIconModule, MatSelectModule, MatCheckboxModule,MatSnackBarModule
  ],
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  surveyForm!: FormGroup;
  selectedIndex = 0; // 控制目前在哪個分頁籤
  QuestionType = QuestionType; // 讓 HTML 可以用

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // 加入這行
  ) { }

  // 1. 在類別上方加入兩個變數來記錄狀態
  isEditMode = false;
  editId?: number;

  ngOnInit(): void {
    // 建立整份問卷的空表單結構 (原本的程式碼)
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      questions: this.fb.array([])
    });

    // 2. 檢查網址列有沒有帶 ID？ (判斷是編輯還是新增)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.editId = Number(idParam);
      this.loadSurveyData(this.editId); // 呼叫倒回資料的方法
    } else {
      // 如果是「新增」模式，預設先給他第一題空白的題目
      this.addQuestion();
    }
  }

  // 3. 【全新加入】把舊資料長回動態表單的神奇魔法
  loadSurveyData(id: number): void {
    this.surveyService.getQuestionnaireById(id).subscribe(data => {
      if (data) {
        // A. 先塞基本資料 (patchValue 可以直接處理單純的欄位)
        this.surveyForm.patchValue({
          title: data.title,
          description: data.description,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate)
        });

        // B. 動態長出題目與選項
        data.questions.forEach((q, qIndex) => {
          // 先建立這題的 FormGroup (先不加預設選項)
          const questionGroup = this.fb.group({
            questName: [q.questName, Validators.required],
            type: [q.type],
            required: [q.required],
            options: this.fb.array([]) // 這裡先留空，等一下用迴圈塞
          });

          this.questions.push(questionGroup); // 把這題推進大表單

          // 處理這題的選項
          const optionsArray = this.getOptions(qIndex);
          if (q.type !== QuestionType.Text && q.options) {
            // 如果是選擇題，就把舊選項一個一個建立 FormControl 推進去
            q.options.forEach(opt => {
              optionsArray.push(this.fb.control(opt.optionName, Validators.required));
            });
          }
        });
      } else {
        alert('找不到此問卷資料！');
        // 記得改成你的路徑
        this.router.navigate(['/questionnaire/admin/list']);
      }
    });
  }

  // 檢查 Tab 1 必填有沒有填好
  nextTab(): void {
    const basicInfoValid =
      this.surveyForm.get('title')?.valid &&
      this.surveyForm.get('description')?.valid &&
      this.surveyForm.get('startDate')?.valid &&
      this.surveyForm.get('endDate')?.valid;

    if (basicInfoValid) {
      this.selectedIndex = 1; // 跳到第二個 Tab (題目編輯)
    } else {
      this.surveyForm.markAllAsTouched();
      alert('請先填寫完問卷名稱與時間等必填欄位！');
    }
  }

  // 回到列表頁
  goBack(): void {
    this.router.navigate(['/questionnaire/admin/list']);
  }

  // ... 前面原有的程式碼保留 (ngOnInit, nextTab, goBack 等)

  // === 以下為新增的動態題目邏輯 ===

  // 1. 取得「題目陣列」的捷徑 (Getter)
  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  // 2. 新增一題
  addQuestion(): void {
    // 建立一個題目的 FormGroup
    const questionGroup = this.fb.group({
      questName: ['', Validators.required],
      type: [this.QuestionType.Single], // 預設單選
      required: [false],                // 預設非必填
      options: this.fb.array([
        this.fb.control('', Validators.required) // 預設給一個空選項
      ])
    });

    this.questions.push(questionGroup);
  }

  // 3. 刪除一題
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  // 4. 取得某題的「選項陣列」的捷徑
  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  // 5. 新增選項 (傳入題目的 Index)
  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.fb.control('', Validators.required));
  }

  // 6. 刪除選項 (傳入題目的 Index, 以及選項的 Index)
  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.getOptions(questionIndex);
    if (options.length > 1) {
      options.removeAt(optionIndex);
    } else {
      alert('選擇題至少要有一個選項喔！');
    }
  }

  // 當題型下拉選單改變時觸發
  onTypeChange(questionIndex: number, event: any): void {
    const selectedType = event.value;
    const optionsArray = this.getOptions(questionIndex);

    if (selectedType === QuestionType.Text) {
      // 如果是文字題，清空所有選項，這樣就不會觸發必填驗證了！
      optionsArray.clear();
    } else {
      // 如果切換回選擇題，且目前沒有半個選項，就自動補一個必填的空選項給它
      if (optionsArray.length === 0) {
        optionsArray.push(this.fb.control('', Validators.required));
      }
    }
  }

  // 儲存問卷
  saveSurvey(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      alert('請檢查是否有漏填的欄位！');
      return;
    }

    const formValue = this.surveyForm.value;
    const now = new Date().getTime();
    const start = new Date(formValue.startDate).getTime();
    const end = new Date(formValue.endDate).getTime();

    let calculatedStatus = SurveyStatus.NotStarted;
    if (now < start) calculatedStatus = SurveyStatus.NotStarted;
    else if (now > end) calculatedStatus = SurveyStatus.Ended;
    else calculatedStatus = SurveyStatus.Ongoing;

    // 組合 Model
    const surveyData: QuestionnaireModel = {
      id: this.isEditMode ? this.editId! : 0,
      title: formValue.title,
      description: formValue.description,
      status: calculatedStatus,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      questions: formValue.questions.map((q: any, index: number) => {
        return {
          questId: index + 1,
          questName: q.questName,
          type: q.type,
          required: q.required,
          options: q.type === QuestionType.Text ? [] : q.options.map((optName: string, oIndex: number) => ({
            code: oIndex + 1,
            optionName: optName
          }))
        };
      })
    };

    // === 重點修改這裡：配合 Service 的參數格式 ===
    // 判斷要呼叫 Create 還是 Update
    if (this.isEditMode && this.editId) {
      // 編輯模式：傳入 editId 以及 surveyData
      this.surveyService.updateQuestionnaire(this.editId, surveyData).subscribe(() => {
        // 取代 alert
        this.snackBar.open('問卷更新成功！', '關閉', {
          duration: 3000, // 3 秒後自動消失
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/questionnaire/admin/list']);
      });
    } else {
      // 新增模式：只傳入 surveyData
      this.surveyService.createQuestionnaire(surveyData).subscribe(() => {
        // 取代 alert
        this.snackBar.open('問卷建立成功！', '關閉', {
          duration: 3000,
        });
        this.router.navigate(['/questionnaire/admin/list']);
      });
    }
  }
}
