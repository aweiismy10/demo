// 題目類型
export enum QuestionType {
  Single = '單選',
  Multi = '多選',
  Text = '文字'
}

// 選項的結構 (對應 PDF JSON 中的 options)
export interface QuestionOption {
  optionName: string; // 選項名稱 (例如: "aa", "bb")
  code: number;       // 選項代號
}

// 題目的結構
export interface QuestionModel {
  questId: number;      // 題目 ID
  questName: string;    // 題目名稱 (例如: "問題1")
  type: QuestionType;   // 題目類型 (單選/多選/文字)
  required: boolean;    // 是否必填 (對應 PDF JSON 的 need) [cite: 21]
  options?: QuestionOption[]; // 選項陣列 (文字題可能沒有此欄位)
}
