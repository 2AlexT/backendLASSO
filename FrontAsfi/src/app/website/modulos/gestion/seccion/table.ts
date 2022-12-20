import { Component, ViewChild, OnInit} from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { getArticulo } from 'src/app/models/articulo';
import { ArticuloService } from 'src/app/services/articuloService';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./seccion.component.css']
})

export class TableComponent implements OnInit {

  public page : number | undefined;

  constructor(
    private articuloService: ArticuloService,

  )
  {}

  LoadArticuloData : getArticulo[]=[]
  consigueDataArticulo = false

  async ngOnInit() {
    this.consigueDataArticulo=true
    this.articuloService.getAllArticulos().subscribe(response=>{
      this.LoadArticuloData=response
      console.log(this.LoadArticuloData)
    })
    this.getAllArticulos();
  }

  getAllArticulos(){
    //CAMBIAR AQUI
      this.articuloService.getAllArticulos()
      console.log("Se llama a la funcion :: " )
    }
}
