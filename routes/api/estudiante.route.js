var express = require('express');
var router = express.Router();
var estudiante = require('../../model/estudiante.model');

router.get('/estudiante/', function(req, res, next) {
  estudiante.select(function(estudiantes) {
    if(typeof estudiantes !== 'undefined') {
      res.json(estudiantes);
    } else {
      res.json({"mensaje" : "No hay estudiantes"});
    }
  });
});

router.get('/estudiante/:idEstudiante', function(req, res, next) {
  var idEstudiante = req.params.idEstudiante;
  estudiante.find(idEstudiante, function(estudiantes) {
    if(typeof estudiantes !== 'undefined') {
      res.json(estudiantes);
    } else {
      res.json({"mensaje" : "No hay estudiantes"});
    }
  });
});

router.post('/estudiante', function(req, res, next) {
  var data = {
    idEstudiante : null,
    nombreEstudiante : req.body.nombreEstudiante,
    apellidoEstudiante : req.body.apellidoEstudiante,
    fechaNacimiento : req.body.fechaNacimiento,
    idUsuario : req.body.idUsuario
  }

  estudiante.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.json({"mensaje":"Se ingreso el estudiante"});
    } else {
      res.json({"mensaje":"No se ingreso el estudiante"});
    }
  });
});


router.put('/estudiante/:idEstudiante', function(req, res, next){

  var data = {
    idEstudiante : req.params.idEstudiante,
    nombreEstudiante : req.body.nombreEstudiante,
    apellidoEstudiante : req.body.apellidoEstudiante,
    fechaNacimiento : req.body.fechaNacimiento,
    idUsuario : req.body.idUsuario
  }

  estudiante.update(data, function(resultado){

    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }

  });
});

router.delete('/estudiante/:idEstudiante', function(req, res, next){
  var idEstudiante = req.params.idEstudiante;

  estudiante.delete(idEstudiante, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino el estudiante correctamente"});
    } else {
      res.json({"mensaje":"Se elimino el estudiante"});
    }
  });
});

module.exports = router;
