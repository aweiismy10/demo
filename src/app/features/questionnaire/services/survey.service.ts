import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuestionnaireModel ,SurveyStatus } from '../models/questionnaire-model';
import { QuestionModel, QuestionType } from './../models/question-model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private STORAGE_KEY = 'survey_system_data'; // localStorage 的 key
  private questionnaires: QuestionnaireModel[] = []; // 記憶體中的資料暫存

  constructor() {
    // 1. 程式啟動時，先嘗試從 localStorage 讀取資料
    this.loadFromStorage();

    // 2. 如果 localStorage 裡面是空的（第一次開），我們塞一些假資料進去方便開發
    if (this.questionnaires.length === 0) {
      this.generateMockData();
    }
  }

  // ==========================================
  //  讀取 (Read)
  // ==========================================

  // 取得所有問卷列表
  getQuestionnaires(): Observable<QuestionnaireModel[]> {
    // 使用 'of' 來模擬一個 Observable 回傳，就像 Http 請求一樣
    return of(this.questionnaires);
  }

  // 根據 ID 取得單一問卷 (用於編輯頁或內頁)
  getQuestionnaireById(id: number): Observable<QuestionnaireModel | undefined> {
    const survey = this.questionnaires.find(q => q.id === id);
    return of(survey);
  }

  // ==========================================
  //  寫入 (Create / Update / Delete)
  // ==========================================

  // 新增問卷
  createQuestionnaire(survey: QuestionnaireModel): Observable<boolean> {
    // 模擬後端生成 ID (找目前最大的 ID + 1)
    const newId = this.questionnaires.length > 0
      ? Math.max(...this.questionnaires.map(q => q.id)) + 1
      : 1;

    survey.id = newId;
    // 預設狀態如果是新增模式，通常是未發佈
    survey.status = survey.status || SurveyStatus.Draft;

    this.questionnaires.push(survey);
    this.saveToStorage(); // 存檔
    return of(true);
  }

  // 更新問卷
  updateQuestionnaire(id: number, updatedSurvey: QuestionnaireModel): Observable<boolean> {
    const index = this.questionnaires.findIndex(q => q.id === id);
    if (index !== -1) {
      // 更新資料，但保留 ID
      this.questionnaires[index] = { ...updatedSurvey, id: id };
      this.saveToStorage();
      return of(true);
    }
    return of(false);
  }

  // 刪除問卷
  deleteQuestionnaire(id: number): Observable<boolean> {
    const index = this.questionnaires.findIndex(q => q.id === id);
    if (index !== -1) {
      this.questionnaires.splice(index, 1);
      this.saveToStorage();
      return of(true);
    }
    return of(false);
  }

  // ==========================================
  //  私有輔助方法 (Private Helpers)
  // ==========================================

  // 從 localStorage 讀取
  private loadFromStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      // 注意：JSON parse 出來的日期會變字串，這裡簡化處理，實際專案可能需要轉換回 Date 物件
      this.questionnaires = JSON.parse(data);
    }
  }

  // 存入 localStorage
  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.questionnaires));
  }

  // 生成假資料 (參考 PDF 內容)
  private generateMockData(): void {
    const mockData: QuestionnaireModel[] = [
      {
        id: 1,
        title: '青春洋溢高中生人氣投票戰',
        description: '選出你心目中最受歡迎的高中生！',
        startDate: new Date('2023-08-12'),
        endDate: new Date('2023-11-01'),
        status: SurveyStatus.Ongoing,
        questions: [
          {
            questId: 1,
            questName: '請選取最喜歡的人',
            type: QuestionType.Single,
            required: true,
            options: [
              { optionName: '何廢料(建國中學)', code: 1 },
              { optionName: '77/77(金甌女中)', code: 2 }
            ]
          },
          {
            questId: 2,
            questName: '請說明理由',
            type: QuestionType.Text,
            required: false
          }
        ]
      },
      {
        id: 2,
        title: 'E312購買傾向市調',
        description: '協助我們了解市場需求',
        startDate: new Date('2023-11-12'),
        endDate: new Date('2023-12-31'),
        status: SurveyStatus.NotStarted,
        questions: []
      },
      {
        id: 3,
        title: '尾牙餐廳預選',
        description: '大家想吃什麼？',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-10-12'),
        status: SurveyStatus.Ended,
        questions: []
      }
    ];

    this.questionnaires = mockData;
    this.saveToStorage();
  }
}
