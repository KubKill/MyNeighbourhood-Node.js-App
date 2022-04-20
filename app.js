var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const residentRouter = require('./routes/residentRoute');
const localRouter = require('./routes/localRoute');
const residentLocalRouter = require('./routes/residentLocalRoute');
const sequelizeInit = require('./config/sequelize/init');
const resApiRouter = require('./routes/api/ResidentApiRoute');
const locApiRouter = require('./routes/api/LocalApiRoute');
const resLocApiRouter = require('./routes/api/ResidentLocalApiRoute');
const session = require('express-session');

sequelizeInit()
  .catch(err => {
    console.log(err);
  });
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});

app.use('/', indexRouter);
app.use('/residents', residentRouter);
app.use('/locals', localRouter);
app.use('/resident_local', residentLocalRouter);
app.use('/api/residents', resApiRouter);
app.use('/api/locals', locApiRouter);
app.use('/api/resident_local', resLocApiRouter);


// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
