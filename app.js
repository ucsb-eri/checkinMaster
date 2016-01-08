var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUtils = require('./fileUtils');

var CONF = './config.json';

if ( fileUtils.fileExists(CONF) == false ) {
    // want to do some kind of error generation
    console.log('You need to copy config-default.json to config.json.');
    console.log('Then edit config.json to reflect any values specfied.');
    console.log('Most critical is the zonedir path.');
    process.exit(0);
}
var mydb = require('./myDb');

var root = require('./routes/index');
var checkin = require('./routes/checkin');
var clear = require('./routes/clear');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var conf = require(CONF);

app.use('/', root);
app.use('/checkin', checkin);
app.use('/clear', clear);

mydb.init();

// would actually like to make this synchronous
//db.run("create table if not exists checkin (host text primary key, ip text, ctime int)");
///,[], function(err) {
///        if ( err == null ){
///               myLoop();
///        }
///

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
