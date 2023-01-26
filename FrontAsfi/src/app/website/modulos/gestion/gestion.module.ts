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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar'//
import { FileUploadModule } from 'ng2-file-upload';


// COMPONENTES
import { ArticulosComponent } from './seccion/articulos/articulos.component';
import { ArticuloEditComponent } from './seccion/articulos/articulosEdit.component';

import { empresaComponent } from '../empresa/empresa.component';
import { EmpresaEditComponent } from '../empresa/empresaEdit.component';
import { GestionComponent } from './gestion.component';
import { GestionEditComponent } from './gestionEdit.component';
//import { SeccionComponent } from './seccion/seccion.component';
//import { DocumentoComponent } from './seccion/articulos/documentos/documento.component';
import { SeccionEditComponent } from './seccion/seccionEdit.component';
import { CreateDocComponent } from './seccion/articulos/documentos/create.component';
import { DocumentoEditComponent } from './seccion/articulos/documentos/documentoEdit.component';
// import { GestionComponent } from './gestion.component';

import { TableComponent } from './seccion/table';
import { ModalComponent } from './seccion/modal.component';
import { OnCreateDirective } from './seccion/articulos/on-create.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from 'src/app/interceptors/error.interceptor';
import { authInterceptor } from 'src/app/interceptors/token.interceptor';


// import { TableComponent } from './seccion/table';
// import { ModalComponent } from './seccion/modal.component';


@NgModule({
  declarations: [
    empresaComponent,
    EmpresaEditComponent,
    GestionComponent,
    GestionEditComponent,
    ArticulosComponent,
    ArticuloEditComponent,
  //  SeccionComponent,
    SeccionEditComponent,
    // GestionComponent,
    
    CreateDocComponent,
    DocumentoEditComponent,
    TableComponent,
    ModalComponent,
    OnCreateDirective,
    

    // TableComponent,
    // ModalComponent,

  ],

  imports: [
    MatProgressBarModule,
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
    
  ],
  providers: [
    
] // ++
})
export class GestionModule { }
