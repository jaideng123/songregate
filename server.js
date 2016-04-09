var http = require("http");
var fs = require('fs');
var pm = require('./playmusic.js')
var alg = require('./algorithms.js')
var seed = require('./seed.js')


var port = Number(process.env.PORT || 3000)
var songs = []
var reccomended = []

var server = http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   var song = reccomended.pop();
   var name = song.name;
   var artist = song.artist.name
   pm.streamUrl(song.playId,function(url){
      response.end(JSON.stringify({'name':name,'artist':artist,'url':url}));
   });
});

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
  console.log("Seed users created:"+users.length);
  var mono = alg.createMonoUser(users.filter(function(x){return(x.real)}));
  console.log("Mono User Created");
  var results = alg.KNN(mono,users,3);
  console.log("Nearest Neighbors Found");
  reccomended = alg.reccomend(results,mono,songs,20);
  console.log("Reccomended Songs Found:"+reccomended.length);
  server.listen(port);
});
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