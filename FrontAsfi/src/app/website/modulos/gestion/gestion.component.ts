import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { gestionService } from 'src/app/services/gestionService';
import { getGestion,createGestion } from 'src/app/models/gestion';



//SERVICIOS

//MODELOS

//COMPONENTES

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  public page : number | undefined;
  hola:string = "desde component gestion";
  mostrar:boolean= false!
  // usuarioAutenticado: UsuarioLogueado;
  IndexShow: boolean = true!
  CreateShow: boolean = false!
  EditShow: boolean = false!
  EditClose: boolean = true!
  ListaGestion:createGestion={
    gestion:2022
  }


  constructor( private activaterouter:ActivatedRoute, private router:Router, private gestionService: gestionService
    )
    { }
    // id_seccion:any
    gestion:number | undefined
    LoadGestionData:getGestion |any;
    editarForm:any = new FormGroup({
      gestion: new FormControl(''),
    });

    id_ruta_empresa:string|any
    ngOnInit(): void {
      this.id_ruta_empresa = this.activaterouter.snapshot.paramMap.get('id_empresa');
      this.getGestion(this.id_ruta_empresa)
      
      // let gestionIds = this.activaterouter.snapshot.paramMap.get('id_gestion');
      // let seccionIds = this.activaterouter.snapshot.paramMap.get('id_seccion');
      // this.seccionService.getSingleSeccion(gestionIds, seccionIds).subscribe(data => {
      //   console.log(data)
      //   this.ListaSeccion = data[0];
      //   this.editarForm.setValue({
      //     'seccion': this.ListaSeccion?.seccion
      //   })
      //   // console.log(this.ListaSeccion)
      //   console.log(this.editarForm.value)
      // })

      // this.id_ruta_empresa = this.activaterouter.snapshot.paramMap.get('id_empresa');
      // console.log("Es el id de la empresa: "+this.id_ruta_empresa)
    }

    // postForm(form:createSeccion){
    //   let gestionIds = this.activaterouter.snapshot.paramMap.get('id_gestion');
    //   let seccionIds = this.activaterouter.snapshot.paramMap.get('id_seccion');
    //   this.seccionService.putSeccion(form, gestionIds ,seccionIds).subscribe(data =>{
    //     console.log(data)
    //   });
    // console.log('metodo post form: ' + form.seccion);
    // }

    ordenarValores(vectorDocumento){
      console.log("DENTRO DE ORDENAR VALOREs")
      vectorDocumento.sort((a, b) => a.gestion < b.gestion ? -1 : a.gestion > b.gestion ? 1 : 0)
    }


    getGestion(idEmpresa){
      //CAMBIAR AQUI
      
      // this.id_ruta_empresa = this.activaterouter.snapshot.paramMap.get('id_empresa');
       this.gestionService.getAllGestiones(idEmpresa).subscribe(res=>{
         this.LoadGestionData=res
         this.ordenarValores(this.LoadGestionData)
         let ultimaGestion= this.LoadGestionData.slice(-1)
         this.ListaGestion={gestion:ultimaGestion[0].gestion + 1}
        })
       console.log(this.LoadGestionData)
       console.log("aqui el id de empresa: "+ this.id_ruta_empresa)

     }
     //create gestion
     create(id_empresa) {
      this.gestionService.createGestion(this.ListaGestion,id_empresa).subscribe(data =>
        {
          let respuesta:createGestion = data;
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
     //Dar de alta
     eliminar(id_empresa,id_gestion){
      this.gestionService.darAlta(id_empresa,id_gestion).subscribe(data=>{
      })
      console.log("eliminado" + id_empresa,id_gestion)
    } 
     //Sorter
     key:number = 2;
     reverse:boolean = true;
     Sort(key){
       this.key = key;
       this.reverse = !this.reverse;
     }
     // 
      //buscador
    Search() {
      if(this.gestion == undefined){
        this.ngOnInit();
      } else {
        this.LoadGestionData = this.LoadGestionData.filter(res => {
          return res.gestion.toLocaleString().match(this.gestion)
        })
      }
    }

}
