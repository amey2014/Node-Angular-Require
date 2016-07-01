var express = require('express');
var app = express();

app.use('/static', express.static('client'));
app.use('/i18n.js', express.static('i18n.js'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});