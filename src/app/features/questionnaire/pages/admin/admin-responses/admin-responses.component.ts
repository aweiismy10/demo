import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SurveyService } from '../../../services/survey.service';
import { QuestionnaireModel } from '../../../models/questionnaire-model';
import { QuestionType } from '../../../models/question-model';

@Component({
  selector: 'app-admin-responses',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatPaginatorModule,
    MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule
  ],
  templateUrl: './admin-responses.component.html',
  styleUrls: ['./admin-responses.component.scss']
})
export class AdminResponsesComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'email', 'phone', 'age', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  responses: any[] = [];
  survey: QuestionnaireModel | null = null;
  surveyTitle = '';
  selectedResponse: any = null;
  QuestionType = QuestionType;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    this.surveyService.getQuestionnaireById(id).subscribe(survey => {
      if (survey) {
        this.survey = survey;
        this.surveyTitle = survey.title;
      }
    });

    this.surveyService.getResponsesBySurveyId(id).subscribe(data => {
      // 倒序顯示（最新的在最上面）
      this.responses = [...data].reverse();
      this.dataSource.data = this.responses;
      setTimeout(() => {
        if (this.paginator) this.dataSource.paginator = this.paginator;
      });
    });
  }

  viewDetail(response: any): void {
    this.selectedResponse = response;
  }

  getAnswer(questionId: number): any {
    return this.selectedResponse?.answers?.find((a: any) => a.questionId === questionId);
  }

  getOptionName(questionId: number, code: number): string {
    const question = this.survey?.questions.find(q => q.id === questionId);
    if (question?.options) {
      const opt = question.options.find(o => o.code === code);
      return opt ? opt.optionName : String(code);
    }
    return String(code);
  }

  getDisplayAnswer(question: any, answer: any): string {
    if (question.type === QuestionType.Single) {
      return this.getOptionName(question.id, Number(answer));
    }
    return String(answer || '未作答');
  }

  goBack(): void {
    this.router.navigate(['/questionnaire/admin/list']);
  }
}
