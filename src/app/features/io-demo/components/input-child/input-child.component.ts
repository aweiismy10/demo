import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-child',
  templateUrl: './input-child.component.html',
  styleUrl: './input-child.component.scss'
})
export class InputChildComponent {
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
