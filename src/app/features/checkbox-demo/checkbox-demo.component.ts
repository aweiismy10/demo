import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-demo',
  imports: [FormsModule],
  templateUrl: './checkbox-demo.component.html',
  styleUrl: './checkbox-demo.component.scss'
})
export class CheckboxDemoComponent {
  checkArray = [
    { name: '選項a', checkOption: false },
    { name: '選項b', checkOption: false },
    { name: '選項c', checkOption: false },
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    for (let item of this.checkArray) {
      if (item.checkOption) {

      }
    }
  }

}
