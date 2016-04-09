var fs = require('fs');
var pm = require('./playmusic.js')
var alg = require('./algorithms.js')


fs.readFile('Songs.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  songs = JSON.parse(data);
  users = [];
  artists = getArtists(songs).splice(0,100);//encourage some conflict
  //franklin likes hip hop
  users.push(alg.createSeedUser(['DJ Khaled','Kanye West','Jay Z','DMX','J. Cole'],['Dan Croll','David Bowie'],songs,true));
  users.push(alg.createSeedUser(['DJ Khaled','Kanye West','Jay Z','DMX','J. Cole','Ke$ha'],['Dan Croll','David Bowie'],songs,true));
  //brenda likes popular female artists
  users.push(alg.createSeedUser(['Ke$ha','Iggy Azalea','Katy Perry','Lady Gaga','London Grammar'],['DMX'],songs,true));
  //random users like random things
  for (var i = 100; i >= 0; i--) {
  	likes = []
  	dislikes = []
  	for (var j = 9; j >= 0; j--) {
  		like = Math.floor((Math.random() * Number(artists.length)));
  		dislike = Math.floor((Math.random() * Number(artists.length)));
  		likes.push(artists[like]);
  		dislikes.push(artists[dislike]);
  	};
  	users.push(alg.createSeedUser(likes,dislikes,songs,false))
  };
  var mono = alg.createMonoUser(users.filter(function(x){return(x.real)}));
  console.log(alg.runKNN(mono,users,5));

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