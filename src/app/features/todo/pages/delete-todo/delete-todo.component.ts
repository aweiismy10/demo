import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-delete-todo',
  imports: [FormsModule],
  templateUrl: './delete-todo.component.html',
  styleUrl: './delete-todo.component.scss'
})
export class DeleteTodoComponent {
  constructor(public taskService: TaskService) {}

  deleteTask() {
    this.taskService.deleteTask();
  }
}
