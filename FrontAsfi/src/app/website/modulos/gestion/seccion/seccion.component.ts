import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Route, ActivatedRoute, Router } from '@angular/router';

//SERVICIOS
import { AuthService } from 'src/app/services/auth.service';
import { SeccionService } from 'src/app/services/seccionService';

//MODELOS
import { getSeccion,createSeccion, Menu } from 'src/app/models/seccion';

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
  IndexShow: boolean = true!
  CreateShow: boolean = false!
  EditShow: boolean = false!
  EditClose: boolean = true!
  ListaSeccion: createSeccion = {
    seccion: 1,
  };
  

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
    id_ruta_gestion: string | null=null;
    id_ruta_seccion: string | null=null;
    LoadSeccionData : getSeccion[]=[];
  
  async ngOnInit() {

      this.id_ruta_gestion = this.route.snapshot.paramMap.get("id_gestion")
      if (this.id_ruta_gestion!=undefined)
      {
        this.seccionService.obtenerSeccionPorGestion(this.id_ruta_gestion)
        .subscribe(respuesta => {
          this.LoadSeccionData = respuesta
          this.ordenarValores(this.LoadSeccionData)
          let ultimaSeccion=this.LoadSeccionData.slice(-1)
          console.log(ultimaSeccion)
          if(ultimaSeccion==undefined){
          }else{
            this.ListaSeccion={seccion:ultimaSeccion[0].seccion + 1}

          }
          }
          ); 
        
      }
      else
      {
        this.SeccionE(undefined)
        console.log("PORQUE")
      }
   
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
  //CREATE
   // CREATE CON PARAMS
   create() {
    this.route.paramMap.subscribe(params => {
      if (params.has("id_gestion")) {
        console.log(params.get("id_gestion"))
        this.id_ruta_gestion = params.get("id_gestion")
        
        // this.seccionService.savesSeccion(this.ListaSeccion, this.id_ruta_gestion).subscribe();
        this.seccionService.savesSeccion(this.ListaSeccion, this.id_ruta_gestion).subscribe(data =>
          {
            let respuesta:createSeccion = data;
            window.location.reload()
            
            // if(respuesta.status == "ok"){
            //   this.alertas.showSuccess('La seccion fue creada correctamente !!!');
            // }
            // else{
            //   this.alertas.showError(respuesta.result.error_msg, 'error');
            // }
            
          }

          );
         
      }
    })
  }
  //Dar de alta
  seccionId:string|any
  gestionId:string|any
  eliminar(identificador) {
    let gestionIds = this.route.snapshot.paramMap.get('id_gestion');
    this.seccionService.darAlta(gestionIds, identificador).subscribe(
      res => {
        console.log('seccion eliminado:'+ gestionIds + identificador);
        window.location.reload()
      },
    )
  }

}
