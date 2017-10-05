var database = require("../config/database.config");
var Rol = {};

Rol.select = function(callback) {
  if(database) {
		database.query('SELECT * FROM Rol', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Rol.insert = function(data, callback) {
  if(database) {
    database.query('CALL INSERTAR_ROL(?)',
    [data.nombreRol], function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"insertId":resultado.insertId});
      }
    });
  }
}

Rol.update = function(data, callback){
	if(database) {
		database.query('CALL UPDATE_ROL(?,?)',
		[data.nombreRol, data.idRol],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

Rol.delete = function(idRol, callback) {
	if(database) {
		database.query('CALL DELETE_ROL(?)', idRol,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Rol;