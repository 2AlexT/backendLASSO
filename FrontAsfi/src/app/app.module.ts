import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//modulos
import { FileUploadModule } from 'ng2-file-upload';
import {TextFieldModule} from '@angular/cdk/text-field';
import { MaterialModule } from './material.module';
import {
  ModalErrorComponent,
} from './shared/modal-error/modal-error.component';
import {
  BlankLayoutComponent,
} from './website/@pages/blank-layout/blank-layout.component';
import {
  DashboardLayoutModule,
} from './website/@pages/dashboard-layout/dashboard-layout.module';



//Componentes
import { LoginComponent } from './website/login/login.component';

import { authInterceptor } from './interceptors/token.interceptor';
import { SeccionComponent } from './website/modulos/gestion/seccion/seccion.component';
import { DocumentoComponent } from './website/modulos/gestion/seccion/articulos/documentos/documento.component';
import { registrarComponent } from './website/login/registrar.component';
import { ErrorIntercept } from './interceptors/error.interceptor';
import { docDataMiniPopUp } from './website/modulos/gestion/seccion/articulos/docData.component';
//nuevo


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalErrorComponent,
    BlankLayoutComponent,
    
    SeccionComponent,
    DocumentoComponent,
    registrarComponent,
    docDataMiniPopUp
    
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    MaterialModule,
    DashboardLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextFieldModule
    
    //nuevo


  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorIntercept,
      multi:true
    },
    {
    provide:HTTP_INTERCEPTORS,
    useClass: authInterceptor,
    multi:true
    }
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
