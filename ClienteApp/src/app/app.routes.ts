import {Routes} from '@angular/router'
import {NotFoundComponent} from './not-found/not-found.component'

export const ROUTES: Routes = [
  {path: '',  loadChildren: './compromissos/compromissos.module#CompromissosModule'},
  {path: 'compromissos', loadChildren: './compromissos/compromissos.module#CompromissosModule'},
  {path: '**', component: NotFoundComponent}
]
