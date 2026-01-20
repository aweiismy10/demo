import { Component } from '@angular/core';
import { TaskService } from '../@services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ninth-add',
  imports: [FormsModule],
  templateUrl: './ninth-add.component.html',
  styleUrl: './ninth-add.component.scss'
})
export class NinthAddComponent {
  constructor(public taskService: TaskService) { }

  inputPrompt: string = '輸入待辦事項（點擊新增）';

  addTask() {
    this.taskService.addTask();
  }
}
