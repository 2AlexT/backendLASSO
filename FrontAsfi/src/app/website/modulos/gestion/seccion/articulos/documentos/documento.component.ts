import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDocumento } from 'src/app/models/documento';
import { documentService } from 'src/app/services/documentoService';

@Component({
  selector: 'app-articulos',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  public page : number | undefined;
  articulo: any;

  constructor(
    private documentoService: documentService,
    private route:ActivatedRoute,
  ) { }

  LoadDocumentoNombre: getDocumento[]=[];
  id_documento:number | null = null
  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has("id_documento"))
      {
        console.log("SI TIENE PARAMS LLAMADOS ID_DOCUEMNTo")
        
        this.id_documento=Number(params.get("id_documento"))
        this.documentoService.getDocnombre(this.id_documento).subscribe(response=>{
          this.LoadDocumentoNombre=response
        })
      }
      else{
        
       
      }
    })
  }

  // Buscador -----
 

  // Filtrar
  key:string = 'arti';
  reverse:boolean = true;

  Sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
