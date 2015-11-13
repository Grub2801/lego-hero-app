var mongoose    = require('mongoose');
var HeroSchema      = new mongoose.Schema({
    character   : String,
    full_name   : String,
    occupation  : String,
    power       : String,
    status      : { type: String, enum: ["Arthur owns it!", "Arthur wants it!"]}
});

var Hero = mongoose.model('Hero', HeroSchema);
module.exports = Hero;