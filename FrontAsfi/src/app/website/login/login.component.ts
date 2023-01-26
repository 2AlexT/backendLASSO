import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalErrorComponent } from 'src/app/shared/modal-error/modal-error.component';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/tokenService';


import { UsuarioLogueado } from 'src/app/models/Usuario';
import { registrarComponent } from './registrar.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        public dialog: MatDialog,
        private enrutador: Router,
        private tokenService:TokenService
    ) {
    }

    hide: boolean = true;
    responseDataLogin:any

    ngOnInit() {
    }
    abrirModal(enterAnimationDuration: string, exitAnimationDuration: string, titulo: string, mensaje: string): void {
        this.dialog.open(ModalErrorComponent, {
            width: '480px',
            data: { titulo: titulo, mensaje: mensaje },
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }

    loginForm: FormGroup = this.fb.group({
        nombre: ['', [Validators.required]],
    })


    onLogin() {
        if (!this.loginForm.valid) {
            return ;
        }else{      
        this.authService.AutenticarLdap(this.loginForm.value).subscribe(
            (result:any) => {
                this.responseDataLogin=result
                localStorage.setItem('auth', JSON.stringify(this.responseDataLogin));
                localStorage.setItem('accessToken',this.responseDataLogin.accesToken)
                localStorage.setItem('refreshToken',this.responseDataLogin.refrehsToken)
                this.enrutador.navigate(['inicio']);
            }, (err: HttpErrorResponse) => {        
                if (err.error instanceof Error) {
                    this.abrirModal('0ms', '0ms', 'ADVERTENCIA!',err.error.message || 'Ocurrió un problema en el proceso de autenticación.' );
                    console.log("Client-side error");
                } else {       
                    console.log(err.error);
                    this.abrirModal('0ms', '0ms', 'ADVERTENCIA!',err.error.message || 'Ocurrió un problema en el proceso de autenticación.' );
                    console.log("Server-side error");
                }
            }
        );
    }

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(registrarComponent, { data: '' });
        dialogRef.afterClosed().subscribe(res => { console.log(res); }); //Opcional show
      }
}
