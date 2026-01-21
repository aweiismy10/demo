import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-mat-toolbar-demo',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './mat-toolbar-demo.component.html',
  styleUrl: './mat-toolbar-demo.component.scss'
})
export class MatToolbarDemoComponent {

}
