// TODO: implementar seguindo o tutorial < https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example >

const Note_tag = require('../models').Note_tag;
const Tag = require('../models').Tag;
const Note = require('../models').Note;

module.exports = {
	async list(req, res, next) {
	  const notes = await Note.findAll({
	    order: [
	        ['updated_at', 'DESC']
	    ],
	    include: [
	        {
	            model: Category,
	            as: 'category',
	        }
	    ]
	  });
	  
	  res.status(200).json(notes);
	  /*
	  .then((categories) => res.status(200).send(categories))
      .catch((error) => { res.status(400).send(error); });
      */
	}
};