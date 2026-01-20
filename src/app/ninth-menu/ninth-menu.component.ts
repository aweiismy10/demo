import { Component } from '@angular/core';
import { TaskService } from '../@services/task.service';

@Component({
  selector: 'app-ninth-menu',
  imports: [],
  templateUrl: './ninth-menu.component.html',
  styleUrl: './ninth-menu.component.scss'
})
export class NinthMenuComponent {
  constructor(public taskService: TaskService) {}

}
