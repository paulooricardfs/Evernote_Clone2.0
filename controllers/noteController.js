// TODO: implementar seguindo o tutorial < https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example >

const Note = require('../models').Note;
const Category = require('../models').Category;
const Tag = require('../models').Tag;

module.exports = {

	async index(req, res, next) {
		
		const notes = await Note.findAll({
		    order: [
		        ['updated_at', 'DESC']
		    ],
		    include: [
		        {
		            model: Category,
		            as: 'category',
		        },
		        {
		        	model: Tag,
		        	as: 'tags'
		        }
		    ]
		});

		const tags = await Tag.findAll({
		      order: [
		          ['id', 'ASC']
		      ],
	  	});

	  	const categories = await Category.findAll({
		      order: [
		          ['id', 'ASC']
		      ],
	  	});

		// res.status(200).json({notes, tags, categories});

		console.log({tags: notes[0].dataValues.tags.map(x => x.dataValues) });
		

	  	res.render('index', { title: 'Express', notes, tags, categories });
	},

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
	},

	getById(req, res) {
    return Note
      .findById(req.params.id, {
        include: [{
          model: Category,
          as: 'category'
        },{
          model: Tag,
          as: 'tags'
        }
        ],
      })
      .then((note) => {
        if (!note) {
          return res.status(404).send({
            message: 'Profile Not Found',
          });
        }
        return res.status(200).send(note);
      })
      .catch((error) => res.status(400).send(error));
  },




	async add(req, res, next) {
		
		const note = {
		    title: '',
		    body: '',
		    category: null,
		    category_id: null,
		    tags: []
		};
		
		const notes = await Note.findAll({
		    order: [
		        ['updated_at', 'DESC']
		    ],
		    include: [
		        {
		            model: Category,
		            as: 'category',
		        },
		        {
		        	model: Tag,
		        	as: 'tags'
		        }
		    ]
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

	  	const categories = await Category.findAll({
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
		
	 	res.render('notas/create', { note, tags, categories });
	},

	async update(req, res, next) {

	  const notes = await Note.findAll({
		    order: [
		        ['updated_at', 'DESC']
		    ],
		    include: [
		        {
		            model: Category,
		            as: 'category',
		        },
		        {
		        	model: Tag,
		        	as: 'tags'
		        }
		    ]
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

	  const categories = await Category.findAll({
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

	  const id = req.params.id;
	  const title = 'Edit note';

	  const payload = {
	    title,
	    id,
	    body: req.body
	  };

	  // Atualiza a nota

	  // Tudo ocorrendo bem, podemos fazer duas coisas
	  // #1 - redirecionar para show note
	  res.redirect(`/${id}`);

	  // #2 - redirecionar para a lista de notas
	  // res.redirect(`/`);

	  // res.status(200).send(payload);
	},

	async edit(req, res, next) {

	  const notes = await Note.findAll({
		    order: [
		        ['id', 'DESC']
		    ],
		    include: [
		        {
		            model: Category,
		            as: 'category',
		        },
		        {
		        	model: Tag,
		        	as: 'tags'
		        }
		    ]
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

	  	const categories = await Category.findAll({
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

	  const id = req.params.id;
	  const title = 'Edit note';

	  
	  // Carrega a nota com as relacoes
	  const note = notes.find( elem => {
	    return elem.id == id;
	  });
	  
	  // 404 - Resource Not Found!
	  if (typeof note !== 'object') {
	    res.status(404).send({
	      title,
	      code: '404 - Resource Not Found',
	      id,
	      note
	    });
	  }
	  
	  // renderiza a view
	  res.render('notas/edit', {
	    title,
	    note,
	    categories,
	    tags
	  });

	  /*
	  res.status(200).send({
	    title,
	    note,
	    categories,
	    tags
	  });
	  */
	},

	async delete(req, res, next) {

	  const notes = await Note.findAll({
		    order: [
		        ['updated_at', 'DESC']
		    ],
		    include: [
		        {
		            model: Category,
		            as: 'category',
		        },
		        {
		        	model: Tag,
		        	as: 'tags'
		        }
		    ]
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

	  	const categories = await Category.findAll({
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

	  const id = req.params.id;
	  
	  const title = 'Delete note';

	  // Carrega a nota com as relacoes
	  const note = notes.find( elem => {
	    return elem.id == id;
	  });

	  res.status(200).send({
	    title,
	    note
	  });
	},

	async store(req, res, next) {
	  res.status(200).send(req.body);
	},

	async show(req, res, next) {

	  const notes = await Note.findAll({
		    order: [
		        ['updated_at', 'DESC']
		    ],
		    include: [
		        {
		            model: Category,
		            as: 'category',
		        },
		        {
		        	model: Tag,
		        	as: 'tags'
		        }
		    ]
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

	  	const categories = await Category.findAll({
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

	  const id = req.params.id;
	  const title = 'Show note';

	  let notaPureObj = null;
	  for (let i=0; i<notes.length; i++) {
	    if (notes[i].id == id) {
	      notaPureObj = notes[i];
	      break;
	    }
	  }


	  if(!notaPureObj) {
	    res.status(404).send({
	      title,
	      id,
	      msg: '404 - Not Found',
	      headers: req.headers,
	    });    
	  } else {
		  const notes = await Note.findAll({
			    order: [
			        ['updated_at', 'DESC']
			    ],
			    include: [
			        {
			            model: Category,
			            as: 'category',
			        },
			        {
			        	model: Tag,
			        	as: 'tags'
			        }
			    ]
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

		  	const categories = await Category.findAll({
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

	    // res.status(200).send({ title, note, headers: req.headers});
	    res.render('notas/show', {notes});
	  }
	}
};
