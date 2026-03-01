import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

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
    this.surveyService.getQuestionnaireById(id).subscribe(surveyData => {
      if (surveyData) {
        this.survey = surveyData;
        this.surveyService.getResponsesBySurveyId(id).subscribe(responseData => {
          this.responses = responseData;
          this.calculateStats();
        });
      }
    });
  }

  calculateStats(): void {
    if (!this.survey) return;

    // 1. 初始化歸零
    this.survey.questions.forEach(q => {
      this.stats[q.id] = {};
      if (q.type !== QuestionType.Text && q.options) {
        q.options.forEach(opt => {
          this.stats[q.id][opt.code] = 0;
        });
      }
    });

    // 2. 開始計票 (處理字串轉陣列)
    this.responses.forEach(res => {
      res.answers.forEach((ans: any) => {
        const qId = ans.questionId;
        const answerValue = ans.answer;

        if (answerValue === null || answerValue === undefined || answerValue === '') {
          return;
        }

        const valArray = String(answerValue).split(',');
        valArray.forEach(val => {
          const numVal = Number(val);
          if (this.stats[qId] && this.stats[qId][numVal] !== undefined) {
            this.stats[qId][numVal]++;
          }
        });
      });
    });
  }

  getPercentage(qId: number, optCode: number): number {
    const totalResponses = this.responses.length;
    if (totalResponses === 0) return 0;

    const count = this.stats[qId][optCode] || 0;
    return Math.round((count / totalResponses) * 100);
  }

  getCount(qId: number, optCode: number): number {
    return this.stats[qId] ? (this.stats[qId][optCode] || 0) : 0;
  }

  goBack(): void {
    this.router.navigate(['/questionnaire/list']);
  }
}
