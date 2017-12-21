import {Injectable} from '@angular/core'

import {CompromissosModel} from './compromissos.model'

import {NotificationService} from '../shared/messages/notification.service'

@Injectable()
export class CompromissosService {
  items: CompromissosModel[] = []

  constructor(private notificationService: NotificationService){}

  clear(){
    this.items = []
  }

  addItem(item:CompromissosModel){
    let foundItem = this.items.find((mItem)=> mItem.id === item.id)
    // if(foundItem){
    //   this.updateCompromisso(foundItem)
    // }else{
    //   this.items.push(new CompromissosModel(item))
    // }
    this.notificationService.notify(`Você adicionou o Compromisso ${item.titulo}`)
  }
  remover(item: CompromissosModel){    
    this.removeCompromisso(item)    
  }

  removeCompromisso(item:CompromissosModel){
    this.items.splice(this.items.indexOf(item), 1)
    this.notificationService.notify(`Você removeu o Compromisso ${item.titulo}`)
  }
}
