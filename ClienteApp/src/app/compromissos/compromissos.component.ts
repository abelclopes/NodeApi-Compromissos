import { Component, OnInit,TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http'
import {Observable} from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import {MEAT_API} from '../app.api'

import { CompromissosApi, Compromisso, CompromissosModel ,ListaPaginadaCompromissosModel} from "../logica-apis/index";

import {NotificationService} from '../shared/messages/notification.service'

@Component({
  selector: 'app-compromissos',
  templateUrl: './compromissos.component.html',
  styleUrls: ['./compromissos.component.css']
})
export class CompromissosComponent implements OnInit {
  tituloApp: string
  cpFormGroup: FormGroup;
  compromissos: CompromissosModel[]

  paginaAtual: number;
  tamanhoPagina = 10
  totalItens: number;
  listaPaginadaCompromissosModel: ListaPaginadaCompromissosModel
  buttonSave: boolean

  private termoFiltro = new Subject<string>();

  constructor(private compromissosApi: CompromissosApi, private notificationService: NotificationService)
  {
    this.paginaAtual = 1;
  }

  filtrar(termo: string): void {
    this.termoFiltro.next(termo);
  }

  paginar(pagina: number, termo: string): void {
    this.paginaAtual = pagina;
    this.termoFiltro.next(termo);
  }
  ngOnInit() {
    this.buttonSave = true;


    this.cpFormGroup = new FormGroup({
      titulo: new FormControl('',[Validators.required]),
      descricao: new FormControl('',[Validators.required]),
      dataInicio: new FormControl('',[Validators.required]),
      dataFim: new FormControl('',[Validators.required]),
      status: new FormControl(''),
      _id: new FormControl('')
    });

    this.tituloApp = 'Angenda de Compromissos'
    this.termoFiltro
    .debounceTime(200)
    .switchMap(termo => this.compromissosApi.apiCompromissosGet(this.paginaAtual, this.tamanhoPagina))
    .subscribe(x => {
      this.compromissos = x.resultado
      this.totalItens = x.totalItens;
    })

    this.termoFiltro.next("");

  }

  addSubstractDays(date: Date): Date {
    let d = new Date(date);
    return new Date(
        d.getFullYear(),
        d.getMonth(),
        (d.getDate())
    );
  }
  Excluir(item)
  {
    this.compromissosApi.apiCompromissosByCompromissoIdDelete(item._id)
    .subscribe(
          async (data) => {
            var index = this.compromissos.indexOf(item);
            this.compromissos.splice(index, 1)

           this.notificationService.notify(`Você adicionou o Compromisso ${item.titulo}`)
         },
        (err)=> {
          this.notificationService.notify(`Ocorreu um erro ao tentar realizar a operação ${err.status}`);
    });
  }

  Editar(compromisso: CompromissosModel)
  {
    this.buttonSave = false;
    this.cpFormGroup.patchValue({
      'titulo': compromisso.titulo,
      'status': compromisso.status,
      '_id': compromisso._id,
      'dataInicio': this.addSubstractDays(compromisso.dataInicio),
      'dataFim': this.addSubstractDays(compromisso.dataFim)
    });
  }
  SalvaEditar(compromisso)
  {
    var model = {
        titulo: compromisso.titulo,
        status: compromisso.status,
        dataInicio: compromisso.dataInicio,
        dataFim: compromisso.dataFim,
        _id: compromisso._id
    }
    this.compromissosApi.apiCompromissosByCompromissoIdPut(compromisso._id, model)
              .subscribe(
                    async (data) => {
                        let updateItem = this.compromissos.find(x =>x._id == data._id);
                        let index = this.compromissos.indexOf(updateItem);
                        this.compromissos[index] = data;
                        this.cpFormGroup.reset();
                        this.notificationService.notify(`Você adicionou o Compromisso ${compromisso.titulo}`)
                  },
                  (err)=> {
                    this.notificationService.notify(`Ocorreu um erro ao tentar realizar a operação ${err.status}`);
              }
            );
  }
  Salvar(compromisso)
  {
    this.compromissosApi.apiCompromissosPost(compromisso)
      .subscribe(async (data) =>
            {
              this.compromissos.push(data)
              this.cpFormGroup.reset();
             this.notificationService.notify(`Você adicionou o Compromisso ${compromisso.titulo}`)
           },
          (err) => {
            this.notificationService.notify(`Ocorreu um erro ao tentar realizar a operação ${err.status}`);
          }
    );
  }
}
