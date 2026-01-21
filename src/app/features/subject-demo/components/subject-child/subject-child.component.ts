import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-subject-child',
  imports: [FormsModule],
  templateUrl: './subject-child.component.html',
  styleUrl: './subject-child.component.scss'
})
export class SubjectChildComponent {
  constructor(private loadingService: LoadingService) { }

  inputData = '';

  updateSubscribe() {
    this.loadingService.getInput(this.inputData);
  }
}
