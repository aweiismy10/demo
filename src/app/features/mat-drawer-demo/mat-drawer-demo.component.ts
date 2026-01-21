import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-mat-drawer-demo',
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './mat-drawer-demo.component.html',
  styleUrl: './mat-drawer-demo.component.scss'
})
export class MatDrawerDemoComponent {
  showFiller = false;
}
