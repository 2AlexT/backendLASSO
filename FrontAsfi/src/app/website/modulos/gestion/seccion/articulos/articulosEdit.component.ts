import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { createArticulo } from 'src/app/models/articulo';
import { ArticuloService } from 'src/app/services/articuloService';

//SERVICIOS

//MODELOS

//COMPONENTES

@Component({
  selector: 'app-seccion',
  templateUrl: './articulosEdit.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticuloEditComponent implements OnInit {

  constructor( private activaterouter:ActivatedRoute, private router:Router, private articuloService: ArticuloService
    )
    { }
    // id_seccion:any
    ListaArticulo:createArticulo | any ;
    urlArticulo:string | any;
    editarForm:any = new FormGroup({
      articulo: new FormControl(''),
    });

    seccionId:string|any
    articuloId:string|any
    gestionId:string|any
    ngOnInit(): void {
      this.seccionId = this.activaterouter.snapshot.paramMap.get('id_seccion');
      this.articuloId = this.activaterouter.snapshot.paramMap.get('id_articulo');
      this.gestionId= this.activaterouter.snapshot.paramMap.get('id_gestion');
      this.urlArticulo=`asfi/empresa/gestion/${this.gestionId}/seccion/${this.seccionId}`
      this.articuloService.getSingleArticulo(this.seccionId, this.articuloId).subscribe(data => {
        console.log(data)
        this.ListaArticulo = data[0];
        this.editarForm.setValue({
          'articulo': this.ListaArticulo?.articulo
        })
        // console.log(this.ListaSeccion)
        console.log(this.editarForm.value)
      })

    }

    postForm(form:createArticulo){
      this.articuloService.modificarArticulo(form, this.seccionId ,this.articuloId).subscribe(data =>{
        console.log(data)
        this.router.navigate([this.urlArticulo]);
      });
     console.log('metodo post form: ' + form.articulo);
    }
}
