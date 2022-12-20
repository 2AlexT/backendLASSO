import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, timer } from 'rxjs';
import { getArticulo } from 'src/app/models/articulo';
import { getDocumento,getAllDocumentos,getCantidadDoc } from 'src/app/models/documento';
import { ArticuloService } from 'src/app/services/articuloService';
import { documentService } from 'src/app/services/documentoService';
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent implements OnInit {

  public page : number | undefined;
  articulo: any;

  constructor(
    private articuloService: ArticuloService,
    private route:ActivatedRoute,
    private documentService:documentService
  ) { }
  rutaUrl : string="/asfi/Empresa/Gestion/${id}/Seccion/Articulo/${id}/Documento/"
  LoadArticuloData: getArticulo[]=[];
  LoadDocumentDataF:getDocumento[]=[];
  LoadDocumentoData: getAllDocumentos[]=[];
  LoadDocumentoCantidad:getCantidadDoc[]=[]
  width:any;



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has("id"))
      {
        console.log("Aqui est EL IDPARAMS "+ params.get("id"))
        this.articuloService.getArticulos(params.get("id"))
        .subscribe(respuesta => {
          this.LoadArticuloData = respuesta
          console.log(this.LoadArticuloData.length) 
          this.LoadArticuloData.sort((a, b) => a.articulo < b.articulo ? -1 : a.articulo > b.articulo ? 1 : 0)
          console.log("Antes que pase al for"+this.LoadArticuloData[0].identificador)
          for(let value of this.LoadArticuloData){
            if(this.LoadArticuloData.length>0){
              console.log("undefined eupte + " + value.identificador)
              this.getCantidadDoc(value.identificador)
            }else{
              console.log("TAMALOSPEQUELO")
            }
          }  
         
          
        })
        console.log("FUERA DE PARAMMAP + " + this.LoadArticuloData)
        this.width = 50 
        
      }
      else{
      }
    })
   


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

  //CARGAR CANTIDAD DE DOCUMENTOS EN UN ARTICULO
  getCantidadDoc(identificador:number|undefined){
    
      this.documentService.getCantidadDoc(identificador).subscribe(
       response=>{
        console.log("EsteesElIdentificador ++" + identificador)
        this.LoadDocumentDataF=response
        let datos:number 
        if(response.length==undefined){
          console.log(undefined)
        }else{
        datos=response.length
        let obj={identificador,data:datos}
        console.log("Este ES EL TAMAÑO DEL ARRAY FFFFF ++ " + obj.data)
        this.LoadDocumentoCantidad.push(obj)
        this.ordenarValores(this.LoadDocumentoCantidad)
      }
      }
    )
 
  }

  ordenarValores(vectorDocumento){
    console.log("DENTRO DE ORDENAR VALOREs")
    vectorDocumento.sort((a, b) => a.identificador < b.identificador ? -1 : a.identificador > b.identificador ? 1 : 0)
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


}
