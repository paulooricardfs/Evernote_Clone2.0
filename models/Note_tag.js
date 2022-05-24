const db = require('./db')
const Note_tag = db.sequelize.define(
	'note_tag',
	{
		notas_id: {
			type: db.Sequelize.INTEGER
		},
		tag_id: {
			type: db.Sequelize.INTEGER
		}
	},
	{
		underscored: true
	}
);

//Note_tag.sync({force: true})

module.exports = Note_tag