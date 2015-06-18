var express = require('express')
var logger = require('morgan');
var app = express()
var swig = require('swig')
var routes = require('./routes/');
var body =  require('body-parser')
var socketio = require('socket.io');

app.use(body.urlencoded({ extended: false }))
app.use(body.json())

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
swig.setDefaults({ cache: false });
// create "middleware"
app.use( logger('dev') );

app.use(express.static(__dirname + '/public'));


console.log('server on')



// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// app.get('/', function (req, res) { 
//   res.render( 'index', {title: 'Hall of Fame', people: people} );
// });
// app.get('/any', function (req, res) {
//   res.send('Hello any!');
// });

var server_instance = app.listen(3000)
var io = socketio.listen(server_instance);
app.use('/', routes(io));


///git test