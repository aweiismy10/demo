import { Component, OnInit, ViewChild, Inject } from '@angular/core'; // 多引入 Inject
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections'; // 處理勾選邏輯的核心
import { forkJoin } from 'rxjs';

// Material Modules
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'; // 引入 Dialog 模組
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Service & Model
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
  // 欄位多了一個 'select' 和 'action'
  displayedColumns: string[] = ['select', 'id', 'title', 'status', 'startDate', 'endDate', 'action'];
  dataSource = new MatTableDataSource<QuestionnaireModel>([]);

  // SelectionModel 用來記錄哪些列被勾選了 (true 代表允許多選，[] 是初始值)
  selection = new SelectionModel<QuestionnaireModel>(true, []);
  SurveyStatus = SurveyStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // 在建構子中注入 MatDialog 和 MatSnackBar
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
      // 後台列表不需要過濾 Draft，全都要顯示
      this.dataSource.data = data;
      setTimeout(() => {
        if (this.paginator) this.dataSource.paginator = this.paginator;
      });
    });
  }

  // === 以下是處理 Checkbox 勾選與刪除的邏輯 ===

  // 檢查是否「全部的列」都被勾選了
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // 點擊表頭的「全選」Checkbox 時觸發
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear(); // 全選狀態下點擊 -> 清空
      return;
    }
    this.selection.select(...this.dataSource.data); // 否則 -> 全選
  }

  // 點擊「刪除」按鈕
  deleteSelected() {
    const selectedItems = this.selection.selected;
    if (selectedItems.length === 0) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { count: selectedItems.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 1. 準備一包「所有刪除請求」的 Observable 陣列
        const deleteRequests = selectedItems.map(item =>
          this.surveyService.deleteQuestionnaire(item.id!)
        );

        // 2. 使用 forkJoin 等待這包請求「全數執行完畢」
        forkJoin(deleteRequests).subscribe({
          next: () => {
            // 所有刪除都成功後，才清空勾選、重撈資料、跳提示
            this.selection.clear();
            this.loadData();
            this.snackBar.open(`已成功刪除 ${selectedItems.length} 筆問卷`, '關閉', { duration: 3000 });
          },
          error: (err) => {
            // 如果其中有任何一個 API 壞掉，會走這裡，不會讓畫面假死
            console.error('刪除過程中發生錯誤:', err);
            this.snackBar.open('刪除失敗，請稍後再試！', '關閉', { duration: 3000 });
          }
        });
      }
    });
  }
}

// =========================================
// 在檔案最底部，宣告一個輕量的 Dialog 元件
// =========================================
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  // 直接把 HTML 寫在 template 裡面，省去開新檔案的麻煩
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
  // 透過 MAT_DIALOG_DATA 接收從 AdminListComponent 傳進來的資料
  constructor(@Inject(MAT_DIALOG_DATA) public data: { count: number }) { }
}
