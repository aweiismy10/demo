import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SurveyService } from '../../../services/survey.service';
import { QuestionnaireModel, SurveyStatus } from '../../../models/questionnaire-model';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatTableModule, MatPaginatorModule,
    MatButtonModule, MatIconModule, MatCheckboxModule,
    MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'title', 'status', 'startDate', 'endDate', 'action'];
  dataSource = new MatTableDataSource<QuestionnaireModel>([]);
  selection = new SelectionModel<QuestionnaireModel>(true, []);
  SurveyStatus = SurveyStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private surveyService: SurveyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.surveyService.getQuestionnaires().subscribe(data => {
      this.dataSource.data = data;
      setTimeout(() => {
        if (this.paginator) this.dataSource.paginator = this.paginator;
      });
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  deleteSelected(): void {
    const selectedItems = this.selection.selected;
    if (selectedItems.length === 0) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { count: selectedItems.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteRequests = selectedItems.map(item =>
          this.surveyService.deleteQuestionnaire(item.id!)
        );

        forkJoin(deleteRequests).subscribe({
          next: () => {
            this.selection.clear();
            this.loadData();
            this.snackBar.open(`已成功刪除 ${selectedItems.length} 筆問卷`, '關閉', { duration: 3000 });
          },
          error: (err) => {
            console.error('刪除過程中發生錯誤:', err);
            this.snackBar.open('刪除失敗，請稍後再試！', '關閉', { duration: 3000 });
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>確認刪除</h2>
    <mat-dialog-content>
      您確定要刪除這 <strong>{{ data.count }}</strong> 筆問卷嗎？此動作無法復原！
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>取消</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">確定刪除</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { count: number }) { }
}
