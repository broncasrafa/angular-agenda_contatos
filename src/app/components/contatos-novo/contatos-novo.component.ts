import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContatosService } from '../../services/contatos.service';
import { Contato } from '../../models/contato';
import { Telefone } from '../../models/telefone';
import { Email } from '../../models/email';
import { Perfil } from '../../models/perfil';
import { Endereco } from '../../models/endereco';

@Component({
  moduleId: module.id,
  selector: 'app-contatos-novo',
  templateUrl: './contatos-novo.component.html',
  styleUrls: ['./contatos-novo.component.css']
})
export class ContatosNovoComponent implements OnInit {

  contato: Contato;

  meses: Array<Object>;
  dias: Array<Object>;
  selectedMesValue: string;
  selectedDiaValue: number;

  files = new Array<File>();
  telefones: Array<Telefone>;
  perfis: Array<Perfil>;
  emails: Array<Email>;
  enderecos: Array<Endereco>;

  fieldTelefone: string;
  fieldPerfil: string;
  fieldEmail: string;
  fieldLogradouro: string;
  fieldNumero: string;
  fieldComplemento: string;
  fieldBairro: string;
  fieldCidade: string;
  fieldEstado: string;
  fieldCep: string;

  constructor(private contatosService: ContatosService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute) {

                this.contato = new Contato();
                this.telefones = [];
                this.perfis = [];
                this.emails = [];
                this.enderecos = [];

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
                  this.dias.push({ dia: i });
                }
                this.selectedDiaValue = null;
  }

  ngOnInit() {

  }

  onChange(event) {
    this.files = event.target.files;

    if (this.files.length > 0) {
      this.contatosService.createAvatar(this.files).subscribe(resp => {
        console.log(resp);
        if(resp.result) {
          this.contato.imagem = resp.result.url;
        }
      });
    }
  }

  salvar(contato) {

    if (this.files.length > 0) {
      // this.contato.imagem = this.objImg;
    }

    if (this.selectedDiaValue && this.selectedMesValue) {
      this.contato.aniversario = `${this.selectedDiaValue}-${this.selectedMesValue}`;
    }

    if (this.telefones.length > 0) {
      for (let i = 0; i < this.telefones.length; i++) {
        const telefone = new Telefone(this.telefones[i].numero);
        this.contato.num_telefones.push(telefone);
      }
    }

    if (this.perfis.length > 0) {
      for (let i = 0; i < this.perfis.length; i++) {
        const perfil = new Perfil(this.perfis[i].perfil);
        this.contato.perfis.push(perfil);
      }
    }

    if (this.emails.length > 0) {
      for (let i = 0; i < this.emails.length; i++) {
        const email = new Email(this.emails[i].email);
        this.contato.emails.push(email);
      }
    }

    if (this.enderecos.length > 0) {
      for (let i = 0; i < this.enderecos.length; i++) {
        const endereco = new Endereco(this.enderecos[i].logradouro,
                                      this.enderecos[i].numero,
                                      this.enderecos[i].complemento,
                                      this.enderecos[i].bairro,
                                      this.enderecos[i].cidade,
                                      this.enderecos[i].estado,
                                      this.enderecos[i].cep);
        this.contato.enderecos.push(endereco);
      }
    }

    this.contatosService.createContato(this.contato).subscribe(resp => {
      alert('Contato criado com sucesso');
      this.router.navigate([ 'contatos' ]);
    });

    // this.contatosService.testePost(this.contato, this.files).subscribe(resp => {
    //   alert('Contato criado com sucesso');
    //   this.router.navigate([ 'contatos' ]);
    // })
  }

  adicionarTelefone(telefone) {
    const fone = new Telefone(telefone);
    this.telefones.push(fone);
    this.fieldTelefone = null;
  }

  removerTelefone(telefone) {
    const index = this.telefones.indexOf(telefone);
    this.telefones.splice(index, 1);
  }

  adicionarPerfil(perfil) {
    const perf = new Perfil(perfil);
    this.perfis.push(perf);
    this.fieldPerfil = null;
  }

  removerPerfil(perfil) {
    const index = this.perfis.indexOf(perfil);
    this.perfis.splice(index, 1);
  }

  adicionarEmail(email) {
    const mail = new Email(email);
    this.emails.push(mail);
    this.fieldEmail = null;
  }

  removerEmail(email) {
    const index = this.perfis.indexOf(email);
    this.emails.splice(index, 1);
  }

  adicionarEndereco(logradouro, numero, complemento, bairro, cidade, estado, cep) {
    const end = new Endereco(logradouro, numero, complemento, bairro, cidade, estado, cep);
    this.enderecos.push(end);

    this.fieldLogradouro = null;
    this.fieldNumero = null;
    this.fieldComplemento = null;
    this.fieldBairro = null;
    this.fieldCidade = null;
    this.fieldEstado = null;
    this.fieldCep = null;
  };

  removerEndereco(endereco) {
    const index = this.enderecos.indexOf(endereco);
    this.enderecos.splice(index, 1);
  };

  voltarPagina() {
    this.router.navigate([ 'contatos' ]);
  }
}
