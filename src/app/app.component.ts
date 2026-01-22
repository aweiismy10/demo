import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavBarDemoComponent } from './layout/top-nav-bar-demo/top-nav-bar-demo.component';

@Component({
  selector: 'app-root',
  imports: [TopNavBarDemoComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wd-260108-page';


}
