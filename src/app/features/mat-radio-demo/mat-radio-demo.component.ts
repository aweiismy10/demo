import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-mat-radio-demo',
  imports: [FormsModule, MatRadioModule],
  templateUrl: './mat-radio-demo.component.html',
  styleUrl: './mat-radio-demo.component.scss'
})
export class MatRadioDemoComponent {
  radioData!: string;
}
