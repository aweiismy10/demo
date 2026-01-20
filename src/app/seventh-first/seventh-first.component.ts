import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeventhSecondComponent } from "../seventh-second/seventh-second.component";

@Component({
  selector: 'app-seventh-first',
  imports: [FormsModule, SeventhSecondComponent],
  templateUrl: './seventh-first.component.html',
  styleUrl: './seventh-first.component.scss'
})
export class SeventhFirstComponent {
  userInfo: { userName: string; userEmail: string; userAddress: string } = {
    userName: '',
    userEmail: '',
    userAddress: ''
  };

}
