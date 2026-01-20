import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-seventeenth',
  imports: [FormsModule,MatRadioModule],
  templateUrl: './seventeenth.component.html',
  styleUrl: './seventeenth.component.scss'
})
export class SeventeenthComponent {
  radioData!: string;
}
