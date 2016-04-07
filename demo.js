var fs = require('fs');
var pm = require('./playmusic.js')
var alg = require('./algorithms.js')


fs.readFile('Songs.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  songs = JSON.parse(data);
  console.log(alg.createSeedUser(['dj khaled','kanye west','jay-z'],[],songs));
});