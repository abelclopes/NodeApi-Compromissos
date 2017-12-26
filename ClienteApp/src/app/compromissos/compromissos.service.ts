import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {CompromissosModel} from './compromissos.model'

  import {NotificationService} from '../shared/messages/notification.service'

import {MEAT_API} from '../app.api'

@Injectable()
export class CompromissosService 
{
  items: Array<CompromissosModel>
  Url:string
  constructor(private notificationService: NotificationService, private http: Http){
    this.Url = `${MEAT_API}/api/compromissos/`
  }

  // metodos http 

  getAll(): Observable<CompromissosModel[]>
  {
      return this.http.get(this.Url)
                          .map(response=> response.json())                    
  }

  CriarNovoCompromissoPost(compromisso) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(compromisso);
  console.log(body);
  
    return this.http.post(this.Url, body, options)
                    .map((res) => res.json())
                    .map(compromisso => compromisso._id)
  }
  
  AlteraCompromissoPut(compromisso) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(compromisso);
  
    return this.http.put(this.Url+compromisso._id, body, options)
                    .map((res) => res.json())
                    .map(compromisso => compromisso._id)
  }
  
  RemoverCompromissoDelete(compromisso) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(compromisso._id);
  
    return this.http.delete(this.Url+compromisso._id, options)
                    .map((res) => res.json())
                    .map(compromisso => compromisso._id)
  }
}
