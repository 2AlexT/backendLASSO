import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload'

const uri='http://localhost:8080/api/v1/articulo/3/articulo/upload'
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  breakpoint: number = 2;
  uploader:FileUploader=new FileUploader({url:uri,headers:[{name:'Authorization', value:'Bearer ' + localStorage.getItem('accessToken')}]})
  attachmentList:any=[]
  constructor() {
      this.uploader.onCompleteItem= (item:any,response:any,status:any,headers:any)=>{
      this.attachmentList.push(JSON.parse(response));
    }
  
}






  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    console.log(Headers)
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
  }
}

