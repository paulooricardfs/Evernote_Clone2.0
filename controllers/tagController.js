// TODO: implementar seguindo o tutorial < https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example >

const Note = require('../models').Note;
const Tag = require('../models').Tag;
const Category = require('../models').Category;

module.exports = {
	async list(req, res) {
	  // res.status(200).send({rota: "categorias/json"});

	  const tags = await Tag.findAll({
	      order: [
	          ['id', 'ASC']
	      ],
	      include: [
	          {
	              model: Note,
	              as: 'notes',
	          }
	      ]

	  });

	  const notes = await Note.findAll({
        order: [
            ['id', 'ASC']
        ],
      });

	  res.status(200).json({tags});
	  /*
	  .then((tags) => res.status(200).send(tags))
      .catch((error) => { res.status(400).send(error); });
      */
	},

	async getById(req, res, next) {
       
      const tags = await Tag.findAll({
	     order: [
	         ['id', 'ASC']
	     ],
	     include: [
	         {
	             model: Note,
	             as: 'notes',
	         }
	     ]

	  });

	  const notes = await Note.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
	         {
	             model: Tag,
	             as: 'tags',
	         }
	     ]
      });

	  let newTag = null;
	  const id = req.params.id;

	  for(let i=0; i<tags.length; i++) {
	    if (tags[i].id == id) {
	      newTag = {...tags[i], notes: []};
	      break;
	    } 
	  }

	  if (!newTag) {
	    res.status(404).json({msg: '404 - Not Found', id });

	  } else {

	    for (let j=0; j<notes.length; j++) {
	      if (notes[j].tags.includes(newTag.id)) {
	        newTag.notes.push( fillNoteObj(notes[j]) );
	      }
	    }



	    // res.status(200).json({tag: newTag});
	    res.render('etiquetas/show', { tag:  newTag });
	  }
	},

	async pageTag(req, res, next) {
	  
	  /*
	   * Devo comparar elemento com elemento
	   *
	   */

	  const tags = await Tag.findAll({
	     order: [
	         ['id', 'ASC']
	     ],
	     include: [
	         {
	             model: Note,
	             as: 'notes',
	         }
	     ]

	  });

	  const notes = await Note.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
	         {
	             model: Tag,
	             as: 'tags',
	         }
	     ]
      });

	  let newTags = [];
	  const id = req.params.id;

	  for(let i=0; i<tags.length; i++) {
	    const t = { ...tags[i], notes: []};

	    for (let j=0; j<notes.length; j++) {
	      if (notes[j].tags.includes(t.id)) {
	        t.notes.push(notes[j]);
	      }
	    }

	    newTags.push(t);
	  }

	  // res.status(200).json({tags: newTags});
	  res.render('etiquetas/index', {tags: newTags});
	}
};
