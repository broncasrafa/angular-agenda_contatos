var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var enderecoSchema = new Schema({
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
});

var perfilSchema = new Schema({
    perfil: String
});

var telefoneSchema = new Schema({
    numero: String
});

var emailSchema = new Schema({
    email: String
});

var imagemSchema = new Schema({
  url: String,
  public_id: String
});

var contatoSchema = new Schema({
    data_cadastro: { type: Date, default: Date.now },
    nome: { type: String, require: true },
    sobrenome: String,
    empresa: String,
    //imagem: { data: Buffer, contentType: String },
    imagem: imagemSchema,
    aniversario: String,
    perfis: [perfilSchema],
    num_telefones: [telefoneSchema],
    emails: [emailSchema],
    enderecos: [enderecoSchema]
});

contatoSchema.plugin(mongoosePaginate);

var Contato = mongoose.model('Contato', contatoSchema);
module.exports = Contato;
