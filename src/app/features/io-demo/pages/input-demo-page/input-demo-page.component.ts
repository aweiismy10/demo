import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputChildComponent } from "../../components/input-child/input-child.component";

@Component({
  selector: 'app-input-demo-page',
  imports: [FormsModule, InputChildComponent],
  templateUrl: './input-demo-page.component.html',
  styleUrl: './input-demo-page.component.scss'
})
export class InputDemoPageComponent {
  userInfo: { userName: string; userEmail: string; userAddress: string } = {
    userName: '',
    userEmail: '',
    userAddress: ''
  };

}
