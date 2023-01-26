import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { createSeccion } from 'src/app/models/seccion';
import { SeccionService } from 'src/app/services/seccionService';

//SERVICIOS

//MODELOS

//COMPONENTES

@Component({
  selector: 'app-seccion',
  templateUrl: './seccionEdit.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionEditComponent implements OnInit {

  constructor( private activaterouter:ActivatedRoute, private router:Router, private seccionService:      SeccionService
    )
    { }
    // id_seccion:any
    ListaSeccion:createSeccion | any ;
    urlSeccion:string | any;
    editarForm:any = new FormGroup({
      seccion: new FormControl(''),
    });

    seccionId:string|any
    gestionId:string|any
    ngOnInit(): void {

      let gestionIds = this.activaterouter.snapshot.paramMap.get('id_gestion');
      let seccionIds = this.activaterouter.snapshot.paramMap.get('id_seccion');
      this.seccionService.getSingleSeccion(gestionIds, seccionIds).subscribe(data => {
        console.log(data)
        this.ListaSeccion = data[0];
        this.editarForm.setValue({
          'seccion': this.ListaSeccion?.seccion
        })
        // console.log(this.ListaSeccion)
        this.urlSeccion=`asfi/empresa/gestion/${gestionIds}`
      })

      this.seccionId = this.activaterouter.snapshot.paramMap.get('id_seccion');
      this.gestionId = this.activaterouter.snapshot.paramMap.get('id_gestion');
      
    }

    postForm(form:createSeccion){
      this.seccionService.modificarSeccion(form, this.gestionId ,this.seccionId).subscribe(data =>{
        console.log(data)
        this.router.navigate([this.urlSeccion]);
      });
    console.log('metodo post form: ' + form.seccion);
    }
}
