import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-child',
  imports: [FormsModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './mat-dialog-child.component.html',
  styleUrl: './mat-dialog-child.component.scss'
})
export class MatDialogChildComponent {
  readonly dialogRef = inject(MatDialogRef<MatDialogChildComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  returnData = [this.data.name,this.data.animal];


  onSaveClick(){
    this.dialogRef.close(this.returnData);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
