import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MailInterface } from 'src/app/services/mailService';

@Component({
    selector: 'app-data',
    templateUrl: './docData.component.html',
    styleUrls: ['./articulos.component.css'],
})
export class docDataMiniPopUp implements OnInit{

  datos:FormGroup;
  articuloService: any;
  constructor(
    private _httpclient: HttpClient,
    public modal: MatDialogRef<docDataMiniPopUp>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mailInterface: MailInterface
    ){
      this.datos = new FormGroup({
        cantidad:new FormControl('',Validators.required)    
      })
    }

    cambiarCantidadMaximaDocumentos(){
      let params={
        cantidad_articulo:this.datos.value.cantidad, 
      }
      this._httpclient.post(`http://localhost:8080/api/v1/seccion/${this.data.id_seccion}/articulo/${this.data.id_articulo}/modificarCantidadArticulos`,params).subscribe(res => {
        console.log("res")
        window.location.reload()
      })
    }

    ngOnInit(): void {
    }

    onClickNO():void {
      this.modal.close();
    }

  }
