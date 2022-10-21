import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { PostService } from "src/app/website/modulos/seccion1/2021/postService";
import { PostGetUsuarios,PostLogin } from "../../../../models/2021.model";
@Component({
    selector:"sidebar-shared",
    templateUrl:'./2021.component.html',
    styleUrls: ['./2021.component.css']
})
export class DosMilVeinteUnoComponent implements OnInit{
    firstNameAutofilled: boolean | undefined;
    lastNameAutofilled: boolean | undefined;
    username: string = '';
    loadedPost : PostGetUsuarios[]=[]
    isFetching= false;
    
    constructor(private http:HttpClient, private postService:PostService){}
    ngOnInit(): void {
        this.isFetching=true
        this.postService.fetchPost().subscribe(posts=>{
            this.isFetching=false
            this.loadedPost=posts
           });        
      
    }

    onCreatePost(postData:{nombre:string}){
        this.postService.createAndStorePost(postData.nombre);
    }  
    fetchPost(){
       this.postService.fetchPost()
    }
    clickme(){
      this.onCreatePost({nombre:this.username})
    }

}
