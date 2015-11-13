var express        = require('express'),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

var Hero = require("../models/hero");

//INDEX
router.get('/legoheros', function (req, res){
  Hero.find({}, function (err, heros) {
    res.render('heros/index', { heros: heros });
  })
})

//CREATE
router.post('/legoheros', function (req, res){
  Hero.create(req.body.hero, function (err, hero){
    if (err) {
      res.send("something wrong happened " + err )
    } else {
      res.redirect('/legoheros');
    }
  });
})

router.get('/legoheros/:id/collected', function (req, res){
  Hero.findByIdAndUpdate(req.params.id, {status: "Arthur owns it!"}, function (err, hero){
    res.redirect('/legoheros');
  })
});

router.get('/legoheros/:id/desired', function (req, res){
  Hero.findByIdAndUpdate(req.params.id, {status: "Arthur wants it!"}, function (err, hero){
    res.redirect('/legoheros');
  })
});

//SHOW
router.get('/legoheros/:id/show', function (req, res){
  Hero.findById( req.params.id, function (err, hero) {
    res.render('./heros/show', {hero: hero});
  })
});

//DELETE
router.get('/legoheros/:id/delete', function (req, res) {
  Hero.findByIdAndRemove( req.params.id, function (err, hero) {
    if (err) {
      res.send('something wrong happened ' + err)
    } else {
      res.redirect('/legoheros');
    }
  });
});

//EDIT
router.get('/legoheros/:id/edit', function (req, res) {
  Hero.findById( req.params.id, function (err, hero) {
    res.render('./heros/edit', {hero: hero});
  })
});

//UPDATE
router.put('/legoheros/:id', function (req, res) {
  Hero.findByIdAndUpdate( req.params.id, req.body.hero, function (err, hero){
    res.redirect('/legoheros');
  })
});


module.exports = router
