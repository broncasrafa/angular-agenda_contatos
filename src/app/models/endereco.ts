export class Endereco {
  logradouro: String;
  numero: String;
  complemento: String;
  bairro: String;
  cidade: String;
  estado: String;
  cep: String;

  constructor(logradouro, numero, complemento, bairro, cidade, estado, cep) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
  }
}
