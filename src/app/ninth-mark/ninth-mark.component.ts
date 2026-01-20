import { TaskService } from './../@services/task.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ninth-mark',
  imports: [FormsModule],
  templateUrl: './ninth-mark.component.html',
  styleUrl: './ninth-mark.component.scss'
})
export class NinthMarkComponent {
  constructor(public taskService: TaskService) {}

  markAsComplete() {
    this.taskService.markAsComplete();
  }
}
