import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {SharedModule} from '../shared/shared.module'
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


import { CompromissosApi } from "../logica-apis/index";

import {CompromissosComponent} from './compromissos.component'
import {NovoCompromissoComponent} from './novo-compromisso/novo-compromisso.component'

import { ModalModule } from 'ngx-bootstrap';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime'
import 'eonasdan-bootstrap-datetimepicker';
import * as $ from 'jquery';

const ROUTES: Routes = [
  {path:'', component: CompromissosComponent},
  {path: 'compromissos/:id', component: NovoCompromissoComponent},
]

@NgModule({
  declarations:[CompromissosComponent, NovoCompromissoComponent],
  imports: [
    SharedModule,

    NgxPaginationModule,
//    BrowserAnimationsModule,
    //BrowserModule,
    FormsModule,
    NKDatetimeModule,
    ModalModule.forRoot(),
    RouterModule.forChild(ROUTES)]
}) 
export class CompromissosModule {}
