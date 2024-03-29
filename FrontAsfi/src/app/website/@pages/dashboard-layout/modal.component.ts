import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MailInterface } from 'src/app/services/mailService';
import { UsuarioLogueado } from 'src/app/models/Usuario';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ConfirmDialogComponent implements OnInit{
  usuarioAutenticado: UsuarioLogueado;
  datos:FormGroup;
  constructor(
    private _httpclient: HttpClient,
    public modal: MatDialogRef<ConfirmDialogComponent>,@Inject(MAT_DIALOG_DATA)
    public message: string,
    private _mailInterface: MailInterface,
    private authService:AuthService
    ){
      this.usuarioAutenticado = this.authService.obtenerUsuarioAutenticadoLdap();
      this.datos = new FormGroup({
        correo: new FormControl('',[Validators.required, Validators.email]),
        asunto: new FormControl('', Validators.required),
        mensaje: new FormControl('', Validators.required)
      })
    }

    enviocorreo(){
      let params = {
        nombre:this.usuarioAutenticado.nombre,
        receiverUsername:this.datos.value.correo,
        messageSubject:this.datos.value.asunto,
        message: this.datos.value.mensaje
      }
      console.log(params)
      this._httpclient.post('http://localhost:8080/api/v1/senderEmail', params).subscribe(res => {
        console.log(res)
      })
    }

    ngOnInit(): void {
    }

    onClickNO():void {
      this.modal.close();
    }

  }
