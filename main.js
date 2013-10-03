/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var thingy.js = require('thingy.js');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.send('Server is running.');
});
app.get('/data', thingy.js.findAll);
app.get('/data/:id', thingy.js.findById);
app.post('/data', thingy.js.addObject);
app.put('/data/:id', thingy.js.updateObject);
app.delete('/data/:id', thingy.js.removeObject);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
