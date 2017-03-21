var Comment = require('../models/comment');
var config = require('../config');

var secretKey = config.secretKey;

module.exports = function(app) {
  // get all todos
  app.get('/api/comments', function(req, res) {
    // use mongoose to get all todos in the database
    Comment.find(function(err, comments) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        res.send(err);
      }
      res.json(comments); // return all todos in JSON format
    });
  });

  app.post('/api/comments', function(req, res) {
		// create a comment, information comes from AJAX request from Polymer
    Comment.create({
        text: req.body.text,
        username: req.body.username,
        date: req.body.date
  		}, function(err, comment) {
			if (err) {
        res.send(err);
      }
			// get and return all the comments after you create another
			Comment.find(function(err, comments) {
				if (err) {
          res.send(err);
        }
				res.json(comments);
			});
		});

	});


}
