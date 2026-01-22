import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-web-header',
  imports: [RouterLink,RouterLinkActive],
  standalone: true,
  templateUrl: './web-header.component.html',
  styleUrl: './web-header.component.scss'
})
export class WebHeaderComponent {

}
