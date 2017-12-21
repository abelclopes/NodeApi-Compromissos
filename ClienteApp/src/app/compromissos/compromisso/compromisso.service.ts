import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import {CompromissosModel} from '../compromissos.model'
import {CompromissosService} from '../compromissos.service'

import {MEAT_API} from '../../app.api'

@Injectable()
export class CompromissoService {

  constructor(private compromissoService: CompromissosService, private http: Http){}

  compromissoItems(): CompromissosModel[]{
    return this.compromissoService.items
  }

  remove(item: CompromissosModel){
    this.compromissoService.removeCompromisso(item)
  }

  createCompromisso(compromisso: CompromissosModel): Observable<string> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`${MEAT_API}/compromisso`,
                          JSON.stringify(compromisso),
                          new RequestOptions({headers: headers}))
                    .map(response=> response.json())
                    .map(compromisso => compromisso.id)
  }

}
