import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { UsuarioLogueado } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ModalErrorComponent } from 'src/app/shared/modal-error/modal-error.component';

interface Sistema {
    alias: string;
    name: string;
}

interface Accion {
    alias: string;
    name: string;
}

@Component({
    selector: 'app-ayp-credenciales',
    templateUrl: './ayp-credenciales.component.html',
    styleUrls: ['./ayp-credenciales.component.css']
})
export class AypCredencialesComponent implements OnInit {
    frmSolicitud: FormGroup = this.fb.group({
        sistema: ['', [Validators.required]],
        accion: ['', [Validators.required]],
    })
    sistemas: Sistema[] = [
        { alias: 'sificon', name: 'SIFICON' },
        { alias: 'sis-seg', name: 'SIS-SEG' },
        { alias: 'sis-soc', name: 'SIS-SOC' },
        { alias: 'fogavisp', name: 'FOGAVISP' },
        { alias: 'fogacp', name: 'FOGACP' },
        { alias: 'arandu', name: 'ARANDU' },
    ];
    acciones: Accion[] = [
        { alias: 'olvido_clave', name: 'Olvido de clave' },
        { alias: 'descaducar', name: 'Descaducado de clave' },
    ];
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        public dialog: MatDialog,
    ) { }

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

    procesarSolicitud() {
        if (!this.frmSolicitud.valid) {
            return;
        }

        console.log(this.frmSolicitud.value);


    }

}
