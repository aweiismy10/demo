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
    const sessionData = sessionStorage.getItem('temp_survey_response');

    if (sessionData) {
      this.responseData = JSON.parse(sessionData);
      this.surveyService.getQuestionnaireById(this.responseData!.surveyId).subscribe(data => {
        this.survey = data;
      });
    } else {
      alert('無暫存資料，請重新填寫問卷！');
      this.router.navigate(['/questionnaire/list']);
    }
  }

  getOptionName(questionId: number, code: number): string {
    const question = this.survey?.questions.find(q => q.id === questionId);
    if (question && question.options) {
      const option = question.options.find(opt => opt.code === code);
      return option ? option.optionName : '';
    }
    return '';
  }

  getAnswerByQuestionId(questionId: number): any {
    return this.responseData?.answers.find(a => a.questionId === questionId);
  }

  onEdit(): void {
    if (confirm('確定要返回修改嗎？')) {
      this.router.navigate(['/questionnaire/filling', this.responseData?.surveyId]);
    }
  }

  onSubmit(): void {
    const sessionData = sessionStorage.getItem('temp_survey_response');

    if (sessionData) {
      const responseData: UserResponseModel = JSON.parse(sessionData);

      const d = new Date();
      responseData.submissionDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      // 格式轉換：把陣列轉成字串交給後端
      const backendAnswers = responseData.answers.map((a: any) => ({
        questionId: a.questionId,
        answer: Array.isArray(a.answer) ? a.answer.join(',') : String(a.answer)
      }));

      const payloadToSend = {
        ...responseData,
        answers: backendAnswers
      };

      this.surveyService.submitSurveyResponse(payloadToSend).subscribe({
        next: () => {
          sessionStorage.removeItem('temp_survey_response');
          alert('問卷送出成功！感謝您的填寫！');
          this.router.navigate(['/questionnaire/list']);
        },
        error: (err) => {
          console.error('送出失敗，錯誤訊息：', err);
          // 顯示後端回傳的錯誤訊息（例如：「您已填寫過這份問卷」）
          const message = err?.error?.message || '伺服器錯誤，送出失敗！';
          alert(message);
        }
      });
    } else {
      alert('找不到問卷資料，請重新填寫！');
      this.router.navigate(['/questionnaire/list']);
    }
  }
}
