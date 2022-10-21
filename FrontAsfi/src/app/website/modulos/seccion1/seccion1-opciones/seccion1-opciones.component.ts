import { Component, OnInit,Inject } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { SeleccionarYearComponent } from '../seleccionar-year/seleccionar-year.component';
import { RouterLink } from '@angular/router';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-seccion1-opciones',
  templateUrl: './seccion1-opciones.component.html',
  styleUrls: ['./seccion1-opciones.component.css']
})
export class Seccion1OpcionesComponent implements OnInit {
  animal: string | undefined;
  name: number | undefined;
  constructor(public dialog:Dialog) { }
  
  openDialog(): void { 
    if(this.name == 2021){
      
     

      const dialogRef = this.dialog.open<string>(SeleccionarYearComponent, {
        
        width: '350px',
        data: {name: this.name, animal: this.animal},
        });
      
      
      dialogRef.closed.subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    };
    console.log("Funca")
  }
  ngOnInit(): void {
  }

}
// @Component({
//   selector: 'seccion1-opciones.componentEme',
//   templateUrl: 'seccion1-opciones.componentEme.html',
//   
// })

export class CdkDialogOverviewExampleDialog {
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: DialogData) {}
}
