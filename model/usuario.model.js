var database = require("../config/database.config");
var Usuario = {};

Usuario.login = function(data, callback) {
  if(database) {
    var consulta = 'CALL AUTENTICAR_USUARIO(?,?);';
		database.query(consulta, [data.nick, data.contrasena], function(error, resultado){
			if(error) {
				throw error;
			} else {
				if(resultado[0].length > 0) {
					callback(resultado[0]);	
				} else {
					callback(0);
				}

				
			}
		});
	}
}

Usuario.selectAll = function(callback) {
	if(database) {
		var consulta = 'SELECT * FROM Usuario';
		database.query(consulta, function(error, resultado){
			if(error) throw error;
			callback(resultado);
		});
	}
}

Usuario.selectUsuario = function(idUsuario, callback) {
  if(database) {
    var consulta = 'SELECT * FROM Usuario WHERE idUsuario = ?';
		database.query(consulta, idUsuario, function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
	}
}

/*Usuario.selectHistorial = function(idUsuario, callback) {
  if(database) {
    var consulta = 'CALL sp_selectHistorial(?);';
		database.query(consulta, idUsuario, function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
  }
}*/

Usuario.insert = function(data, callback) {
  if(database) {
    database.query('CALL INGRESAR_USUARIO(?,?,?,?,?,?,?)',
    [data.nick, data.contrasena, data.correo, data.telefono, data.direccion, data.pais, data.idRol],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

Usuario.update = function(data, callback){
	if(database) {
		database.query('CALL UPDATE_USUARIO(?,?,?,?,?,?,?,?)',
		[data.idUsuario, data.nick, data.contrasena, data.correo, data.telefono, data.direccion, data.pais, data.idRol],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

Usuario.delete = function(idUsuario, callback) {
	if(database) {
		database.query('CALL DELETE_USUARIO(?)', idUsuario,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Usuario;
