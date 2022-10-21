import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { getSeccion } from "../models/seccion";
@Injectable({providedIn: 'root'})
export class gestionService{

    constructor(private http:HttpClient){}
    
    createAndStoreGestion(nombre:string){
        
    }


    getSeccion(idSeccion:number){
       return this.http.get<{[key:number]:getSeccion}>(`/gestion/${idSeccion}/getSecciones`)
       .pipe(
        map(responseData=>{
            const getArray: getSeccion[] = [] ;
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