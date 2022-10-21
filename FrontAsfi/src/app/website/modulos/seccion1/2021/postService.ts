import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { PostGetUsuarios, PostLogin } from "../../../../models/2021.model";

@Injectable({providedIn: 'root'})
export class PostService{

    constructor(private http:HttpClient){}
    
    createAndStorePost(nombre:string){
        const postData: PostLogin={
            nombre:nombre
        };
        this.http.post<{nombre:string}>('http://localhost:8080/api/v1/login',postData
        ).subscribe(responseData=>{
            console.log(responseData)
        });
    }


    fetchPost(){
       return this.http.get<{[key:number]:PostGetUsuarios}>('http://localhost:8080/api/v1/users/91/')
        .pipe(
            map((responseData)=>{
            const postArray: PostGetUsuarios[] = [] ;
            for (const key in responseData){
                if(responseData.hasOwnProperty(key)){
                    postArray.push({ ...responseData[key], id:key});
                }
            }
            return postArray
        })
    )
    }
}