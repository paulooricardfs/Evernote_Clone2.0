const db = require('./db')
const Nota = db.sequelize.define(
	'notas',
	{
		categoria_id: {
			type: db.Sequelize.INTEGER
		},
		título: {
			type: db.Sequelize.TEXT
		},
		corpo: {
			type: db.Sequelize.TEXT
		}
	},
	{
		underscored: true
	}
);

//Nota.sync({force: true})

module.exports = Nota