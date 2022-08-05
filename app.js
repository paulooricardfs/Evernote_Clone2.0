var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');

const hbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
const hbsCustomFunctions = require('./config/hbs-custom-functions');

// hbs2.registerHelper('dateFormat', require('handlebars-dateformat'));


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
/*
 * Criar as rotas para notas, categorias e tags
 * Por exemplo:
 * var notesRouter = require('./routes/notes');
 * var categoriesRouter = require('./routes/notes');
 * var tagsRouter = require('./routes/notes');
 * 
 */

var app = express();

/*
const Nota = require('./models/Nota')
const Categoria = require('./models/Categoria')
const Tag = require('./models/Tag')
const Note_tag = require('./models/Note_tag')
*/

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

/*
 * Ref.: https://itnext.io/using-handlebars-helpers-with-express-generator-ad163f7f89d6
 * Ref.: https://axiacore.com/blog/check-if-item-array-handlebars-547/
 * Ref.: https://christianhur.com/how-to-create-custom-handlebars-helper-functions-in-node-js-express-js/
 */
app.engine(
  "hbs",
  hbs.engine({
    helpers: multihelpers,
    // partialsDir: ["views/partials"],
    partialsDir: ["views"],
    extname: ".hbs",
    layoutsDir: "views",
    defaultLayout: "layout",
    helpers: hbsCustomFunctions
  })
);

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
