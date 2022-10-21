import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,  ReactiveFormsModule,} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


import {  DashboardLayoutModule,} from 'src/app/website/@pages/dashboard-layout/dashboard-layout.module';
import {  AypCredencialesComponent,} from 'src/app/website/modulos/seccion1/ayp-credenciales/ayp-credenciales.component';
//componentes
import {  Seccion1OpcionesComponent,} from 'src/app/website/modulos/seccion1/seccion1-opciones/seccion1-opciones.component';
//modulos
import { Seccion1RoutingModule,} from 'src/app/website/modulos/seccion1/seccion1-routing.module';

import { DosMilVeinteComponent } from './2020/2020.component';
import { ConfirmDialogComponent,} from './2020/modal.component'; // Modal Component
import { TableComponent } from './2020/table';
import { DosMilVeinteUnoComponent } from './2021/2021.component';
import { ArticulosComponent } from './2020/articulos/articulos.component';



@NgModule({
  declarations: [
    Seccion1OpcionesComponent,
    AypCredencialesComponent,
    DosMilVeinteComponent,
    DosMilVeinteUnoComponent,
    ConfirmDialogComponent,
    TableComponent,
    ArticulosComponent,


  ],
  imports: [
    CommonModule,
    DashboardLayoutModule,
    Seccion1RoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule // Table

  ],

  //dialog
  // entryComponents: [ConfirmDialogComponent],

  providers: [

  ],
  schemas: [  ]
})
export class Seccion1Module { }
