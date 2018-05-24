var router = require('express').Router();
var Contato = require('../models/Contato');

/* Multer Middleware */
var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '_' + file.originalname)
  }
});
var imageFilter = function (req, file, callback) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter });
// -----------------------------------------------------------------------------------------

/* Cloudinary */
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'image-repositories',
  api_key: '175659634982695',
  api_secret: 'MFoUznu6kjFjm3D8x8Bhq9fgFcA',
  upload_preset: 'uwy9afxw'
});
// -----------------------------------------------------------------------------------------


router.get('/', function(req, res, next) {
  res.json({ message: 'Seja bem-vindo a API Agenda de Contatos Angular 2/4/5' })
});

/* Get all contatos (acessar em: http://localhost:3000/api/contatos) */
router.get('/contatos', function(req, res, next) {
  Contato.find()
          .select({ __v: 0})
          .exec(function(err, contatos) {
              if(err) {
              res.status(400).json({ message: `Não foi possível listar os contatos: ${ err }` })
              }
              res.status(200).json(contatos);
          });
});

/* Get contato by id (acessar em: http://localhost:3000/api/contatos/id) */
router.get('/contatos/:id', function(req, res, next) {
  var id = req.params.id;

  Contato.findById(id)
         .select({ __v:0})
         .exec(function(err, contato) {
            if(err) {
                res.status(400).json({ message: `Não foi possível encontrar o contato: ${ err }` })
            }
            res.status(200).json(contato);
        });
});

/* Delete contato (acessar em: http://localhost:3000/api/contatos/id) */
router.delete('/contatos/:id', function(req, res, next) {
  var id = req.params.id;

  Contato.findOneAndRemove({ _id: id }, function(err, contato) {
      if(err) {
          res.status(400).json({ message: `Não foi possível remover o contato: ${ err }` })
      }

      if(contato.imagem) {
        cloudinary.uploader.destroy(contato.imagem.public_id);
      }

      res.status(200).json({ message: 'Contato removido com sucesso' });
  })
});

/* Save contato (acessar em: http://localhost:3000/api/contatos) */
router.post('/contatos', function(req, res, next) {
  var contato = new Contato();
  contato.nome = req.body.nome;
  contato.sobrenome = req.body.sobrenome;
  contato.empresa = req.body.empresa;
  contato.aniversario = req.body.aniversario;
  contato.imagem = req.body.imagem;
  contato.perfis = req.body.perfis;
  contato.num_telefones = req.body.num_telefones;
  contato.emails = req.body.emails;
  contato.enderecos = req.body.enderecos;

  contato.save(function(err, doc) {
      if(err) {
        console.log(err);
          res.status(400).json({ message: `Erro ao cadastrar contato: ${ err }` })
      }
      console.log(doc);
      res.status(201).json({ message: 'Contato cadastrado com sucesso', data: doc._id });
  });
});

/* Update contato (acessar em: http://localhost:3000/api/contatos/id) */
router.put('/contatos/:id', function(req, res, next) {

  // preenchendo um objeto com os dados do request
  var contato = {};
  contato.nome = req.body.nome;
  contato.sobrenome = req.body.sobrenome;
  contato.empresa = req.body.empresa;
  contato.imagem = req.body.imagem;
  contato.aniversario = req.body.aniversario;
  contato.perfis = req.body.perfis;
  contato.num_telefones = req.body.num_telefones;
  contato.emails = req.body.emails;
  contato.enderecos = req.body.enderecos;

  var id = req.params.id;

  Contato.findById(id).select({ __v:0}).exec(function(err, doc) {
      if(err) {
          res.status(400).json({ message: `Não foi possível alterar os dados do contato: ${ err }` });
      }

      // se achou trata e atualiza
      var contatoAtual = doc;

      if (!contato.nome == undefined) {
          contatoAtual.nome = contato.nome;
      }
      if (!contato.sobrenome == undefined) {
          contatoAtual.sobrenome = contato.sobrenome;
      }
      if (!contato.empresa == undefined) {
          contatoAtual.empresa = contato.empresa;
      }
      if (!contato.imagem == undefined) {
          //contatoAtual.imagem = contato.imagem;
      }
      if (!contato.aniversario == undefined) {
          contatoAtual.aniversario = contato.aniversario;
      }
      if (contato.perfis != undefined) {
          contato.perfis.forEach(function(valorReq, i) {
              contatoAtual.perfis.push(valorReq);
          });
      }
      if (contato.num_telefones != undefined) {
          contato.num_telefones.forEach(function(valorReq, i) {
              contatoAtual.num_telefones.push(valorReq);
          });
          // let uniques = [...new Set(listaAux.map(item => item))];
      }
      if (contato.emails != undefined) {
          contato.emails.forEach(function(valorReq, i) {
              contatoAtual.emails.push(valorReq);
          });

          let distinct = [...new Set(contatoAtual.emails.map(item => item))];
          contatoAtual.emails = [];
          distinct.forEach(function(value, i) {
              contatoAtual.emails.push(value);
          });
      }
      if (contato.enderecos != undefined) {
          contato.enderecos.forEach(function(valorReq, i) {
              contatoAtual.enderecos.push(valorReq);
          });
      }

      Contato.findOneAndUpdate({ _id: id}, contatoAtual, {}, function(err, contato) {
          if(err) {
              res.status(400).json({ message: `Não foi possível alterar os dados do contato: ${ err }` });
          }

          res.status(200).json({ message: "Contato alterado com sucesso" });
      });
  });
});

/* Salva a imagem localmente e sobe a imagem para a nuvem no cloudinary e retona a url */
router.post('/contatos/avatar/upload', upload.single('imagem'), function(req, res, next) {

    if(req.file) {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      cloudinary.uploader.upload(req.file.path, function(err, result) {
        if(err) {
          res.status(400).json({ message: "Erro ao salvar a imagem, portanto o contato não foi salvo", result: false })
        }

        res.status(200).json({ message: "Imagem uploaded com sucesso", result: result });
      });
    } else {
      res.status(400).json({ message: "Erro ao salvar a imagem, portanto o contato não foi salvo", result: false })
    }
});

module.exports = router;
