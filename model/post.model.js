var database = require("../config/database.config");
var Post = {};

Post.select = function(callback) {
  if(database) {
		database.query('SELECT * FROM Post', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Post.insert = function(data, callback) {
  if(database) {
    database.query('CALL INSERTAR_POST(?,?)',
    [data.descripcionPost, data.idEmpresa], function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"insertId":resultado.insertId});
      }
    });
  }
}

Post.update = function(data, callback){
	if(database) {
		database.query('CALL UPDATE_POST(?,?,?)',
		[data.descripcionPost, data.idEmpresa, data.idPost],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

Post.delete = function(idPost, callback) {
	if(database) {
		database.query('CALL DELETE_POST(?)', idPost,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Post;
