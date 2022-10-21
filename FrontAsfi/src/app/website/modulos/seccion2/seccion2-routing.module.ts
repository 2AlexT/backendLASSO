import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//guards
import { RedirigirNoAutorizadoAlLoginGuard } from 'src/app/guards/redirigir-no-autorizado-al-login.guard';
//componentes
import { DashboardLayoutComponent } from 'src/app/website/@pages/dashboard-layout/dashboard-layout.component'
import { Seccion1OpcionesComponent } from 'src/app/website/modulos/seccion1/seccion1-opciones/seccion1-opciones.component';
import { AypCredencialesComponent } from 'src/app/website/modulos/seccion1/ayp-credenciales/ayp-credenciales.component';
import { Demoseccion2Component } from './demoseccion2/demoseccion2.component';


const routes: Routes = [
  { 
    path: 'seccion2', 
    component: DashboardLayoutComponent,
    //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children:[
      {
        path: '',
        component: Demoseccion2Component    
      },
      {
        path: 'documentos',
        component: DashboardLayoutComponent
      }
    ]
  },
  { 
    path: 'seccion2', 
    component: DashboardLayoutComponent,
    //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children:[
      {
        path: '',
        component: Seccion1OpcionesComponent
      },
      {
        path: 'cambio-credenciales',
        component: AypCredencialesComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Seccion1RoutingModule { }
