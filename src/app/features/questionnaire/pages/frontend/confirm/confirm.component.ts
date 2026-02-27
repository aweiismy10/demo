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
    const question = this.survey?.questions.find(q => q.questId === questionId);
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

  // 送出鈕:寫到資料庫,並跳回問卷列表 [cite: 115]
  onSubmit(): void {
    // 1. 從 sessionStorage 拿出剛才填寫的暫存資料
    const sessionData = sessionStorage.getItem('temp_survey_response');

    if (sessionData) {
      const responseData:UserResponseModel = JSON.parse(sessionData);

      // 加入作答時間
      responseData.submissionDate = new Date();

      // 2. 呼叫 Service 存進「作答紀錄」的假資料庫
      this.surveyService.addResponse(responseData).subscribe(() => {

        // 3. 成功後：清空暫存、跳出提示、回到列表頁
        sessionStorage.removeItem('temp_survey_response');
        alert('問卷送出成功！感謝您的填寫！');

        // 記得改成你正確的列表頁路由
        this.router.navigate(['/questionnaire/list']);
      });
    } else {
      alert('找不到問卷資料，請重新填寫！');
      this.router.navigate(['/questionnaire/list']);
    }
  }
}
