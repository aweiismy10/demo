import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawWeatherResponse } from '../api-interface/weather-model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl='https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-ACDF135F-A82D-424B-9AB8-5C67F5CBE0DE';

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<RawWeatherResponse> {
    return this.http.get<RawWeatherResponse>(this.apiUrl);
  }

  //讀取
  getApi(url: string){
    return this.http.get(url);
  }
  //新增
  postApi(url: string, postData:any){
    return this.http.post(url,postData);
  }
  //更新
  putApi(url: string, putData:any){
    return this.http.put(url,putData);
  }
  //刪除
  delApi(url: string){
    return this.http.delete(url);
  }


}
