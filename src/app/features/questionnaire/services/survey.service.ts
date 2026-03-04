import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionnaireModel } from '../models/questionnaire-model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/questionnaires`;
  private responseApiUrl = `${environment.apiUrl}/api/responses`;

  // ==========================================
  //  問卷 CRUD (與 Java 後端連線 API)
  // ==========================================

  getQuestionnaires(): Observable<QuestionnaireModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getQuestionnaireById(id: number): Observable<QuestionnaireModel | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createQuestionnaire(surveyData: QuestionnaireModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, surveyData);
  }

  updateQuestionnaire(id: number, updatedSurvey: QuestionnaireModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedSurvey);
  }

  deleteQuestionnaire(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ==========================================
  //  作答紀錄 API
  // ==========================================

  getResponsesBySurveyId(surveyId: number): Observable<any[]> {
    return this.http.get<any>(`${this.responseApiUrl}/survey/${surveyId}`).pipe(
      map(response => response.data)
    );
  }

  submitSurveyResponse(responseData: any): Observable<any> {
    return this.http.post<any>(this.responseApiUrl, responseData);
  }
}
