import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebHeaderComponent } from './layout/web-header/web-header.component';

@Component({
  selector: 'app-root',
  imports: [WebHeaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wd-260108-page';


}
