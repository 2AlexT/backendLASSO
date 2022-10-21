import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DialogModule} from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//modulos
import { Seccion1RoutingModule } from 'src/app/website/modulos/seccion2/seccion2-routing.module';
import { DashboardLayoutModule } from 'src/app/website/@pages/dashboard-layout/dashboard-layout.module';
import { Demoseccion2Component } from './demoseccion2/demoseccion2.component';
//componentes


@NgModule({
  declarations: [
   
  
    Demoseccion2Component
  ],
  imports: [
    DialogModule,
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
    ReactiveFormsModule,
  ],
  providers: [
  ],
  schemas: [  ]
})
export class Seccion1Module { }