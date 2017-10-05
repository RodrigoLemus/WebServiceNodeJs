var database = require("../config/database.config");
var Empresa = {};

Empresa.select = function(callback) {
  if(database) {
		database.query('SELECT * FROM Empresa', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Empresa.insert = function(data, callback) {
  if(database) {
    database.query('CALL INSERTAR_EMPRESA(?,?,?,?,?)',
    [data.nombreEmpresa, data.fechaFundacion, data.descripcionEmpresa, data.idCategoria, data.idUsuario], function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"insertId":resultado.insertId});
      }
    });
  }
}

Empresa.update = function(data, callback){
	if(database) {
		database.query('CALL UPDATE_EMPRESA(?,?,?,?,?,?)',
		[data.nombreEmpresa, data.fechaFundacion, data.descripcionEmpresa, data.idCategoria, data.idUsuario, data.idEmpresa],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

Empresa.delete = function(idEmpresa, callback) {
	if(database) {
		database.query('CALL DELETE_EMPRESA(?)', idEmpresa,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Empresa;
