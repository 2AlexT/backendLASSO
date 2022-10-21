import { Component, OnInit, Inject} from '@angular/core';
// import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './modal.component.html',
})
export class ConfirmDialogComponent implements OnInit{
  constructor(
    public modal: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string){}

    ngOnInit(): void {

    }
    onClickNO():void {
      this.modal.close();
    }
  }
