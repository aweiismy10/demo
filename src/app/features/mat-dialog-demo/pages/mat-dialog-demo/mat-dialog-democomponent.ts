import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogChildComponent } from '../../components/mat-dialog-child/mat-dialog-child.component';

@Component({
  selector: 'app-mat-dialog-demo',
  imports: [FormsModule],
  templateUrl: './mat-dialog-demo.component.html',
  styleUrl: './mat-dialog-demo.component.scss'
})


export class MatDialogDemoComponent {
  readonly dialog = inject(MatDialog);
  inputName = '';
  inputAnimal = '';
  res = '';

  showDialog() {
    const dialogRef = this.dialog.open(MatDialogChildComponent, {
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
