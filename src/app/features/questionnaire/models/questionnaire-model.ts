import { QuestionModel } from "./question-model";

// 問卷的狀態 Enum，讓程式碼更好讀
export enum SurveyStatus {
  NotStarted = '尚未開始',
  Ongoing = '進行中',
  Ended = '已結束',
  Draft = '未發佈' // 後台新增時的狀態
}

export interface QuestionnaireModel {
  id?: number;           // 問卷編號 (AI)
  title: string;        // 問卷名稱
  description: string;  // 問卷說明 [cite: 19]
  startDate: string;      // 開始時間
  endDate: string;        // 結束時間
  isPublished: boolean; // 代表這份問卷是否發布
  status?: SurveyStatus; // 狀態
  questions: QuestionModel[]; // 這份問卷包含的題目陣列
}
