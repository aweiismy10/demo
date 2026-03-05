import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarDataService {

  constructor() { }

  navbar = [
    { label: 'html練習', link: '/html-exercise' },
    { label: 'css練習', link: '/css-exercise' },
    { label: '履歷製作練習', link: '/resume-exercise' },
    { label: '繫結(資料綁定)', link: '/binding-exercise' },
    { label: '繫結練習(等級計算機)', link: '/level-calculator' },
    { label: 'ts練習(BMI計算機)', link: '/bmi-calculator' },
    { label: '組件資料傳遞', link: '/io-demo' },
    { label: '陣列顯示(for迴圈)', link: '/array-demo' },
    { label: '待辦清單', link: '/todo' },
    { label: '天氣預報(Api串接)', link: '/weather' },
    { label: '@angular/material(table)', link: '/mat-table-demo' },
    { label: '@angular/material(dialog)', link: '/mat-dialog-demo' },
    { label: '訂閱', link: '/subject-demo' },
    { label: '@angular/material(spinner)', link: '/loading-demo' },
    { label: '@angular/material(sidenav)', link: '/mat-drawer-demo' },
    { label: '@angular/material(toolbar)', link: '/mat-toolbar-demo' },
    { label: '@angular/material(radio)', link: '/mat-radio-demo' },
    { label: 'checkbox陣列練習', link: '/checkbox-demo' },
    { label: '動態問卷', link: '/questionnaire' },
    { label: '動態問卷後台', link: '/questionnaire/admin/list'},
  ];
}
