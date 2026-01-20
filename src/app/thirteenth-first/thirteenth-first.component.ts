import { Component } from '@angular/core';
import { LoadingService } from '../@services/loading.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thirteenth-first',
  imports: [FormsModule],
  templateUrl: './thirteenth-first.component.html',
  styleUrl: './thirteenth-first.component.scss'
})
export class ThirteenthFirstComponent {
  constructor(private loadingService: LoadingService) { }

  inputData = '';

  updateSubscribe() {
    this.loadingService.getInput(this.inputData);
  }
}
