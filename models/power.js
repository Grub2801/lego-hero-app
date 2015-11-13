var mongoose    = require('mongoose');

var PowerSchema  = new mongoose.Schema({
  strength         : Number,
  fighting_skill   : Number,
  intelligence     : Number,
  speed            : Number,

});

var Power = mongoose.model('Power', PowerSchema)
module.exports = Power;