import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list-pending',
  imports: [],
  templateUrl: './list-pending.component.html',
  styleUrl: './list-pending.component.scss'
})
export class ListPendingComponent {
  constructor(private taskService: TaskService) {}

  displayIncompleteTasks(){
    return this.taskService.getIncompleteTasks();
  }
}
