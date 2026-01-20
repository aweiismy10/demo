import { Component } from '@angular/core';
import { TaskService } from '../@services/task.service';

@Component({
  selector: 'app-ninth-display',
  imports: [],
  templateUrl: './ninth-display.component.html',
  styleUrl: './ninth-display.component.scss'
})
export class NinthDisplayComponent {
  constructor(private taskService: TaskService) {}

  displayIncompleteTasks(){
    return this.taskService.getIncompleteTasks();
  }
}
