var express = require('express');
var router = express.Router();
var post = require('../../model/post.model');

router.get('/post/', function(req, res, next) {
  post.select(function(posts) {
    if(typeof posts !== 'undefined') {
      res.json(posts);
    } else {
      res.json({"mensaje" : "No hay posts"});
    }
  });
});

router.get('/post/:idPost', function(req, res, next) {
  var idPost = req.params.idPost;
  post.find(idPost, function(posts) {
    if(typeof posts !== 'undefined') {
      res.json(posts);
    } else {
      res.json({"mensaje" : "No hay posts"});
    }
  });
});

router.post('/post', function(req, res, next) {
  var data = {
    idPost : null,
    descipcionPost : req.body.descipcionPost,
    idEmpresa : req.body.idEmpresa
  }

  post.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({"mensaje":"Se ingreso el post"});
    } else {
      res.json({"mensaje":"No se ingreso el post"});
    }
  });
});


router.put('/post/:idPost', function(req, res, next){

  var data = {
    idPost : req.params.idPost,
    descipcionPost : req.body.descipcionPost,
    idEmpresa : req.body.idEmpresa
  }

  post.update(data, function(resultado){

    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
});

router.delete('/post/:idPost', function(req, res, next){
  var idPost = req.params.idPost;

  post.delete(idPost, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino el post correctamente"});
    } else {
      res.json({"mensaje":"Se elimino el post"});
    }
  });
});

module.exports = router;
