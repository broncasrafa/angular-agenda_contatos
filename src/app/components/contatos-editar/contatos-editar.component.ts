import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContatosService } from '../../services/contatos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contato } from '../../models/contato';


@Component({
  moduleId: module.id,
  selector: 'app-contatos-editar',
  templateUrl: './contatos-editar.component.html',
  styleUrls: ['./contatos-editar.component.css']
})
export class ContatosEditarComponent implements OnInit {

  contato: Contato;

  meses: Array<Object>;
  dias: Array<Object>;
  selectedMesValue: string;
  selectedDiaValue: number;

  constructor(private contatosService: ContatosService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute) {


                this.meses = [
                  { mes: 'Jan', descricao: 'Janeiro' },
                  { mes: 'Fev', descricao: 'Fevereiro' },
                  { mes: 'Mar', descricao: 'Março' },
                  { mes: 'Abr', descricao: 'Abril' },
                  { mes: 'Mai', descricao: 'Maio' },
                  { mes: 'Jun', descricao: 'Junho' },
                  { mes: 'Jul', descricao: 'Julho' },
                  { mes: 'Ago', descricao: 'Agosto' },
                  { mes: 'Set', descricao: 'Setembro' },
                  { mes: 'Out', descricao: 'Outubro' },
                  { mes: 'Nov', descricao: 'Novembro' },
                  { mes: 'Dez', descricao: 'Dezembro' }
              ];
              this.selectedMesValue = null;

              this.dias = new Array<Object>();
              for (let i = 1; i < 32; i++) {
                  this.dias.push({ dia: i});
              }
              this.selectedDiaValue = null;
  }

  ngOnInit() {
    this.contato = new Contato();

    const id = this.route.snapshot.params['id'];

    this.contatosService.getContato(id)
                        .subscribe(contato => {

                          if (contato.aniversario) {
                            const split = contato.aniversario.split('-');
                            this.selectedDiaValue = parseInt(split[0]);
                            this.selectedMesValue = split[1];
                          }

                          this.contato = contato;
                        });
  }

  voltarPagina() {
    this.router.navigate([ 'contatos' ]);
  }

}
