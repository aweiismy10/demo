import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  //讀取
  getApi<T>(url: string){
    return this.http.get<T>(url);
  }
  //新增
  postApi<T>(url: string, postData:any){
    return this.http.post<T>(url,postData);
  }
  //更新
  putApi<T>(url: string, putData:any){
    return this.http.put<T>(url,putData);
  }
  //刪除
  delApi<T>(url: string){
    return this.http.delete<T>(url);
  }


}
