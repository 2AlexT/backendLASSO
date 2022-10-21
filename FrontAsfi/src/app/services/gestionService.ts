import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { getGestion } from 'src/app/models/gestion';
@Injectable({providedIn: 'root'})
export class gestionService{

    constructor(private http:HttpClient){}
    
    createAndStoreGestion(nombre:string){
        
    }


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

  
}