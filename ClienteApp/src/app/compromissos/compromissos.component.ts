import { Component, OnInit,TemplateRef  } from '@angular/core';

import { CompromissosModel } from './compromissos.model'
import { FormGroup, FormControl } from '@angular/forms';

import { CompromissosService } from './compromissos.service'
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions} from '@angular/http'

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {NotificationService} from '../shared/messages/notification.service'

import {MEAT_API} from '../app.api'
@Component({
  selector: 'app-compromissos',
  templateUrl: './compromissos.component.html',
  styleUrls: ['./compromissos.component.css']
})
export class CompromissosComponent implements OnInit {
  modalRef: BsModalRef;

  compromissos: CompromissosModel[]

  tituloApp: string

  cpFormGroup: FormGroup;
  itensAgenda: Observable<CompromissosModel>

  Url:string
  confirmation: boolean
  template: TemplateRef<any>

  item: CompromissosModel

  constructor(private compromissoService: CompromissosService, private notificationService: NotificationService,private modalService: BsModalService) 
  {     this.Url = `${MEAT_API}/api/compromissos`}

  ngOnInit() {
    this.cpFormGroup = new FormGroup({
      titulo: new FormControl(''),
      descricao: new FormControl(''),
      dataInicio: new FormControl(''),
      dataFim: new FormControl('')
    });

    this.tituloApp = 'Angenda de Compromissos'
    this.compromissoService.getAll()
                          .subscribe(compromissos =>
                                  {
                                    this.compromissos = compromissos
                                  })

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  Editar(item)
  {}
  Excluir(item,template: TemplateRef<any>)
  {
    this.openModal(template)
    this.item = item
    this.template = template
  }
  confirmExcluir()
  {
    this.compromissoService.items = this.compromissos
    this.compromissoService
                            .RemoverCompromissoDelete(this.item)
                            .subscribe(
                                  (data) => {
                                    this.compromissos.find(x=> x._id != this.item._id)
                                  },
                                  (err)=> {           
                                    this.notificationService.notify(`Ocorreu um erro ao tentar realizar a operação ${err.status}`);
                                  },
                                  () => {
                                      this.notificationService.notify(`Você removeu o Compromisso ${this.item.titulo}`)
                                  })
    this.closeModal()
  }
  decline()
  {
    this.confirmation = false
  }
  closeModal()
  {    
    this.modalRef.hide();
    this.modalRef = null;
  }

  onSubmit(compromisso)
  { 
    this.compromissoService.items = this.compromissos
    this.compromissoService.CriarNovoCompromissoPost(compromisso)
     .subscribe(
           async (data) => {
            console.log(data)
            this.notificationService.notify(`Você adicionou o Compromisso ${compromisso.titulo}`)
            
          },
          (err)=> {           
            this.notificationService.notify(`Ocorreu um erro ao tentar realizar a operação ${err.status}`);
          });
  }
}
