import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  constructor(public taskService: TaskService) { }

  inputPrompt: string = '輸入待辦事項（點擊新增）';

  addTask() {
    this.taskService.addTask();
  }
}
