
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getDocumento,getAllDocumentos,getCantidadDoc, modificarDocumento, descargarDocumento } from 'src/app/models/documento';
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class documentService{
    dirrecion=`http://localhost:8080/api/v1/`

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
     getDocumentos(id_articulo: number | undefined){
        return this.http.get<{[key:number]:getAllDocumentos}>(`http://localhost:8080/api/v1/articulo/${id_articulo}/getAllDocumentos`)
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
      //modificar documento
    modificarDocumento(form:modificarDocumento, id_articulo, id_documento):Observable<modificarDocumento>{
            let URLPUT = this.dirrecion +'articulo/'+ id_articulo + "/documento/" + id_documento + "/modificarDocumento";
            return this.http.post<modificarDocumento>(URLPUT, form);
        }
    //dar de alta seccion
        darAlta( id_articulo, id_documento): Observable<modificarDocumento>{
            let URLDELETE = this.dirrecion +'articulo/'+ id_articulo + "/documento/" + id_documento + "/darDeAltaDocumento";
            return this.http.delete<modificarDocumento>(URLDELETE);
    }
        // ver una seccion MODO 2
        getSingleDocumento( id_articulo, id_documento): Observable<modificarDocumento>{
            const url = `http://localhost:8080/api/v1/articulo/${id_articulo}/documento/${id_documento}/getSingleDocumento`;
            return this.http.get<modificarDocumento>(url);
    }

    descargarDocumento(filename:string){
        let data={filename:`${filename}`}
        return this.http.post(environment.urlApiDocumentoDownload,data,{
            responseType:'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        })

    }

}