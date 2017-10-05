var express = require('express');
var router = express.Router();
var empresa = require('../../model/empresa.model');

router.get('/empresa/', function(req, res, next) {
  empresa.select(function(empresas) {
    if(typeof empresas !== 'undefined') {
      res.json(empresas);
    } else {
      res.json({"mensaje" : "No hay empresas"});
    }
  });
});

router.get('/empresa/:idEmpresa', function(req, res, next) {
  var idEmpresa = req.params.idEmpresa;
  empresa.find(idEmpresa, function(empresas) {
    if(typeof empresas !== 'undefined') {
      res.json(empresas);
    } else {
      res.json({"mensaje" : "No hay empresas"});
    }
  });
});

router.post('/empresa', function(req, res, next) {
  var data = {
    idEmpresa : null,
    nombreEmpresa : req.body.nombreEmpresa,
    fechaFundacion : req.body.fechaFundacion,
    descripcionEmpresa : req.body.descripcionEmpresa,
    idCategoria : req.body.idCategoria,
    idUsuario : req.body.idUsuario
  }

  empresa.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({"mensaje":"Se ingreso la empresa"});
    } else {
      res.json({"mensaje":"No se ingreso la empresa"});
    }
  });
});


router.put('/empresa/:idEmpresa', function(req, res, next){

  var data = {
    idEmpresa : req.params.idEmpresa,
    nombreEmpresa : req.body.nombreEmpresa,
    fechaFundacion : req.body.fechaFundacion,
    descripcionEmpresa : req.body.descripcionEmpresa,
    idCategoria : req.body.idCategoria,
    idUsuario : req.body.idUsuario
  }

  empresa.update(data, function(resultado){

    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
});

router.delete('/empresa/:idEmpresa', function(req, res, next){
  var idEmpresa = req.params.idEmpresa;

  empresa.delete(idEmpresa, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino la empresa correctamente"});
    } else {
      res.json({"mensaje":"Se elimino la empresa"});
    }
  });
});

module.exports = router;
