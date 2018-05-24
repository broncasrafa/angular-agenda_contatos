
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule } from 'ngx-accordion';

import { routing, appRoutingProviders } from './app.routing';

import { ContatosService } from './services/contatos.service';

import { AppComponent } from './app.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { ContatosEditarComponent } from './components/contatos-editar/contatos-editar.component';
import { ContatosNovoComponent } from './components/contatos-novo/contatos-novo.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AccordionModule
  ],
  declarations: [
    AppComponent,
    ContatosComponent,
    ContatosEditarComponent,
    ContatosNovoComponent
  ],
  providers: [
    appRoutingProviders,
    ContatosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
