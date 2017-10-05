var express = require('express');
var router = express.Router();
var rol = require('../../model/rol.model');

router.get('/rol/', function(req, res, next) {
  rol.select(function(rols) {
    if(typeof rols !== 'undefined') {
      res.json(rols);
    } else {
      res.json({"mensaje" : "No hay roles"});
    }
  });
});

router.get('/rol/:idRol', function(req, res, next) {
  var idRol = req.params.idRol;
  rol.find(idRol, function(rols) {
    if(typeof rols !== 'undefined') {
      res.json(rols);
    } else {
      res.json({"mensaje" : "No hay roles"});
    }
  });
});

router.post('/rol', function(req, res, next) {
  var data = {
    idRol : null,
    nombreRol : req.body.nombreRol
  }

  rol.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({"mensaje":"Se ingreso el rol"});
    } else {
      res.json({"mensaje":"No se ingreso el rol"});
    }
  });
});


router.put('/rol/:idRol', function(req, res, next){

  var data = {
    idRol : req.params.idRol,
    nombreRol : req.body.nombreRol
  }

  rol.update(data, function(resultado){

    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
});

router.delete('/rol/:idRol', function(req, res, next){
  var idRol = req.params.idRol;

  rol.delete(idRol, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino el rol correctamente"});
    } else {
      res.json({"mensaje":"Se elimino el rol"});
    }
  });
});

module.exports = router;
