import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fifth',
  imports: [FormsModule],
  templateUrl: './fifth.component.html',
  styleUrl: './fifth.component.scss'
})
export class FifthComponent {
  role = {
    level: 1,
    atk: 10,
    def: 10,
  }
  inputData: string = '';
  inputPrompt: string = '直接修改等級';

  buttonLevelUp() {
    this.role.level += 1;
    this.roleAttributeCal();
  }

  buttonLevelDown() {
    if (this.role.level > 1) {
      this.role.level -= 1;
    } else {
      this.role.level = 1;
    }
    this.roleAttributeCal();
  }

  roleAttributeCal() {
    let level: number = this.role.level - 1;
    this.role.atk = 10 * (3 ** level);
    this.role.def = 10 * (2 ** level);
  }

  buttonLevelSetter() {
    if (parseInt(this.inputData) > 0) {
      this.role.level = parseInt(this.inputData);
      this.roleAttributeCal();
      this.inputData = '';
    }
  }

  buttonLevelReset() {
    this.role.level = 1;
    this.roleAttributeCal();
  }
}

