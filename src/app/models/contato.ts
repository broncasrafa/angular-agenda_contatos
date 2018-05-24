import { Endereco } from './endereco';
import { Perfil } from './perfil';
import { Email } from './email';
import { Telefone } from './telefone';

export class Contato {
  nome: String;
  sobrenome: String;
  empresa: String;
  aniversario: String;
  imagem: { url: String, public_id: String };
  enderecos: Array<Endereco>;
  perfis: Array<Perfil>;
  emails: Array<Email>;
  num_telefones: Array<Telefone>;

  constructor() {
    this.enderecos = new Array<Endereco>();
    this.perfis = new Array<Perfil>();
    this.emails = new Array<Email>();
    this.num_telefones = new Array<Telefone>();
  }
}
