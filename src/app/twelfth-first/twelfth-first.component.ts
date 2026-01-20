import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TwelfthComponent } from '../twelfth/twelfth.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-twelfth-first',
  imports: [FormsModule],
  templateUrl: './twelfth-first.component.html',
  styleUrl: './twelfth-first.component.scss'
})


export class TwelfthFirstComponent {
  readonly dialog = inject(MatDialog);
  inputName = '';
  inputAnimal = '';
  res = '';

  showDialog() {
    const dialogRef = this.dialog.open(TwelfthComponent, {
      // width: '500px',
      // height: '300px',
      data: { name: this.inputName, animal: this.inputAnimal },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.res = result;
        this.inputName = '';
        this.inputAnimal = '';
      }
    });
  }
}
