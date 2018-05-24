var mongoose = require('mongoose');
var settings = require('./settings');

mongoose.Promise = global.Promise;

mongoose.connect(settings.mongoUrl, (err) => {
  if(err) {
    console.log('Erro na conexão com o banco de dados', err.message);
  } else {
    console.log('Conectado a base de dados...')
  }
});
