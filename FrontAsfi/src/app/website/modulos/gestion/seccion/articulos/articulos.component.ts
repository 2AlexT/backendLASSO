import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { concatMap, timer } from 'rxjs';
import { createArticulo, getArticulo, getCantidadArticulos, modCantidadArticulos } from 'src/app/models/articulo';
import { getAllDocumentos,getCantidadDoc,  } from 'src/app/models/documento';
import { ArticuloService } from 'src/app/services/articuloService';
import { documentService } from 'src/app/services/documentoService';
import { docDataMiniPopUp } from './docData.component';
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent implements OnInit {

  public page : number =1;
  articulo: any;
  mostrar:boolean= false!
  // usuarioAutenticado: UsuarioLogueado;
  IndexShow: boolean = true!
  CreateShow: boolean = false!
  EditShow: boolean = false!
  EditClose: boolean = true!
  //
  mostrarFormCantidad:boolean=false!
  cantidadFormIndex:boolean=true!
  docEditShow: boolean = false!
  docEditClose: boolean = true!

  ListaCantidadDocumento:modCantidadArticulos={
     cantidad_articulo:0
  }

  ListaArticulo:createArticulo={
    articulo:1
  }
  usandoVentana=0
  constructor(
    private articuloService: ArticuloService,
    private route:ActivatedRoute,
    private documentService:documentService,
    private formB:FormBuilder,
    public dialog: MatDialog,
  ) { }
  rutaUrl : string="/asfi/empresa/gestion/${id}/seccion/articulo/${id}/documento/"
  LoadArticuloData: getArticulo[]=[];
  LoadDocumentoData: getAllDocumentos[]=[];
  LoadDocumentoCantidad:getCantidadDoc[] | any=[]
  CargarCantidadDocumentos:getCantidadArticulos[]| any=[]
  public cantidadDatos = {
    identificador: 0,
    cantidad: 10
    }
  width:any;

  id_ruta_gestion: string|any
  id_ruta_seccion: string|any

  ngOnInit() {
  
    this.route.paramMap.subscribe(params => {
      if (params.has("id_seccion"))
      {
        console.log("Aqui est EL IDPARAMS "+ params.get("id_seccion"))
        this.articuloService.getArticulos(params.get("id_seccion"))
        .subscribe(respuesta => {
          this.LoadArticuloData = respuesta
          this.LoadArticuloData.sort((a, b) => a.articulo < b.articulo ? -1 : a.articulo > b.articulo ? 1 : 0)
          for(let value of this.LoadArticuloData){
            if(this.LoadArticuloData.length>0){
              this.getCantidadDoc(value.identificador,value.articulo)
              
            }else{
              console.log("TAMALOSPEQUELO")
            }
          }      
          this.getCantidadMaximaDocumentos(this.id_ruta_seccion)
          let ultimoArticulo=this.LoadArticuloData.slice(-1)
          console.log(ultimoArticulo)
          if(ultimoArticulo==undefined){
          }else{
            this.ListaArticulo={articulo:ultimoArticulo[0].articulo + 1}

          }
        })
        this.width = 50 
        this.id_ruta_gestion = this.route.snapshot.paramMap.get('id_gestion');
        this.id_ruta_seccion = this.route.snapshot.paramMap.get('id_seccion');
       

      }
      else{
        console.log("inexistente")
      }
    })
   


  }

  abrirModal(enterAnimationDuration: string, exitAnimationDuration: string, titulo: string, mensaje: string): void {
    this.dialog.open(docDataMiniPopUp, {
        width: '480px',
        data: { titulo: titulo, mensaje: mensaje },
        enterAnimationDuration,
        exitAnimationDuration,
    });
}


  // Buscador -----
  Search() {
    if(this.articulo == ""){
      this.ngOnInit();
    } else {
      this.LoadArticuloData = this.LoadArticuloData.filter(res => {
        return res.articulo.toLocaleString().match(this.articulo.toLocaleLowerCase())
      })
    }
  }

  // Filtrar
  key:string = 'arti';
  reverse:boolean = true;
  cantidadDocs:number | null=null
  Sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Cantidad de documentos QUE SE NECESITA PARA COMPLETAR ARTICULO
  docCantidad:number=10;
  datos:number=0
  //CARGAR CANTIDAD DE DOCUMENTOS EN UN ARTICULO
  getCantidadDoc(identificador:number|undefined, articulo:number|undefined){
    
      this.documentService.getCantidadDoc(identificador).subscribe(
       response=>{
        if(response.length==undefined){
          console.log(undefined)
        }else{
        let data :number |undefined=response.length
        let obj={identificador:identificador,valor:data,articulo:articulo}
        console.log("Este ES EL TAMAÑO DEL ARRAY FFFFF ++ " + obj.valor + obj.articulo + obj.identificador)
        this.LoadDocumentoCantidad.push(obj)
        console.log(this.LoadDocumentoCantidad.length)
        this.ordenarValores(this.LoadDocumentoCantidad)
      }
      }
    )
 
  }
  getCantidadMaximaDocumentos(id_seccion:number){
    this.articuloService.getCantidadMaximaDocumentos(id_seccion).subscribe(
      response=>{
        this.CargarCantidadDocumentos=response
        this.CargarCantidadDocumentos.sort((a, b) => a.articulo < b.articulo ? -1 : a.articulo > b.articulo ? 1 : 0)
      }
    )
 
  }

  ordenarValores(vectorDocumento){
    console.log("DENTRO DE ORDENAR VALOREs")
    vectorDocumento.sort((a, b) => a.articulo < b.articulo ? -1 : a.articulo > b.articulo ? 1 : 0)
  }


  getListaDocumentos(identificador:number){
    this.documentService.getListaDocumentos(identificador).subscribe(
      response=>{
        this.LoadDocumentoData=response
        console.log("Este ES EL TAMAÑO DEL ARRAY DOCUMENTOS ++ " + this.LoadDocumentoData.length)
      }
    )
    return this.LoadDocumentoData.length
  }
  //Crear Articulo
  create() {
  
    this.articuloService.createArticulo(this.ListaArticulo,this.id_ruta_seccion).subscribe(data =>
      {
        let respuesta:createArticulo = data;
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
  eliminar(id_seccion:number,id_articulo:number){
    this.articuloService.darAlta(id_seccion,id_articulo).subscribe(data=>{
      window.location.reload()
    })
    console.log("eliminado" + id_articulo)
  }
  createForm(){
    return this.formB.group({
      identificador:0,
      cantidad:10,
    })
  }
  cambiarContador(id_seccion:number,id_articulo:number,form:modCantidadArticulos){
    console.log(form,id_seccion,id_articulo)
    this.articuloService.modificarCantidadArticulo(id_seccion,id_articulo,2).subscribe(res => {
      console.log(res)
      window.location.reload()
    })
    
  }
  openDialog(id_seccion:number,id_articulo:number): void {
    const dialogRef = this.dialog.open(docDataMiniPopUp, { data: {id_seccion:id_seccion,id_articulo:id_articulo} });
    dialogRef.afterClosed().subscribe(res => { console.log(res); }); //Opcional show
  }

}
