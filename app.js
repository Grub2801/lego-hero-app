var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var expressLayouts  = require('express-ejs-layouts')
var mongoose        = require('mongoose');
var methodOverride  = require('method-override');

var app             = express();
var port            = process.env.PORT || 3000;
var router          = express.Router();
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/lego-hero';

mongoose.connect(mongoUri);

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(methodOverride('_method'));

app.use(require('./controllers/heros'));
app.use('/api', require('./controllers/api/heros'))


app.set('views', './views');
app.set('view engine', 'ejs');

router.get('/', function(req, res){
  res.redirect('/legoheros');
})

app.use(router);

app.listen(port);
console.log('Server started on ' + port);

//development error handler
if(app.get('env') === 'development') {
  app.use(function(err, req, res, next){
    console.log(err);
    res.status(err.status || 500);
    res.json(400, {
      message: err.message,
      error: err
    });
  });
}

//production error handler
app.use(function(err, req, res, next){
  console.log(err);
  res.status(err.status || 500);
  res.json(400, {
    message: err.message,
    error: {}
  });
});


