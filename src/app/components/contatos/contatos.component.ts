import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContatosService } from '../../services/contatos.service';
import { Contato } from '../../models/contato';



@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  contatos: Array<Contato>;
  contato: Contato;

  isLoadPage = true;

  constructor(private _contatosService: ContatosService,
              private router: Router) { }

  ngOnInit() {

    this.contatos = new Array<Contato>();

    this._contatosService.getTodosContatos()
                         .subscribe(contatos => {
                            this.contatos = contatos;
                          });
  }

  dadosContato(id: string) {
    this.contato = new Contato();
    return this._contatosService.getContato(id)
                                .subscribe(contato => {
                                  this.contato = contato;
                                  this.isLoadPage = false;
                                });
  }

  editarContato(id: string) {
    this.router.navigate([ 'contatos', id ]);
  }

  criarNovoContato() {
    const link = ['contato/novo'];
    this.router.navigate(link);
  }
}
