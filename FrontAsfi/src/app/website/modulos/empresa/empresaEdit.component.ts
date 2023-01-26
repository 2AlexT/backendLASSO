import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { createEmpresa } from 'src/app/models/empresa';
import { empresaService } from 'src/app/services/empresaService';

//SERVICIOS

//MODELOS

//COMPONENTES

@Component({
  selector: 'app-seccion',
  templateUrl: './empresaEdit.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaEditComponent implements OnInit {

  constructor( private activaterouter:ActivatedRoute, private router:Router, private seccionService: empresaService
    )
    { }
    // id_seccion:any
    ListaEmpresa:createEmpresa | any ;
    urlEmpresa:string="asfi/empresa/listaEmpresa";
    editarForm:any = new FormGroup({
      nombre: new FormControl(''),
    });
    empresaId=this.activaterouter.snapshot.paramMap.get('id_empresa');


    ngOnInit(): void {
      this.seccionService.getSingleEmpresa(this.empresaId).subscribe(data => {
        console.log(data[0])
        this.ListaEmpresa = data[0];
        this.editarForm.setValue({
          'nombre': this.ListaEmpresa?.nombre
        })
        // console.log(this.ListaSeccion)
        console.log(this.editarForm.value)
      })
    }

    postForm(form:createEmpresa){
        console.log(form.id)
      this.seccionService.modificarEmpresa(form, this.empresaId).subscribe(data =>{
        console.log(data)
        this.router.navigate([this.urlEmpresa]);
      });
    console.log('metodo post form: ' + form.nombre);
    }
}
