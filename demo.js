var fs = require('fs');
var pm = require('./playmusic.js')
var alg = require('./algorithms.js')
var seed = require('./seed.js')


fs.readFile('Songs.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  songs = JSON.parse(data).filter(function(x){return (x.popularity > 70)});
  alg.setSongs(songs);
  console.log(songs.length);

  artists = getArtists(songs);
  users = seed.preMadeUsers(songs);
  users.push.apply(users, seed.randomUsers(songs,artists, 10));

  var mono = alg.createMonoUser(users.filter(function(x){return(x.real)}));
  console.log("Mono User Created");

  var neighbors = alg.KNN(mono,users,3);
  console.log("Nearest Neighbors Found");
  var results = alg.reccomend(neighbors,mono,songs,20);
  for (var i = 0; i < results.length; i++) {
    var song = results[i];
    console.log(results[i].name + ' - ' +results[i].artist.name);
  };

});

var writeArtists = function(songs){
  fs.truncateSync('artists.txt', 0)
  var sorted = getArtists(songs);
  for (var i = 0; i < sorted.length; i++) {
  	fs.appendFileSync('artists.txt', sorted[i]+'\n');
  };
  return sorted;
}
var getArtists = function(songs){
  artists = {}
  for (var i = songs.length - 1; i >= 0; i--) {
  	artists[songs[i].artist.name] = 1;
  };
  var artistsarray = []
  for (var key in artists) {
    if (artists.hasOwnProperty(key)) {
    	artistsarray.push(key);
	}
  }
  var sorted = artistsarray.sort()
  return sorted
}