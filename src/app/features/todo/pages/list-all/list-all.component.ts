import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list-all',
  imports: [],
  templateUrl: './list-all.component.html',
  styleUrl: './list-all.component.scss'
})
export class ListAllComponent {
  constructor(public taskService: TaskService) {}

}
