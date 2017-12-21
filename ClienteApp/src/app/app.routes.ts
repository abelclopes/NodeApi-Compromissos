import {Routes} from '@angular/router'

import {CompromissosComponent} from './compromissos/compromissos.component'
import {CompromissoComponent} from './compromissos/compromisso/compromisso.component'
import {NotFoundComponent} from './not-found/not-found.component'

export const ROUTES: Routes = [
  {path: '', component: CompromissosComponent},
  {path: 'compromissos', component: CompromissosComponent},
  {path: 'compromissos/:id', component: CompromissoComponent},
  {path: '**', component: NotFoundComponent}
]
