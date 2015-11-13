var express        = require('express'),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

var Hero = require("../../models/hero");

router.get('/legoheros', function (req, res){
  Hero.find({}, function (err, heros) {
    if (err) {
      res.send("something wrong happened " + err )
    } else {
      res.send(heros);
    }
  });
})

//CREATE
router.post('/legoheros', function (req, res){
  Hero.create(req.body, function (err, hero){
    console.log(req.body.hero);
    if (err) {
      res.send("something wrong happened " + err )
    } else {
      res.redirect('/legoheros');
    }
  });
})

//SHOW
router.get('/legoheros/:id', function (req, res){
  Hero.findById(req.params.id, function (err, hero){
    if (err) {
      res.send("something wrong happened " + err )
    } else {
      res.send(hero);
    }
  });
})

//UPDATE
router.put('/legoheros/:id', function (req, res) {
  Hero.update({id: req.params.id }, req.body.hero, function (err, hero){
    if (err){
      res.send(err);
    } else {
      res.json({message: "Hero updated!"});
    }
  })
});

//DELETE
router.delete('/legoheros/:id/delete', function (req, res) {
   Hero.remove( {id: req.params.id }, function (err, hero) {
     if (err) {
       res.send(err);
     } else {
       res.json({message: 'Succesfully deleted'})
     }
  })
});


module.exports = router