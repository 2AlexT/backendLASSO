import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getEmpresa,createEmpresa } from 'src/app/models/empresa';
@Injectable({providedIn: 'root'})
export class empresaService{

    constructor(private http:HttpClient){}

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

    //Crear Empresa
    createEmpresa(listaEmpresa: createEmpresa): Observable<createEmpresa>{
     return this.http.post<createEmpresa>(`http://localhost:8080/api/v1/empresa/registrar`, listaEmpresa);
    }
     //modificar Seccion
    modificarEmpresa(form:createEmpresa, id_empresa):Observable<createEmpresa>{
        let URLPUT = `http://localhost:8080/api/v1/empresa/${id_empresa}/modificar`;
        return this.http.post<createEmpresa>(URLPUT, form);
    }
    //dar de alta seccion
    darAlta(id_empresa): Observable<createEmpresa>{
        let URLDELETE = `http://localhost:8080/api/v1/empresa/${id_empresa}/darAltaEmpresa`;
        return this.http.delete<createEmpresa>(URLDELETE);
    }
    //Conseguir seccion espefica
    getSingleEmpresa( id_empresa): Observable<createEmpresa>{
        const url = `http://localhost:8080/api/v1/empresa/${id_empresa}/getSingleEmpresa`;
        return this.http.get<createEmpresa>(url);
    }
    createPlantillaEmpresas(){
        let url=`http://localhost:8080/api/v1/generatePlantilla`
    }


}