var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var authenticate = require('./middleware/authenticator');

mongoose.Promise = global.Promise;
// Connect to Database
mongoose.connect("mongodb://aparab:password123@ds127391.mlab.com:27391/library");

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to DB ');
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error ' + err);
});

var User = require('./models/users').User;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static('client'));
app.use('/i18n.js', express.static('i18n.js'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

// POST /users gets JSON bodies 
app.post('/users', function (req, res) {
	console.log("POST /users", req.body);
	var body = { email: req.body.email, password: req.body.password };
  	
  	var user = new User( body );

  	user.save().then(() => {
  		res.status(200).send(user);
  	}).catch(err => {
  		res.status(400).send(err);
  	});
});

// POST /users gets JSON bodies 
app.post('/login', function (req, res) {
	console.log("POST /login", req.body);
	var body = { email: req.body.email, password: req.body.password };
  	
  	User.findByCredentials(body.email, body.password).then((user) => {
  		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
  		});
  	}).catch((err) => {
		res.status(400).send(err);
  	});
});

// GET /check 
app.get('/check', [authenticate], function (req, res) {
	res.send(req.user);
});

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});