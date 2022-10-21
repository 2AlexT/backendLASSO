import { Injectable, NgZone } from '@angular/core';
import { UsuarioAutenticado, UsuarioLogueado } from '../models/Usuario';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) {

    }
    
    AutenticarLdap(usuario: UsuarioAutenticado) {   
        return this.http.post('http://localhost:8080/api/v1/login',usuario,{headers:{skip:"true"}});
    }
    registrar(usuario:UsuarioAutenticado){
        return this.http.post(`http://localhost:8080/api/v1/signUp`,usuario)
    }
    generetaRefreshToken(){
        let input={
            refreshToken:this.getRefreshToken()
        }
        return this.http.post(` http://localhost:8080/api/v1/tokenRefresh`,input)
    }
    

    isLoggedIn(){
        console.log(localStorage.getItem('accessToken')+ "   AQUI ESTA EL LOGGEDIN  ")
        return localStorage.getItem('accessToken')!=null;
    }

    getToken(){
        return localStorage.getItem('accessToken')||'';
    }
    getRefreshToken(){
        return localStorage.getItem('refreshToken')||'';
    }

    saveTokens(tokenData:any){
        localStorage.setItem('accessToken',tokenData.accesToken)
       
    }


    obtenerUsuarioAutenticadoLdap(): UsuarioLogueado { 
        const usuarioAutenticado: UsuarioLogueado = JSON.parse((localStorage.getItem('auth')?.toString() || '')) || '';
        return usuarioAutenticado;
        
    }
    logout() {
        localStorage.clear();
    }

    estaAutenticado(): boolean {
        const usuario: string = localStorage.getItem('auth') || '';
        if(usuario === undefined || usuario === 'undefined') return false;
        return usuario !== null && usuario !== '' ? true : false;
    }
}