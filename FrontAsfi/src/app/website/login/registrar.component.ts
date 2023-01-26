import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { skip } from 'rxjs';
import { MailInterface } from 'src/app/services/mailService';
import { ModalErrorComponent } from 'src/app/shared/modal-error/modal-error.component';

@Component({
    selector: 'app-registrar',
    templateUrl: './registrar.component.html',
    styleUrls: ['./login.component.css'],
})
export class registrarComponent implements OnInit{

  datos:FormGroup;
 
  constructor(
    private _httpclient: HttpClient,
    public modal: MatDialogRef<registrarComponent>,@Inject(MAT_DIALOG_DATA)
    public message: string,
    public dialog: MatDialog,
    private _mailInterface: MailInterface
    ){
      this.datos = new FormGroup({
        nombre: new FormControl('', Validators.required),     
      })
    }

    crearUsuario(){
      let params = {
        nombre:this.datos.value.nombre,   
      }
      console.log("AVER QE ES"+ params)
      this._httpclient.post('http://localhost:8080/api/v1/signUp', params,{headers:{skip:"true"}}).subscribe(res => {
        console.log(res)
      }, (err: HttpErrorResponse) => {        
        if (err.error instanceof Error) {
            this.abrirModal('0ms', '0ms', 'ADVERTENCIA!','Ocurrio un problema en el procesos de creado de usuario.' );
            console.log("Client-side error");
        } else {       
            console.log(err.error);
            this.abrirModal('0ms', '0ms', 'ADVERTENCIA!','Ocurrióun problema en el procesos de creado de usuario.' );
            console.log("Server-side error");
        }
    })
      this.modal.close();
    }

    ngOnInit(): void {
    }
    abrirModal(enterAnimationDuration: string, exitAnimationDuration: string, titulo: string, mensaje: string): void {
      this.dialog.open(ModalErrorComponent, {
          width: '480px',
          data: { titulo: titulo, mensaje: mensaje },
          enterAnimationDuration,
          exitAnimationDuration,
      });
  }
    onClickNO():void {
      this.modal.close();
    }

  }
