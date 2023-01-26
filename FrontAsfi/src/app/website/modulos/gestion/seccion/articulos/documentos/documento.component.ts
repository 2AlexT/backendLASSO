import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { descargarDocumento, getAllDocumentos, getDocumento } from 'src/app/models/documento';
import { documentService } from 'src/app/services/documentoService';
import{saveAs} from 'file-saver'

@Component({
  selector: 'app-articulos',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  
  public page : number | undefined;
  documento: any;
  http: any;
  listnombre:[]=[]
  nombredoc:any[]=[]
  display:number|any

  id_ruta_gestion: string|any
  id_ruta_seccion: string|any
  id_ruta_articulo: string|any
  constructor(
    private documentoService: documentService,
    private route:ActivatedRoute,
  ) { }

  LoadDocumentoNombre: getAllDocumentos[]=[];
  id_documento:number | null = null
  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has("id_articulo"))
      {
              
        this.id_documento=Number(params.get("id_articulo"))
        console.log(this.id_documento) 
        this.documentoService.getDocumentos(this.id_documento).subscribe(response=>{
          this.LoadDocumentoNombre=response
          this.display=response.length
          console.log(response[0].identificador)
        })
      }
      else{
        
       
      }
    })
    this.id_ruta_gestion = this.route.snapshot.paramMap.get('id_gestion');
    this.id_ruta_seccion = this.route.snapshot.paramMap.get('id_seccion');
    this.id_ruta_articulo = this.route.snapshot.paramMap.get('id_articulo');
  }

  // Buscador -----
  Search() {
    if(this.documento == ""){
      this.ngOnInit();
    } else {
      this.LoadDocumentoNombre = this.LoadDocumentoNombre.filter(res => {
        return res.nombre_archivo.toLocaleString().match(this.documento.toLocaleLowerCase())
      })
    }
  }

  // Filtrar
  key:string = 'nomb';
  reverse:boolean = true;

  Sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  //Eliminar
  eliminar(id_articulo,id_documento){
    this.documentoService.darAlta(id_articulo,id_documento).subscribe(data=>{
      window.location.reload()
    })
    console.log("eliminado" + id_articulo)
  }
  descargarDocumento(filename:string,nombreArchivo:string){
      this.documentoService.descargarDocumento(filename).subscribe(data=>{
        console.log(data)
        saveAs(data,nombreArchivo)
      })
  }
  iframePopUp(ruta_archivo:string) {
    const win:any = window.open();
    win.document.write(`<iframe width="100%" height="100%" src=http://127.0.0.1:8887/${ruta_archivo} allowfullscreen></iframe>`)
  }
}