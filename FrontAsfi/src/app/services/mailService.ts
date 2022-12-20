import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { mailModel } from '../models/mail';


@Injectable({
  providedIn: 'root'
})
export class MailInterface {

  constructor(private http:HttpClient) { }

  postEmail(mail:mailModel){
    return this.http.post(`http://localhost:8080/api/v1/senderEmail`,mail)
}
}
