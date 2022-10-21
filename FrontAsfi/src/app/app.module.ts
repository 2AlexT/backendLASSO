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
import { FileUploadModule } from 'ng2-file-upload'
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
import {
  SeleccionarYearComponent,
} from './website/modulos/seccion1/seleccionar-year/seleccionar-year.component';
import { authInterceptor } from './interceptors/token.interceptor';

//nuevo


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalErrorComponent,
    BlankLayoutComponent,
    SeleccionarYearComponent,

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
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: authInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
