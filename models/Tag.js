const db = require('./db')
const Tag = db.sequelize.define(
	'tags',
	{
		
	},
	{
		underscored: true
	}
)

//Tag.sync({force: true})

module.exports = Tag