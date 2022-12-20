import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../../@pages/dashboard-layout/dashboard-layout.component';
import { ArticulosComponent } from './seccion/articulos/articulos.component';
import { DocumentoComponent } from './seccion/articulos/documentos/documento.component';
import { SeccionComponent } from './seccion/seccion.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
const routes: Routes = [
  {
    path: 'Empresa/Gestion', component: DashboardLayoutComponent,
    //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children: [
        {
          path: ':id', component: SeccionComponent
        }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'Empresa/Gestion/:id/Seccion/Articulo', component: DashboardLayoutComponent,
    children:[
      {path: ':id', component: ArticulosComponent }
    ]
  },
  {
    path: 'Empresa/Gestion/:id/Seccion/Articulo/:id/Documento', component: DashboardLayoutComponent,
    children:[
      {path: 'lista', component: DocumentoComponent }
    ]
  },
  {
    path: 'Empresa/Gestion/:id/Seccion/Articulo/:id/Documento', component: DashboardLayoutComponent,
    children:[
      {path: ':id_documento', component: DocumentoComponent }
    ]
  }
  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
