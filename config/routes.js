var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var herosController = require('../controllers/herosController');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

// lego routes
router.route('/')
  .get(function(req, res){
    res.redirect('/legoheros');
});

router.route('/legoheros')
  .get(herosController.getAll)
  .post(herosController.createLegoHero);

router.route('/legoheros/:id/collected')
  .get(herosController.collected);

router.route('/legoheros/:id/desired')
  .get(herosController.desired);

router.route('/legoheros/:id/edit')
  .get(authenticatedUser, herosController.editLegoHero);

router.route('/legoheros/:id/delete')
  .get(authenticatedUser, herosController.removeLegoHero);

router.route('/legoheros/:id')
  .get(herosController.getLegoHero)
  .put(authenticatedUser, herosController.updateLegoHero);

module.exports = router;
