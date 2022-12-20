import { NgModule } from '@angular/core';
import { RouterModule, Routes,} from '@angular/router';

//componentes
import { DashboardLayoutComponent,} from 'src/app/website/@pages/dashboard-layout/dashboard-layout.component';
import { AypCredencialesComponent,} from 'src/app/website/modulos/seccion1/ayp-credenciales/ayp-credenciales.component';
import { DosMilVeinteComponent } from './2020/2020.component';
import { ArticulosComponent } from './2020/articulos/articulos.component';
import { DosMilVeinteUnoComponent } from './2021/2021.component';

const routes: Routes = [
  {
    path: 'Empresa/Gestion', component: DashboardLayoutComponent,
    //canActivate: [RedirigirNoAutorizadoAlLoginGuard],
    children:[
      {
        path: ':id', component: DosMilVeinteComponent,
        children:[
          {path: 'Articulos', component: ArticulosComponent,}
        ],
      },
      {
        path: '2021', component: DosMilVeinteUnoComponent
      },
      {
        path: '2022', component: AypCredencialesComponent
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Seccion1RoutingModule { }
