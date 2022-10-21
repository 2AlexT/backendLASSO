import {Component} from '@angular/core';
// import { read,utils } from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './modal.component';
// import { ConfirmDialogComponent } from 'src/app/shared/dialog/modal.component';


@Component({
    selector:"sidebar-shared",
    templateUrl:'./2020.component.html',
    styleUrls: ['./2020.component.css']
})
export class DosMilVeinteComponent {
  constructor(

    // Modal
    public dialog: MatDialog){}
      openDialog(): void{
        const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: 'texto'});
        dialogRef.afterClosed().subscribe(res => {console.log(res);}); //Opcional show
      }
    // Fin Modal
}
