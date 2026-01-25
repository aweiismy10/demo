export interface UserResponseModel {
  surveyId: number; // 對應哪一份問卷
  name: string;     // 姓名 [cite: 9]
  phone: string;    // 手機
  email: string;    // Email
  age?: number;     // 年齡 (選填)
  submissionDate: Date; // 填寫時間
  answers: {
    questionId: number; // 對應哪一題
    answer: string | number[]; // 單選存字串或ID，多選存陣列，文字存字串
  }[];
}
