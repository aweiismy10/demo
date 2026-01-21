import { Component,output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-output-child',
  imports: [FormsModule],
  templateUrl: './output-child.component.html',
  styleUrl: './output-child.component.scss'
})
export class OutputChildComponent {
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
