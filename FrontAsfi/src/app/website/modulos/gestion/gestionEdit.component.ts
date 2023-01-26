import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { createGestion } from 'src/app/models/gestion';
import { gestionService } from 'src/app/services/gestionService';

//SERVICIOS

//MODELOS

//COMPONENTES

@Component({
  selector: 'app-seccion',
  templateUrl: './gestionEdit.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionEditComponent implements OnInit {

  constructor( private activaterouter:ActivatedRoute, private router:Router, private gestionService: gestionService
    )
    { }
    // id_seccion:any
    ListaSeccion:createGestion | any ;
    editarForm:any = new FormGroup({
      gestion: new FormControl(''),
    });
    urlListaGestion:string|any
    empresaId:string|any
    gestionId:string|any
    ngOnInit(): void {

        this.empresaId = this.activaterouter.snapshot.paramMap.get('id_empresa');
        this.gestionId = this.activaterouter.snapshot.paramMap.get('id_gestion');
        this.gestionService.getSingleGestion(this.empresaId, this.gestionId).subscribe(data => {
        console.log(data)
        this.urlListaGestion=`asfi/empresa/${this.empresaId}/gestion/listaGestion`
        this.ListaSeccion = data[0];
        this.editarForm.setValue({
          'gestion': this.ListaSeccion?.gestion
        })
    
        // console.log(this.ListaSeccion)
        console.log(this.editarForm.value)
      })

     
    }

    postForm(form:createGestion){
       this.gestionService.modificarGestion(form, this.empresaId ,this.gestionId).subscribe(data =>{
        console.log(data)
        this.router.navigate([this.urlListaGestion]);
        
      });
    console.log('metodo post form: ' + form.gestion);
    }
   
}
