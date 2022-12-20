import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; //Nuevo
import { map } from "rxjs/operators";
import { getSeccion } from "../models/seccion";

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

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
}
