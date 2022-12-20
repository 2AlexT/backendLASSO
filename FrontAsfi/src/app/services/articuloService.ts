import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getArticulo } from '../models/articulo';


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
  
  
  
  
  
  // getArticulos(id:string | null): Observable<getArticulo[]>{
  //   const url = `http://localhost:8080/api/v1/seccion/${id}/getArticulos`;
  //   return this.http.get<getArticulo[]>(url);
  // }
}
