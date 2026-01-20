import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }
  // 單純的訂閱(後續寫法同)
  private loading$ = new Subject<boolean>();
  // 需要設定初始值的訂閱(後續寫法同)
  private loading2$ = new BehaviorSubject<boolean>(false);
  //
  private loading3$ = new Subject<string>();

  // 取得loading$的可觀察物件
  _loading$ = this.loading$.asObservable();
  // 取得loading2$的可觀察物件
  _loading2$ = this.loading2$.asObservable();
  //
  _loading3$ = this.loading3$.asObservable();

  // 關閉loading
  hide(){
    this.loading$.next(false);
    this.loading2$.next(false);
  }
  // 開啟loading
  show(){
    this.loading$.next(true);
    this.loading2$.next(true);
  }

  //
  getInput(inputData:string){
    this.loading3$.next(inputData);
  }
}
