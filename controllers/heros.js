var express        = require('express'),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

var Hero = require("../models/hero");

router.get('/legoheros', function (req, res){
  Hero.find({}, function (err, heros) {
    res.render('heros/index', { heros: heros });
  })
})

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

//DELETE
router.delete('/legoheros/:id/delete', function (req, res) {
  Hero.remove( {id: req.params.id }, function (err, hero) {
    if (err) {
      res.send("something wrong happened " + err )
    } else {
      res.redirect('/legoheros');
     }
  })
});

// //SHOW
// router.get('/legoheros/:id', function (req, res){
//   Hero.findById(req.params.id, function (err, hero){
//     if (err) {
//       res.send("something wrong happened " + err )
//     } else {
//       res.send(hero);
//     }
//   });
// })

// //UPDATE
// router.put('/legoheros/:id', function (req, res) {
//   Hero.update({id: req.params.id }, req.body.hero, function (err, hero){
//     if (err){
//       res.send(err);
//     } else {
//       res.json({message: "Hero updated!"});
//     }
//   })
// });


module.exports = router
