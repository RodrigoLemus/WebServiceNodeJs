var database = require("../config/database.config");
var Admin = {};

Admin.select = function(callback) {
  if(database) {
		database.query('SELECT * FROM Admin', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Admin.insert = function(data, callback) {
  if(database) {
    database.query('CALL INSERTAR_ADMIN(?,?)',
    [data.nombreAdmin, data.idUsuario], function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"insertId":resultado.insertId});
      }
    });
  }
}

Admin.update = function(data, callback){
	if(database) {
		database.query('CALL UPDATE_ADMIN(?,?,?)',
		[data.nombreAdmin, data.idUsuario, data.idAdmin],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

Admin.delete = function(idAdmin, callback) {
	if(database) {
		database.query('CALL DELETE_ADMIN(?)', idAdmin,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Admin;
