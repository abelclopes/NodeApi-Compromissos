import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {LocationStrategy, HashLocationStrategy} from '@angular/common'

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime'

import {ROUTES} from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CompromissosComponent } from './compromissos/compromissos.component';

import { CompromissosService} from './compromissos/compromissos.service';
import { NovoCompromissoComponent } from './compromissos/novo-compromisso/novo-compromisso.component'

import { ModalModule } from 'ngx-bootstrap';

import {SharedModule} from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component'
import 'eonasdan-bootstrap-datetimepicker';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NKDatetimeModule,
    HttpModule,
    ModalModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [CompromissosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
