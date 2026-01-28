import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavBarDataService } from '../../core/services/nav-bar-data.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-main-view',
  imports: [FormsModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterLink, RouterLinkActive],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})

export class MainViewComponent implements AfterViewInit {
  // Table with sorting
  private _liveAnnouncer = inject(LiveAnnouncer);
  // 注入navbar服務
  constructor(private navbarService: NavBarDataService) { }
  // 宣告mat-table型別的空陣列，用來存取我的個人連結串
  exerciseDataLink: PeriodicElement[] = [];

  ngOnInit(): void {
    // 呼叫方法(傳入原始資料)重組資料後，賦值給剛剛宣告的陣列
    this.exerciseDataLink = this.receiveLink(this.navbarService.navbar);
    // 手動賦值
    this.dataSource.data = this.exerciseDataLink;
  }
  // 把外部進來的陣列資料重組(加上position)，並用map複製新的陣列參考
  receiveLink(barData: any[]): PeriodicElement[] {
    return barData.map((data, index) => {
      return {
        position: index + 1,
        name: data.label,
        link: data.link,
      }
    })
  }

  // 即時搜尋
  changeData(event: Event) {
    // console.log查看使用者輸入"資料"(測試)
    console.log((event.target as HTMLInputElement).value);

    // MatTableDataSource內建filter
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //----------------------mat-table--------------------------
  displayedColumns: string[] = ['position', 'name', 'link'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // Table with sorting
    this.dataSource.sort = this.sort;
  }
  //---------------------------------------------------------
  // Table with sorting
  @ViewChild(MatSort) sort!: MatSort;

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //---------------------------------------------------------
}

//----------------------mat-table介面-------------------------
export interface PeriodicElement {
  position: number;
  name: string;
  link: string;
}
//-----------------------------------------------------------
