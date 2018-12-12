var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/index');
var users = require('./routes/users');
var quiz = require('./routes/quiz');
var showquiz = require('./routes/showquiz');
var login_register = require('./routes/login_register');
var user_settings = require('./routes/user_settings');
var user_profile = require('./routes/user_profile');
var subject = require('./routes/subjects');
var category = require('./routes/category');
var material = require('./routes/material');
var material_item = require('./routes/material_item');
var quiz_landing = require('./routes/quiz_landing');
var quiz_create = require('./routes/quiz_create');
var quiz_take = require('./routes/quiz_take');
var question_create = require('./routes/question_create');
var answer_create = require('./routes/answer_create');
var result = require('./routes/result');
var stats = require('./routes/stats');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.use('/subjects', subject);
app.use('/login_register', login_register);
app.use('/user_settings', user_settings);
app.use('/user_profile', user_profile);
app.use('/category',category);
app.use('/quiz_create', quiz_create);
app.use('/quiz_take', quiz_take);
app.use('/question_create', question_create);
app.use('/answer_create', answer_create);
app.use('/quiz', quiz);  
app.use('/showquiz', showquiz);  
app.use('/result', result);
app.use('/materials', material);
app.use('/study', material_item);
app.use('/quiz_landing', quiz_landing);
app.use('/stats', stats);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;