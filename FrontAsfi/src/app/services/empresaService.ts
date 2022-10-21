import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { getEmpresa } from 'src/app/models/empresa';
@Injectable({providedIn: 'root'})
export class empresaService{

    constructor(private http:HttpClient){}
    
    createAndStoreEmpresa(nombre:string){
        
    }


    getEmpresa(){
       return this.http.get('http://localhost:8080/api/v1/empresa/getEmpresas')
       .pipe(
        map((responseData)=>{
            const getArray: getEmpresa[] = [] ;
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