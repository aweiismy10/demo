import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bmi-calculator',
  imports: [FormsModule],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.scss'
})
export class BmiCalculatorComponent {
  user = {
    height: 0,
    weight: 0,
    bmi: 0
  }

  inputHeightData: string = '';
  inputWeightData: string = '';
  heightPrompt: string = '身高(cm)';
  weightPrompt: string = '體重(kg)';


  calculateBMI() {
    if (parseFloat(this.inputHeightData) > 0 && parseFloat(this.inputWeightData) > 0) {
      const heightInMeters = parseFloat(this.inputHeightData) / 100;
      this.user.bmi = parseFloat(this.inputWeightData) / (heightInMeters * heightInMeters);
      // bmi 四捨五入到小數點後兩位
      this.user.bmi = Math.round(this.user.bmi * 100) / 100;
    } else {
      this.inputHeightData = '';
      this.inputWeightData = '';
      this.user.bmi = 0;
    }
  }

  outputResult(): string {
    if (this.user.bmi == 0) {
      return '';
    } else if (this.user.bmi < 18.5) {
      return '體重過輕';
    } else if (this.user.bmi >= 18.5 && this.user.bmi < 24) {
      return '正常範圍';
    } else if (this.user.bmi >= 24 && this.user.bmi < 27) {
      return '過重';
    } else if (this.user.bmi >= 27 && this.user.bmi < 30) {
      return '輕度肥胖';
    } else if (this.user.bmi >= 30 && this.user.bmi < 35) {
      return '中度肥胖';
    } else {
      return '重度肥胖';
    }
  }

}
