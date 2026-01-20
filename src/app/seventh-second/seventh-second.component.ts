import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seventh-second',
  templateUrl: './seventh-second.component.html',
  styleUrl: './seventh-second.component.scss'
})
export class SeventhSecondComponent {
  @Input() userData: any = {
    userName: '',
    userEmail: '',
    userAddress: ''
  };

  userInfo: { userName: string; userEmail: string; userAddress: string } = {
    userName: '',
    userEmail: '',
    userAddress: ''
  };

}
