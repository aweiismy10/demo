import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

// Material Modules (用進度條來畫圖表最簡單好看)
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { SurveyService } from '../../../services/survey.service';
import { QuestionnaireModel } from '../../../models/questionnaire-model';
import { QuestionType } from '../../../models/question-model';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatProgressBarModule, MatButtonModule, MatIconModule, MatCardModule
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  survey: QuestionnaireModel | null = null;
  responses: any[] = [];

  // 用來存放計算結果的物件。結構會像是： { 題目ID: { 選項代碼: 數量, 選項代碼: 數量 } }
  stats: { [questionId: number]: { [optionCode: number]: number } } = {};

  QuestionType = QuestionType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadData(Number(idParam));
    }
  }

  loadData(id: number): void {
    // 1. 先抓問卷題目
    this.surveyService.getQuestionnaireById(id).subscribe(surveyData => {
      if (surveyData) {
        this.survey = surveyData;

        // 2. 再抓這份問卷的所有作答紀錄
        this.surveyService.getResponsesBySurveyId(id).subscribe(responseData => {
          this.responses = responseData;
          this.calculateStats(); // 抓完資料後開始計算
        });
      }
    });
  }

  // 核心邏輯：計算每個選項的被選次數
  calculateStats(): void {
    if (!this.survey) return;

    // A. 初始化歸零：幫每一個選擇題的每一個選項建立一個計數器，預設為 0
    this.survey.questions.forEach(q => {
      this.stats[q.id] = {}; // 建立這題的空物件
      if (q.type !== QuestionType.Text && q.options) {
        q.options.forEach(opt => {
          this.stats[q.id][opt.code] = 0; // 把每個選項的計數器設為 0
        });
      }
    });

    // // B. 開始計票：跑迴圈看每一張「選票 (response)」
    // this.responses.forEach(res => {
    //   res.answers.forEach((ans: any) => {
    //     const qId = ans.questionId;
    //     const answerValue = ans.answer;

    //     // 如果這題是多選 (陣列)
    //     if (Array.isArray(answerValue)) {
    //       answerValue.forEach(val => {
    //         if (this.stats[qId] && this.stats[qId][val] !== undefined) {
    //           this.stats[qId][val]++; // 該選項得票 +1
    //         }
    //       });
    //     }
    //     // 如果這題是單選 (數字或字串)
    //     else if (typeof answerValue === 'number' || typeof answerValue === 'string') {
    //       if (this.stats[qId] && this.stats[qId][answerValue as number] !== undefined) {
    //         this.stats[qId][answerValue as number]++; // 該選項得票 +1
    //       }
    //     }
    //   });
    // });
    // B. 開始計票：跑迴圈看每一張「選票 (response)」
    this.responses.forEach(res => {
      res.answers.forEach((ans: any) => {
        const qId = ans.questionId;
        const answerValue = ans.answer;

        if (answerValue === null || answerValue === undefined || answerValue === '') {
          return; // 如果沒填答案就跳過
        }

        // 🛠️ 關鍵修改：因為後端回傳的都是字串 (例如多選是 "1,3"，單選是 "2")
        // 我們統一把它轉成字串，再用逗號切成陣列
        const valArray = String(answerValue).split(',');

        valArray.forEach(val => {
          const numVal = Number(val); // 轉回數字型態的代碼

          // 檢查這個選項代碼是否存在於我們的 stats 統計板上 (這同時會過濾掉文字題，因為文字題沒有被建立計數器)
          if (this.stats[qId] && this.stats[qId][numVal] !== undefined) {
            this.stats[qId][numVal]++; // 該選項得票數 +1
          }
        });
      });
    });
  }

  // 計算百分比 (為了畫進度條)
  getPercentage(qId: number, optCode: number): number {
    const totalResponses = this.responses.length;
    if (totalResponses === 0) return 0;

    const count = this.stats[qId][optCode] || 0;
    return Math.round((count / totalResponses) * 100);
  }

  // 取得該選項的實際票數
  getCount(qId: number, optCode: number): number {
    if (!this.stats[qId]) return 0;
    return this.stats[qId][optCode] || 0;
  }

  goBack(): void {
    // 回到專案的列表頁
    this.router.navigate(['/questionnaire/list']);
  }
}
