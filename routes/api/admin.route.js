var express = require('express');
var router = express.Router();
var admin = require('../../model/admin.model');

router.get('/admin/', function(req, res, next) {
  admin.select(function(admins) {
    if(typeof admins !== 'undefined') {
      res.json(admins);
    } else {
      res.json({"mensaje" : "No hay admins"});
    }
  });
});

router.get('/admin/:idAdmin', function(req, res, next) {
  var idAdmin = req.params.idAdmin;
  admin.find(idAdmin, function(admins) {
    if(typeof admins !== 'undefined') {
      res.json(admins);
    } else {
      res.json({"mensaje" : "No hay admins"});
    }
  });
});

router.post('/admin', function(req, res, next) {
  var data = {
    idAdmin : null,
    nombreAdmin : req.body.nombreAdmin,
    idUsuario : req.body.idUsuario
  }

  admin.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({"mensaje":"Se ingreso el admin"});
    } else {
      res.json({"mensaje":"No se ingreso el admin"});
    }
  });
});


router.put('/admin/:idAdmin', function(req, res, next){

  var data = {
    idAdmin : req.params.idAdmin,
    nombreAdmin : req.body.nombreAdmin,
    idUsuario : req.body.idUsuario
  }

  admin.update(data, function(resultado){

    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
});

router.delete('/admin/:idAdmin', function(req, res, next){
  var idAdmin = req.params.idAdmin;

  admin.delete(idAdmin, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino el admin correctamente"});
    } else {
      res.json({"mensaje":"Se elimino el admin"});
    }
  });
});

module.exports = router;
