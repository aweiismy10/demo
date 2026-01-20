import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  task = {
    title: '',
    completed: false,
    selected: false
  }

  tasksArray: any[] = [];
  inputTaskName: string = '';


  addTask() {
    if (this.inputTaskName.trim() == '' || this.inputTaskName == null) {
      this.inputTaskName = '';
      return;
    }
    for (let i = 0; i < this.tasksArray.length; i++) {
      if (this.tasksArray[i].title == this.inputTaskName) {
        this.inputTaskName = '';
        return;
      }
    }
    this.task.title = this.inputTaskName;
    this.tasksArray.push({ title: this.task.title, completed: this.task.completed, selected: false });
    this.inputTaskName = '';
    // console.log(this.tasksArray);
  }

  // 回傳未完成的任務陣列
  getIncompleteTasks(){
    return this.tasksArray.filter(task => !task.completed);
  }

  deleteTask() {
    // 挑選出未被選取的任務，覆蓋原本的任務陣列
    this.tasksArray = this.tasksArray.filter(task => !task.selected);
  }

  markAsComplete() {
    // 將被選取的任務標記為完成，並取消選取狀態
    for (let i = 0; i < this.tasksArray.length; i++) {
      if (this.tasksArray[i].selected) {
        this.tasksArray[i].completed = true;
        this.tasksArray[i].selected = false;
      }
    }
  }

  // 根據任務完成狀態回傳對應的字串
  getTaskStatus(completed: boolean): string {
    return completed ? '[完成]' : '[未完成]';
  }
}
