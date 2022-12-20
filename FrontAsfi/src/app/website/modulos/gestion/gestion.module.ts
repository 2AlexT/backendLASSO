// MODULOS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionRoutingModule } from './gestion-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule} from '@angular/material/tabs';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatInputModule} from '@angular/material/input';



// COMPONENTES
import { FileUploadModule } from 'ng2-file-upload';
import { ArticulosComponent } from './seccion/articulos/articulos.component';
// import { GestionComponent } from './gestion.component';
import { SeccionComponent } from './seccion/seccion.component';

import { TableComponent } from './seccion/table';
import { ModalComponent } from './seccion/modal.component';
import { OnCreateDirective } from './seccion/articulos/on-create.directive';


// import { TableComponent } from './seccion/table';
// import { ModalComponent } from './seccion/modal.component';


@NgModule({
  declarations: [
    ArticulosComponent,
    // GestionComponent,
    

    TableComponent,
    ModalComponent,
    OnCreateDirective,
    

    // TableComponent,
    // ModalComponent,

  ],

  imports: [
    FileUploadModule,
    CommonModule,
    GestionRoutingModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
  ],
  providers: [] // ++
})
export class GestionModule { }
