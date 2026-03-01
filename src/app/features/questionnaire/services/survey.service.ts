import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionnaireModel } from '../models/questionnaire-model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/questionnaires';

  // 保留作答紀錄的 key (因為我們還沒接填寫問卷的後端 API，這部分先留著)
  private RESPONSES_KEY = 'survey_system_responses';

  // ==========================================
  //  與 Java 後端連線的 API
  // ==========================================

  // 1. 取得所有問卷列表
  getQuestionnaires(): Observable<QuestionnaireModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  // 2. 取得單一問卷
  getQuestionnaireById(id: number): Observable<QuestionnaireModel | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  // 3. 新增問卷
  createQuestionnaire(surveyData: QuestionnaireModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, surveyData);
  }

  // 4. 更新問卷 (預留給未來編輯功能)
  updateQuestionnaire(id: number, updatedSurvey: QuestionnaireModel): Observable<any> {
    // 這裡等後端寫好 PUT API 就可以換成 http.put 了
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedSurvey);
  }

  // 5. 刪除問卷 (預留給未來刪除功能)
  deleteQuestionnaire(id: number): Observable<any> {
    // 這裡等後端寫好 DELETE API 就可以換成 http.delete 了
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ==========================================
  //  作答紀錄 (目前暫存於 localStorage)
  // ==========================================

  addResponse(response: any): Observable<boolean> {
    const saved = localStorage.getItem(this.RESPONSES_KEY);
    const responses = saved ? JSON.parse(saved) : [];
    responses.push(response);
    localStorage.setItem(this.RESPONSES_KEY, JSON.stringify(responses));
    return of(true);
  }

  // getResponsesBySurveyId(surveyId: number): Observable<any[]> {
  //   const saved = localStorage.getItem(this.RESPONSES_KEY);
  //   const responses = saved ? JSON.parse(saved) : [];
  //   const filtered = responses.filter((r: any) => r.surveyId === surveyId);
  //   return of(filtered);
  // }

  // 取得特定問卷的所有作答紀錄 (改接後端真實 API)
  getResponsesBySurveyId(surveyId: number): Observable<any[]> {
    return this.http.get<any>(`http://localhost:8080/api/responses/survey/${surveyId}`).pipe(
      map(response => response.data)
    );
  }

  // ==========================================
  //  使用者填寫問卷 (發送答案給後端)
  // ==========================================
  submitSurveyResponse(responseData: any): Observable<any> {
    console.log('準備發送的作答資料包:', responseData);
    // 這裡我們預計後端會開一條 /api/responses 的新路徑來接收答案
    return this.http.post<any>('http://localhost:8080/api/responses', responseData);
  }
}
