var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');
var ejsLayouts      = require('express-ejs-layouts');
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');

// mongoose.connect('mongodb://localhost:27017/lego-hero');

var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/lego-hero';
mongoose.connect(mongoUri);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI GENERAL ASSEMBLY EXPRESS' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

// app.use('/api', require('./controllers/api/heros'))

app.use(function (req, res, next) {
  global.user = req.user;
  next();
});

var path            = require('path');
var logger          = require('morgan');
var helpers         = require('express-helpers');
var methodOverride  = require('method-override');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// router.get('/', function(req, res){
//   res.redirect('/legoheros');
// })

var routes = require('./config/routes');
app.use(routes);

var port            = process.env.PORT || 3000;
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
