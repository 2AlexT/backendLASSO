import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { empresaService } from 'src/app/services/empresaService';
import { createEmpresa, getEmpresa } from 'src/app/models/empresa';



@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.css']
  })
  export class empresaComponent implements OnInit{
    constructor( private empresaService :empresaService,
                  private route :ActivatedRoute){

    }
    public page : number =1;
    empresa:any
    mostrar:boolean= false!
    // usuarioAutenticado: UsuarioLogueado;
    IndexShow: boolean = true!
    CreateShow: boolean = false!
    EditShow: boolean = false!
    EditClose: boolean = true!
    LoadEmpresaData:getEmpresa[]=[];
    listaEmpresa: createEmpresa = {
      nombre:"",
    };
    urlEmpresa="empresa/"
    urlEditEmpresa=`asfi/empresa/listaEmpresa/`


   ngOnInit(){
      this.getEmpresaData()
    }
    

    getEmpresaData(){
      this.empresaService.getEmpresa().subscribe(post=>{
        this.LoadEmpresaData=post 
        for(let value of this.LoadEmpresaData){
          console.log(value)
        }
    
      });
     
     
    }


    //buscador
    Search() {
      if(this.empresa == ""){
        this.ngOnInit();
      } else {
        this.LoadEmpresaData = this.LoadEmpresaData.filter(res => {
          return res.nombre.toLocaleString().match(this.empresa)
        })
      }
    }
    //Sorter
    key:string = 'nomb';
    reverse:boolean = true;
    Sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
    //
    ordenarValores(vectorDocumento){
      console.log("DENTRO DE ORDENAR VALOREs")
      vectorDocumento.sort((a, b) => a.identificador < b.identificador ? -1 : a.identificador > b.identificador ? 1 : 0)
    }
    //Crear Empresa
    create() {
          this.empresaService.createEmpresa(this.listaEmpresa).subscribe(data =>
            {
              let respuesta:createEmpresa = data;
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
    //Modificar Empresa
   
    //Dar de alta
    eliminar(identificador){
      this.empresaService.darAlta(identificador).subscribe(data=>{

      })
      console.log("eliminado" + identificador)
    }
}