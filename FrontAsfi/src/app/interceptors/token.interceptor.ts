import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UsuarioLogueado } from '../models/Usuario';
import { AuthService } from '../services/auth.service';
@Injectable()
export class authInterceptor implements HttpInterceptor {
  static accessToken = '';

  constructor(private authService:AuthService) {

  }

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken=this.addTokenHeader(request,this.authService.getToken())
    if (request.headers.get("skip")){
      return next.handle(request)
    }else{

   
    return next.handle(accessToken).pipe(
      catchError(errorData=>{
        if(errorData.status===401){
         // this.authService.logout();
        return this.handlerRefreshToken(request,next)
        }
        return throwError(errorData);
      })
    ) };
  }

  handlerRefreshToken(request: HttpRequest<any>, next: HttpHandler){
    return this.authService.generetaRefreshToken().pipe(
      switchMap((data:any)=>{
        this.authService.saveTokens(data);
        return next.handle(this.addTokenHeader(request,data.accesToken))
      }),
      catchError(errorData=>{
        this.authService.logout();
        return  throwError(errorData)
      })
    )
  }

  addTokenHeader(request: HttpRequest<any>,token:any){
    return request.clone({
      headers:request.headers.set('Authorization','Bearer '+token)
    })
  }
}
