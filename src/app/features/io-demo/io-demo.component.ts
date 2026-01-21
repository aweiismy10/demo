import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-io-demo',
  imports:[RouterOutlet,RouterLink],
  templateUrl: './io-demo.component.html',
  styleUrl: './io-demo.component.scss'
})
export class IoDemoComponent {
}
