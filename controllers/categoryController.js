// TODO: implementar seguindo o tutorial < https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example >

const Category = require('../models').Category;
const Note = require('../models').Note;
const Tag = require('../models').Tag;

module.exports = {
	async list(req, res) {
	  // res.status(200).send({rota: "categorias/json"});

	  const categories = await Category.findAll({
	      order: [
	          ['id', 'ASC']
	      ],
	     include: [
            {
                model: Note,
                as: 'notes',
            },
        ]

	  });

    const notes = await Note.findAll({
        order: [
            ['id', 'ASC']
        ],
    });

	  // res.status(200).json({categories});
    res.render('/categorias/json', { title: 'Express', categories });
    /*
	  .then((categories) => res.status(200).send(categories))
      .catch((error) => { res.status(400).send(error); });
    */
	},

	async getById(req, res, next) {
    
    const categories = await Category.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
            {
                model: Note,
                as: 'notes',
            },
        ]

    });

    const notes = await Note.findAll({
        order: [
            ['id', 'ASC']
        ],
    });

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



    
	  let newCategory = null;
	  const id = req.params.id;

	  for(let i=0; i<categories.length; i++) {
	    if (categories[i].id == id) {
	      newCategory = {...categories[i], notes: []};
	      break;
	    }
	  }

	  if (!newCategory) {
	    res.status(404).json({msg: '404 - Not Found', id });

	  } else {

	    for (let j=0; j<notes.length; j++) {
	      if (notes[j].category_id == newCategory.id) {
	        newCategory.notes.push( fillNoteObj(notes[j]) );
	      }
	    }

	    // res.status(200).json({ category:  newCategory, categories, tags });
	    res.render('categorias/show', { category:  newCategory, categories, tags });
	  }
	},

	async pageCategory(req, res, next) {

    const categories = await Category.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
            {
                model: Note,
                as: 'notes',
            },
        ]

    });

    const notes = await Note.findAll({
        order: [
            ['id', 'ASC']
        ],
    });



	  let newCategories = [];

	  for(let i=0; i<categories.length; i++) {
	    const c = { ...categories[i], notes: []};

	    for (let j=0; j<notes.length; j++) {
	      if (notes[j].category_id == c.id) {
	        c.notes.push(notes[j]);
	      }
	    }

	    newCategories.push(c);
	  }

	  // res.status(200).json({categories: newCategories});
	  res.render('categorias/index', {categories: newCategories});
	}
};
