import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './modal.component.html',
    // styleUrls: ['./seccion.component.css']
})
export class ModalComponent implements OnInit{
dataSource: any;
  constructor(
    public modal: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA)
    public message: string)
    {}

    ngOnInit(): void {}

    onClickNO():void {
      this.modal.close();
    }
  }
