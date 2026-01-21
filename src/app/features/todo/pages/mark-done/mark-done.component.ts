import { TaskService } from '../../services/task.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mark-done',
  imports: [FormsModule],
  templateUrl: './mark-done.component.html',
  styleUrl: './mark-done.component.scss'
})
export class MarkDoneComponent {
  constructor(public taskService: TaskService) {}

  markAsComplete() {
    this.taskService.markAsComplete();
  }
}
