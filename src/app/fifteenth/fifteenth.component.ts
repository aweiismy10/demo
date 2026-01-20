import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-fifteenth',
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './fifteenth.component.html',
  styleUrl: './fifteenth.component.scss'
})
export class FifteenthComponent {
  showFiller = false;
}
