import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//guards
import { RedirigirAutenticadoAlInicioGuard } from './guards/redirigir-autenticado-al-inicio.guard';
import { RedirigirNoAutorizadoAlLoginGuard } from './guards/redirigir-no-autorizado-al-login.guard';
//componentes
import { InicioComponent } from './website/inicio/inicio.component';
import { LoginComponent } from './website/login/login.component';

import {DashboardLayoutComponent} from './website/@pages/dashboard-layout/dashboard-layout.component'
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'inicio',
    component: DashboardLayoutComponent,
    // canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children:[
      {
        path: '',
        component: InicioComponent,
      }
    ], canActivate: [AuthGuard],

  },
  {
    path: 'asfi',
    loadChildren: () => import('src/app/website/modulos/seccion1/seccion1.module').then(m => m.Seccion1Module), canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '', // componente de error 404
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
