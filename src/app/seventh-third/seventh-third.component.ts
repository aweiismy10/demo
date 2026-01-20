import { Component } from '@angular/core';
import { SeventhForthComponent } from '../seventh-forth/seventh-forth.component';

@Component({
  selector: 'app-seventh-third',
  imports: [SeventhForthComponent],
  templateUrl: './seventh-third.component.html',
  styleUrl: './seventh-third.component.scss'
})
export class SeventhThirdComponent {
  userInfo: { userName: string; userEmail: string; userAddress: string } = {
    userName: '',
    userEmail: '',
    userAddress: ''
  };

  showNewUserInfo(data: any) {
    this.userInfo = data;
  }
}
