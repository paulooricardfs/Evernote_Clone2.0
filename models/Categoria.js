const db = require('./db')
const Categoria = db.sequelize.define(
	'categorias', 
	{
		nome: {
			type: db.Sequelize.TEXT
		}
	}, 
	{
		underscored: true
	});

//Categoria.sync({force: true})

module.exports = Categoria