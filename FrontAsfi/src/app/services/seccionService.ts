import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; //Nuevo
import { map } from "rxjs/operators";
import { getSeccion,createSeccion } from "../models/seccion";

@Injectable({
  providedIn: 'root'
})
export class SeccionService {
  UrlCreates='http://localhost:8080/api/v1/gestion/';
  UrlCreate='http://localhost:8080/api/v1/gestion/1/seccion/crearSeccion';
  // UrlEdit='http://localhost:8080/api/v1/gestion/:id_gestion/seccion/:id_seccion/modificarSeccion';
  direccion="http://localhost:8080/api/v1/gestion/";

  constructor(private http:HttpClient){}

    // getSeccion(id:number){
    // return this.http.get<{[key:number]:getSeccion}>(`http://localhost:8080/api/v1/gestion/${id}/getSecciones`)

    getSeccion(){
    return this.http.get<{[key:number]:getSeccion}>(`http://localhost:8080/api/v1/seccion/getAllSecciones`)

    .pipe(
      map((responseData)=>{
        const getArray: getSeccion[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            getArray.push({ ...responseData[key], id:key});
          }
        }
        return getArray
      })
    )
  }

  obtenerSeccionPorGestion(id:string | null): Observable<getSeccion[]>{
    // const url = `http://localhost:8080/api/v1/gestion/${id}/getSecciones`;
    // return this.http.get<getSeccion[]>(url);
    return this.http.get<{[key:number]:getSeccion}>(`http://localhost:8080/api/v1/gestion/${id}/getSecciones`)
    .pipe(
      map((responseData)=>{
        const getArray: getSeccion[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            getArray.push({ ...responseData[key], id:key});
          }
        }
        return getArray
      })
    )
  }
  //Crear Secciones
  savesSeccion(seccion: createSeccion, id_gestion:string|null): Observable<createSeccion>{
    return this.http.post<createSeccion>(`http://localhost:8080/api/v1/gestion/${id_gestion}/seccion/crearSeccion`, seccion);
  }
  //modificar Seccion
  modificarSeccion(form:createSeccion, id_gestion, id_seccion):Observable<createSeccion>{
    let URLPUT = this.direccion + id_gestion + "/seccion/" + id_seccion + "/modificarSeccion";
    return this.http.post<createSeccion>(URLPUT, form);
  }
 //dar de alta seccion
 darAlta( id_gestion, id_seccion): Observable<createSeccion>{
  let URLDELETE = this.direccion + id_gestion + "/seccion/" + id_seccion + "/darDeAltaSeccion";
  return this.http.delete<createSeccion>(URLDELETE);
}
// ver una seccion MODO 2
getSingleSeccion( id_gestion, id_seccion): Observable<createSeccion>{
  const url = `http://localhost:8080/api/v1/gestion/${id_gestion}/seccion/${id_seccion}/getSeccion`;
  return this.http.get<createSeccion>(url);
}






}
