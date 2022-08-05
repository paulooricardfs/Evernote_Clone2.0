// TODO: implementar seguindo o tutorial < https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example >

const categoryController = require('./categoryController');
const noteController = require('./noteController');
const note_tagController = require('./note_tagController');
const tagController = require('./tagController');

module.exports = {
  categoryController,
  noteController,
  note_tagController,
  tagController,
};