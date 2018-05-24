import { Routes, RouterModule } from '@angular/router';

import { ContatosComponent } from './components/contatos/contatos.component';
import { ContatosEditarComponent } from './components/contatos-editar/contatos-editar.component';
import { ContatosNovoComponent } from './components/contatos-novo/contatos-novo.component';


const appRoutes: Routes = [
  { path: '', component: ContatosComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'contatos/:id', component: ContatosEditarComponent },
  { path: 'contato/novo', component: ContatosNovoComponent }
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
