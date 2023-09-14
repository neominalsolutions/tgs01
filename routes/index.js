var express = require('express');
var router = express.Router();
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  // req: express.RequestObject
  // res:express.ResponseObject
  // render 2.parametre ise view gönderilen objeyi temsil ediyor.

  console.log('date',  moment().format());

  var person = {id:1,name:'can', surname:'tan', bt: moment().add(-30,'years').toDate()};

  res.render('./home/index', { title: 'Express', person: person });
});

router.get('/about', function (req,res,next) {
  const aboutModel = {title:'about', content:'Hakkımızda'};
  // home klasörü altında about diye bir view tanımlamalıyım.
  res.render('./home/about', aboutModel);
});

router.get('/items', function (req,res,next) {
  
  const items = [{ id: 1, name:'ali'}, {id:2,name:'can'}];

  res.render('./home/items', {items:items})

})





module.exports = router;
