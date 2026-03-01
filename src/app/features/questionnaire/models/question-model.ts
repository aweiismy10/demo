// 題目類型 (嚴格對齊後端資料庫存的英文大寫)
export enum QuestionType {
  Single = 'SINGLE',
  Multi = 'MULTI',
  Text = 'TEXT'
}

// 選項的結構 (對應 PDF JSON 中的 options)
export interface QuestionOption {
  optionName: string; // 選項名稱 (例如: "aa", "bb")
  code: number;       // 選項代號
}

// 題目的結構
export interface QuestionModel {
  id: number;           // 題目 ID // 03/01 修改 1: questId 改成 id
  questName: string;    // 題目名稱 (例如: "問題1")
  type: QuestionType;   // 題目類型 (單選/多選/文字)
  isRequired: boolean;  // 是否必填 (對應 PDF JSON 的 need) [cite: 21] // 03/01 修改 2: required 改成 isRequired
  options?: QuestionOption[]; // 選項陣列 (文字題可能沒有此欄位)
}
