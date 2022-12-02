import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { documento } from 'src/app/models/documento';
@Injectable({providedIn: 'root'})
export class empresaService{

    constructor(private http:HttpClient){}
    
    createAndStoreEmpresa(nombre:string){
        
    }


    getDocumentoList(){
       return this.http.get('http://localhost:8080/api/v1/articulo/:id_articulo/getDocumento')
       .pipe(
        map((responseData)=>{
            const getArray: documento[] = [] ;
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