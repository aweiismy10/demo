import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SurveyService } from '../../../services/survey.service';
import { UserResponseModel } from '../../../models/user-response-model';
import { QuestionnaireModel } from '../../../models/questionnaire-model';
import { QuestionType } from '../../../models/question-model';


@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {
  responseData?: UserResponseModel;
  survey?: QuestionnaireModel;
  QuestionType = QuestionType;

  constructor(
    private router: Router,
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    // 1. 從 SessionStorage 讀取資料
    const sessionData = sessionStorage.getItem('temp_survey_response');

    if (sessionData) {
      this.responseData = JSON.parse(sessionData);

      // 2. 用 Session 裡的 surveyId 拿回原本的問卷題目，用來對照顯示
      this.surveyService.getQuestionnaireById(this.responseData!.surveyId).subscribe(data => {
        this.survey = data;
      });
    } else {
      // 如果沒有 Session 資料(例如使用者直接輸入網址)，就把他踢回列表頁
      alert('無暫存資料，請重新填寫問卷！');
      this.router.navigate(['/questionnaire/list']);
    }
  }

  // 輔助方法：根據題目的 ID 與選項的 Code，找出選項的顯示文字
  getOptionName(questionId: number, code: number): string {
    const question = this.survey?.questions.find(q => q.id === questionId);
    if (question && question.options) {
      const option = question.options.find(opt => opt.code === code);
      return option ? option.optionName : '';
    }
    return '';
  }

  // 輔助方法：根據題目 ID 找出使用者的答案
  getAnswerByQuestionId(questionId: number): any {
    return this.responseData?.answers.find(a => a.questionId === questionId);
  }

  // 修改(或取消)鈕:會回到填寫頁 [cite: 127]
  onEdit(): void {
    if (confirm('確定要返回修改嗎？')) {
      // 帶著原本的 ID 回到作答頁
      this.router.navigate(['/questionnaire/filling', this.responseData?.surveyId]);
    }
  }

  // 送出鈕:寫到資料庫,並跳回問卷列表
  onSubmit(): void {
    // 1. 從 sessionStorage 拿出剛才填寫的暫存資料
    const sessionData = sessionStorage.getItem('temp_survey_response');

    if (sessionData) {
      const responseData: UserResponseModel = JSON.parse(sessionData);

      // 🕒 確保送出前的時間是最新的 (同樣轉成字串)
      const d = new Date();
      responseData.submissionDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      // 🛠️ 格式轉換大挪移：在「真正要送給後端」的前一刻，才把陣列轉成字串！
      const backendAnswers = responseData.answers.map((a: any) => ({
        questionId: a.questionId,
        answer: Array.isArray(a.answer) ? a.answer.join(',') : String(a.answer)
      }));

      // 準備發送給後端的最終資料包 (把舊的 answers 替換成轉好字串的 backendAnswers)
      const payloadToSend = {
        ...responseData,
        answers: backendAnswers
      };

      // 🚀 2. 呼叫我們在 Service 剛寫好的真實發射器！
      this.surveyService.submitSurveyResponse(payloadToSend).subscribe({
        next: () => {
          // 3. 成功後：清空暫存、跳出提示、回到列表頁
          sessionStorage.removeItem('temp_survey_response');
          alert('問卷送出成功！感謝您的填寫！');
          this.router.navigate(['/questionnaire/list']);
        },
        error: (err) => {
          console.error('送出失敗，錯誤訊息：', err);
          alert('伺服器錯誤，送出失敗！');
        }
      });
    } else {
      alert('找不到問卷資料，請重新填寫！');
      this.router.navigate(['/questionnaire/list']);
    }
  }
}
