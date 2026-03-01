export interface UserResponseModel {
  surveyId: number; // 對應哪一份問卷
  name: string;     // 姓名
  phone: string;    // 手機
  email: string;    // Email
  age?: number;     // 年齡 (選填)
  submissionDate: string; // 填寫時間
  answers: {
    questionId: number; // 對應哪一題
    // 為了讓後端好存資料庫，暫時把 answer 統一為 string
    // 單選/文字直接存，多選題先把陣列變成逗號字串 (例如 "1,3") 再送出
    // 改成 any
    answer: any;
  }[];
}
