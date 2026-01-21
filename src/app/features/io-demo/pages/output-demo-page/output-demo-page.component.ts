import { Component } from '@angular/core';
import { OutputChildComponent } from '../../components/output-child/output-child.component';

@Component({
  selector: 'app-output-demo-page',
  imports: [OutputChildComponent],
  templateUrl: './output-demo-page.component.html',
  styleUrl: './output-demo-page.component.scss'
})
export class OutputDemoPageComponent {
  userInfo: { userName: string; userEmail: string; userAddress: string } = {
    userName: '',
    userEmail: '',
    userAddress: ''
  };

  showNewUserInfo(data: any) {
    this.userInfo = data;
  }
}
