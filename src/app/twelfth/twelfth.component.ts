import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-twelfth',
  imports: [FormsModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './twelfth.component.html',
  styleUrl: './twelfth.component.scss'
})
export class TwelfthComponent {
  readonly dialogRef = inject(MatDialogRef<TwelfthComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  returnData = [this.data.name,this.data.animal];


  onSaveClick(){
    this.dialogRef.close(this.returnData);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
