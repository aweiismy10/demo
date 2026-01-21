import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { RawWeatherResponse } from '../models/weather-model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-ACDF135F-A82D-424B-9AB8-5C67F5CBE0DE';

  constructor(private http: HttpService) { }

  getWeatherData(): Observable<RawWeatherResponse> {
    return this.http.getApi<RawWeatherResponse>(this.apiUrl);
  }
}
