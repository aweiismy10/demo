import { Component } from '@angular/core';

@Component({
  selector: 'app-forth',
  imports: [],
  templateUrl: './forth.component.html',
  styleUrl: './forth.component.scss'
})
export class ForthComponent {

  redHeader: string = '我是標題';
  blueContact: string = '我是內容';
  imgSrc: string = 'profile_picture.png';
  imgSrc2: string = '';

  clickButton(): void {
    alert('你按按鈕了!');
  }

  clickButtonImg1(): string {
    return this.imgSrc2 = 'profile_picture.png';
  }

  clickButtonImg2(): string {
    return this.imgSrc2 = 'owl.png';
  }
}
