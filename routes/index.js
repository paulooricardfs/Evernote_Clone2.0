var express = require('express');
var router = express.Router();

const Category = require('../models').Category;
const Note = require('../models').Note;
const Tag = require('../models').Tag;
const Note_tag = require('../models').Note_tag;

const categoryController = require('../controllers').categoryController;
const tagController = require('../controllers').tagController;
const noteController = require('../controllers').noteController;

/*
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
*/

/* GET home page. */
router.get('/', noteController.index);

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

/* Category Router */
router.get('/categorias/json', categoryController.list);
router.get('/categorias/:id', categoryController.getById);
router.get('/categorias', categoryController.pageCategory);

/* Tag Router */
router.get('/etiquetas/json', tagController.list);
router.get('/etiquetas/:id', tagController.getById);
router.get('/etiquetas', tagController.pageTag);


/* Note Router */
router.get('/notes/json', noteController.list);
router.get("/create", noteController.add);
router.post("/create", noteController.add);
router.put("/notes/:id", noteController.update);
router.post("/notes", noteController.store);
router.get("/:id/edit", noteController.edit);
router.put("/:id/edit", noteController.edit);
router.delete("/:id/delete", noteController.delete);
router.get("/:id", noteController.show);


module.exports = router;
