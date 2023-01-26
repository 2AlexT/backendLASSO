import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getGestion,createGestion } from 'src/app/models/gestion';
@Injectable({providedIn: 'root'})
export class gestionService{

    constructor(private http:HttpClient){}
    getGestion(){
       return this.http.get<{[key:number]:getGestion}>(`http://localhost:8080/api/v1/empresa/getAllGestiones`)
       .pipe(
        map(responseData=>{
            const getArray: getGestion[] = [] ;
            for (const key in responseData){
                if(responseData.hasOwnProperty(key)){
                    getArray.push({ ...responseData[key], id:key});
                }
            }
            return getArray
        })  
       )
    }
    getAllGestiones(id_empresa:string | any): Observable<getGestion>{
        const url = `http://localhost:8080/api/v1/empresa/${id_empresa}/conseguir_gestion`;
        return this.http.get<getGestion>(url);
      }
    
    //Create Gestion
    createGestion(listaEmpresa: createGestion,id_empresa): Observable<createGestion>{
        return this.http.post<createGestion>(`http://localhost:8080/api/v1/empresa/${id_empresa}/gestion/crearGestion`, listaEmpresa);
       }
    //modificar gestion
    modificarGestion(form:createGestion, id_empresa,id_gestion):Observable<createGestion>{
        let URLPUT = `http://localhost:8080/api/v1/empresa/${id_empresa}/gestion/${id_gestion}/modificarGestion`;
        return this.http.post<createGestion>(URLPUT, form);
    }
     //dar de alta gestion
     darAlta(id_empresa,id_gestion): Observable<createGestion>{
        let URLDELETE = `http://localhost:8080/api/v1/empresa/${id_empresa}/gestion/${id_gestion}/darAltaGestion`;
        return this.http.delete<createGestion>(URLDELETE);
    }
    //Conseguir gestion espefica
    getSingleGestion(id_empresa,id_gestion): Observable<createGestion>{
        const url = `http://localhost:8080/api/v1/empresa/${id_empresa}/gestion/${id_gestion}/getSingleGestion`;
        return this.http.get<createGestion>(url);
    }
}