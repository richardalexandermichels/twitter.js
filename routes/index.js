
module.exports = function(io){

var express = require('express');
var router = express.Router();

// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');



router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showTweets: true, showForm: true  } );
});


router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );

  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets, showTweets: true, 
  						showID: false, showForm: true, name:name} );
});


router.get('/users/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var id = req.params.id;
  var tweets = tweetBank.find( {name: name} );
  var ID = tweetBank.find( {id: id} );

  res.render( 'index', { title: 'A post by '+name, id:ID, showTweets: false, showID: true} );

});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  io.sockets.emit('new_tweet', { name:name, text:text });
  res.redirect('/');
});

return router

}