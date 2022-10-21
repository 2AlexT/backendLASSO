import { Component, OnInit } from '@angular/core';
import { UsuarioLogueado } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Config,Menu } from './types';
import {gestionService} from 'src/app/services/gestionService'
import { getGestion } from 'src/app/models/gestion';
import { empresaService } from 'src/app/services/empresaService';
import { getEmpresa } from 'src/app/models/empresa';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    usuarioAutenticado: UsuarioLogueado;
  
    constructor(private authService: AuthService,private gestionService:gestionService,private empresaService:empresaService) {
        this.usuarioAutenticado = this.authService.obtenerUsuarioAutenticadoLdap();
      
    }
    LoadEmpresaData:getEmpresa[]=[]
    LoadGestionData : getGestion[]=[]
    LoadMenuData:Menu[]=[]
    consigueDataGestion=false
    urlPrueba:string | undefined
    pruebaArray:[]=[]
    antesUrl:string ="/asfi/BancoFassil/";

    async ngOnInit() {
      this.config =  this.mergeConfig(this.options);
      this.consigueDataGestion=true
      this.empresaService.getEmpresa().subscribe(posts=>{
        this.consigueDataGestion=false
        this.LoadEmpresaData=posts
        console.log(this.LoadEmpresaData)
        this.activarEmpresa() 
      })   
      this.getGestion();
    }
    
    
    getGestion(){
     //CAMBIAR AQUI  
      this.gestionService.getGestion().subscribe(res=>{
        this.LoadGestionData=res
        console.log("Se llama Valores :: " + this.LoadGestionData )
       })
      console.log("Se llama a la funcion :: " )

    }
    getEmpresaData(){
      this.empresaService.getEmpresa();
    }

    activarEmpresa=()=>{
      for (let i = 0; i < this.LoadEmpresaData.length; i++) {
        this.LoadEmpresaData[i].active = false; 
      }
    }
    showLog(){
      console.log("Valores puestos dentro :== " + this.LoadEmpresaData[5])
    }
    

  
    menus: Menu[] = [
      {
        icon: 'settings',
        active: false, 
      }
      
    ];

    config:Config | undefined;
    options: Config = { multi: false };
   

    mergeConfig(options: Config) {
   
      const config = {
        // selector: '#accordion',
        multi: true
      };

      return { ...config, ...options };
    }

    toggle(index: number) {
      //submenu
      if (!this.config) {
        this.LoadEmpresaData.filter(
          (menu, i) => i !== index && menu.active
        ).forEach(menu => menu.active = !menu.active);
      }

      // Menu
      this.LoadEmpresaData[index].active = !this.LoadEmpresaData[index].active;
    }

}
