var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    appSettings = require('./config/settings');

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'src').replace('\\backend', '')));
//console.log(path.join(__dirname, 'src').replace('\\backend', ''))

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (!isProduction) {
  app.use(errorhandler());
}

// configurando o banco mongodb
require('./config/database');

// rotas
var index = require('./routes/index');
var api = require('./routes/contatos');
//app.use('/', index);
app.use('/api', api);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// [error handler]
// development error handler will print stacktrace
if(!isProduction) {
  app.use(function(req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({ 'errors': {
      message: err.message,
      error: err
    }});
  });
} else {
  // production error handler no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
}

// finally, let's start our server...
var server = app.listen(appSettings.porta, () => {
  console.log('Servidor online .... porta: ' + server.address().port);
});
