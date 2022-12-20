import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,} from '@angular/forms';


//componentes
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { ConfirmDialogComponent } from './modal.component';
// import { CuerpoMailComponent } from './cuerpomail.component';
import { InicioComponent } from 'src/app/website/inicio/inicio.component';
// import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    // DashboardComponent,
    InicioComponent,
    ConfirmDialogComponent,
    // CuerpoMailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    SharedModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
    // ConfirmDialogComponent,
  ],

  providers: [
    // DashboardService
  ]
})
export class DashboardLayoutModule { }
