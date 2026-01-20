import { Component } from '@angular/core';
import { TaskService } from '../@services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ninth-delete',
  imports: [FormsModule],
  templateUrl: './ninth-delete.component.html',
  styleUrl: './ninth-delete.component.scss'
})
export class NinthDeleteComponent {
  constructor(public taskService: TaskService) {}

  deleteTask() {
    this.taskService.deleteTask();
  }
}
