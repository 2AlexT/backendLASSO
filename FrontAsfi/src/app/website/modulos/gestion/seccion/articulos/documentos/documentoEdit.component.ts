import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { modificarDocumento } from 'src/app/models/documento';
import { documentService } from 'src/app/services/documentoService';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

//SERVICIOS

//MODELOS

//COMPONENTES

@Component({
  selector: 'app-seccion',
  templateUrl: './documentoEdit.component.html',
  styleUrls: ['./documento.component.css']
})

export class DocumentoEditComponent implements OnInit {

  constructor(  private activaterouter:ActivatedRoute, 
                private router:Router, 
                private documentoService: documentService
    )
    { }
    // id_seccion:any
    ListaDocumento:modificarDocumento | any ;
    articuloId:string|any
    documentoId:string|any
    gestionId:string|any
    seccionId:string|any
    urlDocumento:string="asfi/empresa/gestion/";
    editarForm:any = new FormGroup({
        documento: new FormControl(''),
        descripcion:new FormControl('')
    });
   


    ngOnInit(): void {
        this.gestionId=this.activaterouter.snapshot.paramMap.get('id_gestion');
        this.seccionId=this.activaterouter.snapshot.paramMap.get('id_seccion');
        this.documentoId=this.activaterouter.snapshot.paramMap.get('id_documento');
        this.articuloId=this.activaterouter.snapshot.paramMap.get('id_articulo')
         this.documentoService.getSingleDocumento(this.articuloId,this.documentoId).subscribe(data => {
        console.log(data[0])
        this.ListaDocumento = data[0];
        let nombreDocumento= this.ListaDocumento.nombre_archivo.substring(0,this.ListaDocumento.nombre_archivo.lastIndexOf('-'))
        this.editarForm.setValue({
          'documento': nombreDocumento,
          'descripcion':this.ListaDocumento?.descripcion
        })
        // console.log(this.ListaSeccion)
        console.log(this.editarForm.value)
      })
    }

    postForm(form:modificarDocumento){
        console.log(form.id)
        this.documentoService.modificarDocumento(form, this.articuloId,this.documentoId).subscribe(data =>{
        this.router.navigate([`${this.urlDocumento}${this.gestionId}/seccion/${this.seccionId}/articulo/${this.articuloId}`]);
      }, (err: HttpErrorResponse) => {        
        if (err.error instanceof Error) {
            console.log(`${this.urlDocumento}${this.gestionId}/seccion/${this.seccionId}/articulo/${this.articuloId}`);

            this.router.navigate([`${this.urlDocumento}${this.gestionId}/seccion/${this.seccionId}/articulo/${this.articuloId}`]);
        } else {       
            console.log(err.error);
            console.log(`${this.urlDocumento}${this.gestionId}/seccion/${this.seccionId}/articulo/${this.articuloId}`);

            console.log("Server-side error");
            this.router.navigate([`${this.urlDocumento}${this.gestionId}/seccion/${this.seccionId}/articulo/${this.articuloId}`]);
        }
      });
    console.log('metodo post form: ' + form.documento);
    }
}
