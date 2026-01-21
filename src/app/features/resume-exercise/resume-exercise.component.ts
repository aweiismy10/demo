// 引入工具
import { Component } from '@angular/core';
// 引入 CommonModule 以使用常用指令
import { CommonModule } from '@angular/common';

// 定義合約(介面)
interface ExpData {
  title:string;
  company:string;
  duration:string;
  details:string[];
}

interface EduData{
  degree:string;
  school:string;
  duration:string;
  details:string[];
}

interface ResumeData {
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  address: string;
  introduction: string;
  skills: string[];
  languages: string[];
  hobbies: string[];
  experiences:ExpData[];
  educations:EduData[];
}

// 組件設定(裝飾器)
@Component({
  selector: 'app-resume-exercise',
  // 引入 CommonModule
  imports: [CommonModule],
  templateUrl: './resume-exercise.component.html',
  styleUrl: './resume-exercise.component.scss'
})


// 導出組件邏輯
export class ResumeExerciseComponent {
  title = 'WD-251231-Resume';
  // 定義履歷資料物件
  resume = {
    name: '林冠伯',
    jobTitle: '軟體開發工程師',
    phone: '+886 123-456-789',
    email: 'example@gmail.com',
    address: '台南市歸仁十三路一段6號',
    introduction: '我是一名軟體工程師，具備多種程式語言的經驗以及撰寫高品質程式碼的成功記錄。我擅長解決問題並具有紮實的電腦科學背景。我也是一位溝通能力強的人，喜歡與他人協同合作。',
    skills: ['Java/Python/JavaScript/C++', 'SpringBoot/Angular/Node.js', 'MySQL', 'Git/GitHub', 'RESTful API/單元測試'],
    languages: ['中文:母語', '英文:基礎（能閱讀技術文件）'],
    hobbies: ['游泳/跑步', '程式設計', '閱讀文章/小說'],
    experiences: [
      // 工作經歷陣列，可擴展多個工作經歷
      {
        title: '資深軟體開發工程師 Senior Software Developer',
        company: '科技公司ABC',
        duration: '2025年10月 - 2030年12月',
        details: [
          '使用 Java、Python 和 C++ 開發及維護軟體。',
          '領導跨功能團隊以交付成功的軟體專案。',
          '以要點形式撰寫資深軟體工程師的工作經驗。'
        ]
      }
    ],
    educations: [
      // 教育背景陣列，可擴展多個教育背景
      {
        degree: '資訊工程學士 Bachelor of Information Engineering',
        school: 'ABC大學 ABC University',
        duration: '2020年09月 - 2024年06月',
        details: [
          '主修程式設計、資料結構、演算法、資料庫系統和軟體工程。',
          '參與多個專案，應用所學知識解決實際問題。',
          '畢業專題：開發一個基於Web的應用程式以提升用戶體驗。'
        ]
      }
    ]
  }
}
