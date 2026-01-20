import { Component,output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seventh-forth',
  imports: [FormsModule],
  templateUrl: './seventh-forth.component.html',
  styleUrl: './seventh-forth.component.scss'
})
export class SeventhForthComponent {
  userData: { userName: string; userEmail: string; userAddress: string } = {
    userName: '',
    userEmail: '',
    userAddress: ''
  };

  userInfoOutput = output<any>();

  sendData(data: any) {
    this.userInfoOutput.emit(data);
  }
}
