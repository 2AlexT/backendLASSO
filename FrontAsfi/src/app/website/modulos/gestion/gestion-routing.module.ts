import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../../@pages/dashboard-layout/dashboard-layout.component';
import { ArticulosComponent } from './seccion/articulos/articulos.component';
import { DocumentoComponent } from './seccion/articulos/documentos/documento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { empresaComponent } from '../empresa/empresa.component';
import { EmpresaEditComponent } from '../empresa/empresaEdit.component';
import { GestionComponent } from './gestion.component';
import { SeccionComponent } from './seccion/seccion.component';
import { SeccionEditComponent } from './seccion/seccionEdit.component';
import { GestionEditComponent } from './gestionEdit.component';
import { ArticuloEditComponent } from './seccion/articulos/articulosEdit.component';
import { CreateDocComponent } from './seccion/articulos/documentos/create.component';
import { DocumentoEditComponent } from './seccion/articulos/documentos/documentoEdit.component';
const routes: Routes = [
  //Empresa
  {
    path: 'empresa', component: DashboardLayoutComponent,
    //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children: [
        {
          path: 'listaEmpresa', component: empresaComponent
        }
    ], canActivate: [AuthGuard]
  },
    //Empresa Edit
    {
      path: 'empresa/listaEmpresa', component: DashboardLayoutComponent,
      //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
      children: [
          {
            path: ':id_empresa/editEmpresa', component: EmpresaEditComponent
          }
      ], canActivate: [AuthGuard]
    },
  //Gestion
  {
    path: 'empresa', component: DashboardLayoutComponent,
    //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children: [
        {
          path: ':id_empresa/gestion/listaGestion', component: GestionComponent
        }
    ], canActivate: [AuthGuard]
  },
  //Gestion Edit
  {
    path: 'empresa', component: DashboardLayoutComponent,
    //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children: [
        {
          path: ':id_empresa/gestion/:id_gestion/editGestion', component: GestionEditComponent
        }
    ], canActivate: [AuthGuard]
  },

  //SECCION
  {
    path: 'empresa/gestion', component: DashboardLayoutComponent,
    children:[
      {path: ':id_gestion', component: SeccionComponent }
    ],canActivate: [AuthGuard]
  },
  //Seccion Edit
  {
    path: 'empresa/gestion', component: DashboardLayoutComponent,
    children:[
      {path: ':id_gestion/seccion/:id_seccion/edit', component: SeccionEditComponent }
    ],canActivate: [AuthGuard],
  },
//Articulos
{
  path: 'empresa/gestion', component: DashboardLayoutComponent,
  children:[
    {path: ':id_gestion/seccion/:id_seccion', component: ArticulosComponent }
  ],canActivate: [AuthGuard],
},
//Articulos Edit
{
  path: 'empresa/gestion', component: DashboardLayoutComponent,
  children:[
    {path: ':id_gestion/seccion/:id_seccion/articulo/:id_articulo/editarArticulo', component: ArticuloEditComponent }
  ],canActivate: [AuthGuard],
},

//documentos
 {
    path: 'empresa/gestion', component: DashboardLayoutComponent,
    children:[
      {path: ':id_gestion/seccion/:id_seccion/articulo/:id_articulo', component: DocumentoComponent }
    ],canActivate: [AuthGuard],
  },
  //Documento Create
  {
    path: 'empresa/gestion', component: DashboardLayoutComponent,
    children:[
      {path: ':id_gestion/seccion/:id_seccion/articulo/:id_articulo/createDocument', component: CreateDocComponent }
    ],canActivate: [AuthGuard],
  },
  //Documento EditCOmpoennt
  {
    path: 'empresa/gestion', component: DashboardLayoutComponent,
    children:[
      {path: ':id_gestion/seccion/:id_seccion/articulo/:id_articulo/documento/:id_documento/editDocumento', component: DocumentoEditComponent }
    ],canActivate: [AuthGuard],
  }
  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
