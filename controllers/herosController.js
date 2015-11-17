var Hero = require("../models/hero");

//INDEX, restricted page to users
function getAll(request, response) {
  Hero.find({}, function (err, heros) {
    response.render('heros/index', { heros: heros });
  })
}

//CREATE
function createLegoHero(request, response) {
  Hero.create(request.body.hero, function (err, hero){
    if (err) {
      response.send("something wrong happened " + err )
    } else {
      response.redirect('/legoheros');
    }
  });
}

function collected(request, response){
  Hero.findByIdAndUpdate(request.params.id, {status: "Arthur owns it!"}, function (err, hero){
    response.redirect('/legoheros');
  })
};

function desired(request, response){
  Hero.findByIdAndUpdate(request.params.id, {status: "Arthur wants it!"}, function (err, hero){
    response.redirect('/legoheros');
  })
};

//SHOW
function getLegoHero(request, response){
  Hero.findById(request.params.id, function (err, hero) {
    response.render('./heros/show', {hero: hero});
  })
};

//DELETE
function removeLegoHero(request, response) {
  Hero.findByIdAndRemove(request.params.id, function (err, hero) {
    if (err) {
      response.send('something wrong happened ' + err)
    } else {
      response.redirect('/legoheros');
    }
  });
};

//EDIT
function editLegoHero(request, response) {
  Hero.findById(request.params.id, function (err, hero) {
    response.render('./heros/edit', {hero: hero});
  })
};

//UPDATE
function updateLegoHero(request, response) {
  Hero.findByIdAndUpdate( request.params.id, request.body.hero, function (err, hero){
    response.redirect('/legoheros');
  })
};

module.exports = {
  getAll: getAll,
  createLegoHero: createLegoHero,
  getLegoHero: getLegoHero,
  updateLegoHero: updateLegoHero,
  removeLegoHero: removeLegoHero,
  editLegoHero: editLegoHero,
  collected: collected,
  desired: desired
};
