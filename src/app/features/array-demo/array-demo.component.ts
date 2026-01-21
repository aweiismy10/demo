import { Component } from '@angular/core';

@Component({
  selector: 'app-array-demo',
  imports: [],
  templateUrl: './array-demo.component.html',
  styleUrl: './array-demo.component.scss'
})
export class ArrayDemoComponent {
  userArray: any = [
    {
      userName: '玩家A',
      level: 10,
      props: [
        {
          propsName: '蘑菇',
          amount: 5
        },
        {
          propsName: '金幣',
          amount: 15
        }
      ]
    },
    {
      userName: '玩家B',
      level: 15,
      props: [
        {
          propsName: '龜殼',
          amount: 1
        },
        {
          propsName: '砲彈',
          amount: 15
        }
      ]
    }
  ]

}
