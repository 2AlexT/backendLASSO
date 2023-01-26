import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlDirective} from '@angular/forms';
import { getDocumento } from 'src/app/models/documento';
import { documentService } from 'src/app/services/documentoService';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { IdArticuloModel } from 'src/app/models/articulo';
import { ActivatedRoute } from '@angular/router';


const uri='http://localhost:8080/api/v1/articulo/63/upload'

@Component({
  selector: 'app-documento',
  templateUrl: './create.component.html',
  styleUrls: ['./documento.component.css'],
})
export class CreateDocComponent implements OnInit {

  // art?:IdArticuloModel
  id_articulo:string|any
  urlCreate:string|any
  breakpoint: number = 2;
  uploader!: FileUploader;
  attachmentList:any=[]
  constructor(
    private route:ActivatedRoute
  ) 
    {
       
}

  ngOnInit(): void {
    this.id_articulo=this.route.snapshot.paramMap.get('id_articulo');
    this.urlCreate=`http://localhost:8080/api/v1/articulo/${this.id_articulo}/upload`
    this.uploader=new FileUploader({url:this.urlCreate,headers:[{name:'Authorization', value:'Bearer ' + localStorage.getItem('accessToken')}]})
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    console.log(Headers)
    this.urlCreate=`http://localhost:8080/api/v1/articulo/${this.id_articulo}/upload`
    console.log(this.urlCreate)
    this.uploader.onCompleteItem= (item:any,response:any,status:any,headers:any)=>{
      this.attachmentList.push(JSON.parse(response));
  }

  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
  }
  onUpload(){

  }
  onFilechange($event){

  }

}


