var database = require("../config/database.config");
var Estudiante = {};

Estudiante.select = function(callback) {
  if(database) {
		database.query('SELECT * FROM Estudiante', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Estudiante.insert = function(data, callback) {
  if(database) {
    database.query('CALL INSERTAR_ESTUDIANTE(?,?,?,?)',
    [data.nombreEstudiante, data.apellidoEstudiante, data.fechaNacimiento, data.idUsuario], function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"insertId":resultado.insertId});
      }
    });
  }
}

Estudiante.update = function(data, callback){
	if(database) {
		database.query('CALL UPDATE_ESTUDIANTE(?,?,?,?,?)',
		[data.nombreEstudiante, , data.apellidoEstudiante, data.fechaNacimiento, data.idUsuario, data.idEstudiante],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

Estudiante.delete = function(idEstudiante, callback) {
	if(database) {
		database.query('CALL DELETE_ESTUDIANTE(?)', idEstudiante,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Estudiante;
