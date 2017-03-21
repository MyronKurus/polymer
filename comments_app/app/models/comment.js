var mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
	text : String,
	username: String,
  date: String
});
