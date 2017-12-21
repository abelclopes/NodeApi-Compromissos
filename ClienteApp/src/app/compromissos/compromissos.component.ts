import { Component, OnInit } from '@angular/core';

import { CompromissosModel } from './compromissos.model'


@Component({
  selector: 'app-compromissos',
  templateUrl: './compromissos.component.html',
  styleUrls: ['./compromissos.component.css']
})
export class CompromissosComponent implements OnInit {

  compormissos: CompromissosModel[]
  

  constructor() { }

  ngOnInit() {
    this.compormissos  = [
      {id: "1", titulo: "Reuniao daly", descricao:"Reuniao agile todos os dias", dia: "12/01/2017", hora: "12:50" },
      {id: "2", titulo: "Reuniao agenda", descricao:"Reuniao agile todos os dias", dia: "12/01/2017", hora: "12:50" },
      {id: "3", titulo: "Reuniao cafe", descricao:"Reuniao agile todos os dias", dia: "12/01/2017", hora: "12:50" },
      {id: "4", titulo: "Reuniao tarde", descricao:"Reuniao agile todos os dias", dia: "12/01/2017", hora: "12:50" }
    ]
  }

}
