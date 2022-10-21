import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CdkMenuModule} from '@angular/cdk/menu';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmDialogComponent } from './dialog/modal.component';
import { MatTableModule } from '@angular/material/table';

//import { AreaComponent } from './widgets/area/area.component';
//import { HighchartsChartModule } from 'highcharts-angular';
//import { CardComponent } from './widgets/card/card.component';
//import { PieComponent } from './widgets/pie/pie.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    // AreaComponent,
    // CardComponent,
    // PieComponent
    ConfirmDialogComponent, // Modal Dialog
    // MatTableModule,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    CdkMenuModule,
    //HighchartsChartModule
    MatTableModule, // Table
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatTableModule, // Table
    // AreaComponent,
    // CardComponent,
    // PieComponent
  ]
})
export class SharedModule { }
