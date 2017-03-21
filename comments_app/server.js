var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var url = require('url');
var config = require('./app/config');
var mongoose = require('mongoose');

var app = express();

mongoose.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));
app.use('/elements', express.static(path.join(__dirname + '/elements')));

require('./app/routes/comment')(app);

app.all('*', function(req, res, next) {
    res.sendFile(path.resolve('index.html'));
});


/* start app */
app.listen(3000, function () {
    console.log('Listening on port ' + 3000);
});
