
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { getDocumento,getAllDocumentos,getCantidadDoc } from 'src/app/models/documento';
@Injectable({providedIn: 'root'})
export class documentService{

    constructor(private http:HttpClient){}
    
    getCantidadDoc(documento: number | undefined){
        return this.http.get<{[key:number]:getDocumento}>(`http://localhost:8080/api/v1/${documento}/listaDocumentosId`)
        .pipe(
         map(responseData=>{
             const getArray: getDocumento[] = [] ;
             for (const key in responseData){
                 if(responseData.hasOwnProperty(key)){
                    
                     getArray.push({ ...responseData[key], id:key});
                 }
             }
             return getArray
         })        
        )
     }

    















    getDocnombre(documento: number | undefined){
        return this.http.get<{[key:number]:getDocumento}>(`http://localhost:8080/api/v1/${documento}/listaDocumentosId`)
        .pipe(
         map(responseData=>{
             const getArray: getDocumento[] = [] ;
             for (const key in responseData){
                 if(responseData.hasOwnProperty(key)){
                     getArray.push({ ...responseData[key], id:key});
                 }
             }
             return getArray
         })        
        )
     }

     getListaDocumentos(documento:string | number | null){
        return this.http.get<{[key:number]:getAllDocumentos}>(`http://localhost:8080/api/v1/articulo/${documento}/getAllDocumentos`)
        .pipe(
         map(responseData=>{
             const getArray: getAllDocumentos[] = [] ;
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