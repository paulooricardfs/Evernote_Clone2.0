var express = require('express');
var router = express.Router();

const categories = require('../dados/categories');
const tags = require('../dados/tags');
const notes = require('../dados/notes');


const fillNoteObj = (noteObj) => {
  const newObj = {...noteObj, tagsList: [], category: {} };

  // Get Tags
  for (let i=0; i<tags.length; i++) {
    if (noteObj.tags.includes(tags[i].id)) {
      newObj.tagsList.push(tags[i]);
    }
  }

  // Get Category
  for (let i=0; i<categories.length; i++) {
    if (noteObj.category_id == categories[i].id) {
      newObj.category = categories[i];
      break;
    }
  }

  return newObj;
};

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express', notes, tags, categories });
});
  
/*
const section = "Definir section"; // string || number || boolean
const user = {'name': 'Paulo Ricardo', 'position': 'Developer'};

router.get('/categories', function(req, res, next) {
  const section = "Categorias"; // string || number || boolean
  res.render('categories/index', {section, categories, user});

  // res.status(200).send({section, categories, user});
  
});

router.get('/tags', function(req, res, next) {
  res.render('tags/index', {section: "Etiquetas"});
  // res.status(200).send({"name": "Rota para as etiquetas"});
});
*/
router.get("/create", function(req, res, next) {
  const note = {
    title: '',
    body: '',
    category: null,
    category_id: null,
    tags: []
  };

  res.render('notas/create', { note, tags, categories });
});


router.get('/categorias/:id', function(req, res, next) {
  
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

  
});

router.get('/categorias', function(req, res, next) {

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
});


router.get('/etiquetas/:id', function(req, res, next) {
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
});


router.get('/etiquetas', function(req, res, next) {
  
  /*
   * Devo comparar elemento com elemento
   *
   */


  let newTags = [];

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
});


// Update Note
router.post("/notes/:id", function(req, res, next) {

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
});

// Store Note
router.post("/notes", function(req, res, next) {
  res.status(200).send(req.body);
});

// Edit note
router.get("/:id/edit", function(req, res, next) {

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

});

// Show note
router.get("/:id", function(req, res, next) {

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
    const note = fillNoteObj( notaPureObj );

    // res.status(200).send({ title, note, headers: req.headers});
    res.render('notas/show', {note});
  }

  


});

module.exports = router;
