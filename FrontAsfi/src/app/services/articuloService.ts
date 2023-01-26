import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getArticulo,createArticulo, getCantidadArticulos, modCantidadArticulos } from '../models/articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }

  getAllArticulos(){
    return this.http.get<{[key:number]:getArticulo}>(`http://localhost:8080/api/v1/seccion/getAllArticulos`)
    .pipe(
      map((responseData)=>{
        const getArray: getArticulo[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            getArray.push({ ...responseData[key], id:key});
          }
        }
        return getArray
      })
    )
  }

  getArticulos(id:string | null){
    return this.http.get<{[key:number]:getArticulo}>(`http://localhost:8080/api/v1/seccion/${id}/getArticulos`)
    .pipe(
      map((responseData)=>{
        const getArray: getArticulo[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            getArray.push({ ...responseData[key], id:key});
          }
        }
        return getArray
      })
    )
  }
   //Create Articulo
   createArticulo(listaArticulo: createArticulo,id_seccion :string|null): Observable<createArticulo>{
    return this.http.post<createArticulo>(`http://localhost:8080/api/v1/seccion/${id_seccion}/articulo/crearArticulo`, listaArticulo);
   }
    //modificar articulo
    modificarArticulo(form:createArticulo, id_seccion,id_articulo):Observable<createArticulo>{
      let URLPUT = `http://localhost:8080/api/v1/seccion/${id_seccion}/articulo/${id_articulo}/modificarArticulo`;
      return this.http.post<createArticulo>(URLPUT, form);
  }
   //dar de alta articulo
   darAlta(id_seccion,id_articulo): Observable<createArticulo>{
      let URLDELETE = `http://localhost:8080/api/v1/seccion/${id_seccion}/articulo/${id_articulo}/darDeAltaArticulo`;
      return this.http.delete<createArticulo>(URLDELETE);
  }
  //Conseguir articulo espefico
  getSingleArticulo(id_seccion,id_articulo): Observable<createArticulo>{
      const url = `http://localhost:8080/api/v1/seccion/${id_seccion}/articulo/${id_articulo}/getSingleArticulo`;
      return this.http.get<createArticulo>(url);
  }
  //Conseguir CantidadMaxima de documentos necesitados
  getCantidadMaximaDocumentos(id_seccion:number):Observable<getCantidadArticulos>{
    const urlGetCantidadDocumento=`http://localhost:8080/api/v1/seccion/${id_seccion}/articulo/cantidadMaximaDocumentos`
    return this.http.get<getCantidadArticulos>(urlGetCantidadDocumento);
  }
  //MOdificar cantidaArticulo
  modificarCantidadArticulo(id_seccion:number,id_articulo:number,data:number):Observable<modCantidadArticulos>{
    let params={
      cantidad_articulo:data
    }
    console.log("DENTRO DEL MODIFICARCANIDAD + " + params)
    let urlCantidadArticulo=`http://localhost:8080/api/v1/seccion/${id_seccion}/articulo/${id_articulo}/modificarCantidadArticulos`
    return this.http.post<modCantidadArticulos>(urlCantidadArticulo,params)
  }
}
