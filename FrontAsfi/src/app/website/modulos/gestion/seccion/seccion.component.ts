import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Route, ActivatedRoute, Router } from '@angular/router';

//SERVICIOS
import { AuthService } from 'src/app/services/auth.service';
import { SeccionService } from 'src/app/services/seccionService';

//MODELOS
import { getSeccion, Menu } from 'src/app/models/seccion';

//COMPONENTES
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {
  seccion:any
  mostrar:boolean= false!
  // usuarioAutenticado: UsuarioLogueado;


  constructor(
    private authService: AuthService,
    private seccionService: SeccionService,
    private router: Router,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    )

    {
      //this.usuarioAutenticado = this.authService.obtenerUsuarioAutenticadoLdap();
    }
    id: string | null="";
    LoadSeccionData : getSeccion[]=[];
    UrlGestion:string ="/asfi/Empresa/Gestion/${id}/Seccion/Articulo/";

  async ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      if (this.id!=undefined)
      {
        this.seccionService.obtenerSeccionPorGestion(this.id)
        .subscribe(respuesta => {
          this.LoadSeccionData = respuesta
          this.ordenarValores(this.LoadSeccionData)
          }
          ); 
     
      }
      else
      {
        this.SeccionE(undefined)
        console.log("PORQUE")
      }
    })
  }
  ordenarValores(vectorDocumento){
    console.log("DENTRO DE ORDENAR VALOREs")
    vectorDocumento.sort((a, b) => a.seccion < b.seccion ? -1 : a.seccion > b.seccion ? 1 : 0)
  }

  // Modal
  openDialog(): void{
    const dialogRef = this.dialog.open(ModalComponent, { data: '' });
    dialogRef.afterClosed().subscribe(res => {console.log(res);}); //Opcional show
  }
  // Fin Modal
  SeccionE(identificador){
  console.log("Es el id: "+identificador)
  }

}
