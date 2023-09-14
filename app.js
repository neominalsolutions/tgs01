
// exceptionları bu paket ile yakalıyor. Global olarak çalışır. 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var a = require('crypto');

var hbs = require('express-hbs');
// sadece dosya dizinin çağırdık.
require('./helpers/hbs/hbs.helpers');



var app = express();

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  defaultLayout:__dirname + '/views/layouts/main.hbs',
  partialsDir: __dirname + '/views/partials' // uygulama içerisinde kullanılan parçalı html'ler
}));
app.set('view engine', 'hbs'); // tek seferde 1 view engine desteği var
app.set('views', __dirname + '/views');





// view engine setup
// __dirname uygulamanın ana dizini
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// nodejs uygulamalarında gelen istekler ilk olarak middleware düşer
// middleware uygulama istek kazandırır.
app.use(logger('dev')); // development modda uygulamayı gelen istekleri bu middleware ile console loglama yaparız.

// JSON formatında bir istek okuyabilmek için kullanılan middleware
app.use(express.json());
// www.url.formencoded form üzerinden formData olarak gönderilen değerlerin okunabilesi için gerekli olan middleware
app.use(express.urlencoded({ extended: false }));

// uygulamada çerezler ile çalışmak için kullanılan middleware
app.use(cookieParser());

// js css ve img uygulamadan dışarı çıkıp kullanılabilmesi için static file özelliği aktif olmalı.
app.use(express.static(path.join(__dirname, 'public')));

// local file stystem
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// ana route üzerkleri indexRouter
app.use('/', indexRouter);
// user Router (userController)
app.use('/users', usersRouter);

// herhangi bir path route bulunmadığında burası çalışır.
// route dosyalarının altında olmalır.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// uygulamadaki tüm hataları error middleare ile yakalarızç
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // Hata sayfasına yönlendiriyor.
  res.render('error');
});

module.exports = app;
