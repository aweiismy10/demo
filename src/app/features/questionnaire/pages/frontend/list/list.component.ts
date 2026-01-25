import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

// Service & Model
import { SurveyService } from '../../../services/survey.service';
import { QuestionnaireModel, SurveyStatus } from '../../../models/questionnaire-model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,       // 基礎功能 (*ngIf, date pipe)
    RouterModule,       // 路由功能 (routerLink)
    MatTableModule,     // 表格
    MatPaginatorModule, // 分頁
    MatSortModule,      // 排序
    MatButtonModule,    // 按鈕
    MatInputModule,     // 輸入框
    MatFormFieldModule, // 表單欄位外框
    MatIconModule       // 圖示
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'status', 'startDate', 'endDate', 'action'];
  dataSource = new MatTableDataSource<QuestionnaireModel>([]);
  SurveyStatus = SurveyStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getQuestionnaires().subscribe(data => {
      // 過濾掉未發佈 (Draft)
      const publishedSurveys = data.filter(q => q.status !== SurveyStatus.Draft);

      this.dataSource.data = publishedSurveys;

      // 注意：在 Standalone 模式有時初始化順序不同，建議加個檢查
      setTimeout(() => {
        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;
      });
    });
  }

  canFill(status: SurveyStatus): boolean {
    return status === SurveyStatus.Ongoing;
  }
}
