import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SurveyService } from '../../../services/survey.service';
import { QuestionnaireModel, SurveyStatus } from '../../../models/questionnaire-model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'status', 'startDate', 'endDate', 'action'];
  dataSource = new MatTableDataSource<QuestionnaireModel>([]);
  SurveyStatus = SurveyStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    // 💡 整理 1：自訂過濾邏輯只要設定一次，搬到初始化這裡
    this.dataSource.filterPredicate = (data: QuestionnaireModel, filter: string) => {
      return data.title.toLowerCase().includes(filter);
    };

    this.loadSurveys();
  }

  ngAfterViewInit(): void {
    // 💡 整理 2：統一在這裡綁定分頁與排序器
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSurveys(): void {
    this.surveyService.getQuestionnaires().subscribe(data => {
      // 💡 整理 3：代碼更精簡，直接將過濾好的結果塞給資料來源
      this.dataSource.data = data.filter(q => q.status !== SurveyStatus.Draft);
    });
  }

  canFill(status: SurveyStatus): boolean {
    return status === SurveyStatus.Ongoing;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
