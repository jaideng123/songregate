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
  users = [];
  artists = getArtists(songs);//encourage some conflict
  //franklin likes hip hop
  users.push(seed.createSeedUser(['Kanye West','Jay Z','DMX','J. Cole','Akon','A$AP Rocky','Kendrick Lamar','Drake','Frank Ocean'],['David Bowie','A$AP Ferg','Justin Bieber'],songs,false));
  //brenda likes popular female artists
  users.push(seed.createSeedUser(['Ke$ha','Katy Perry','Lana Del Rey','Avril Lavigne','Ariana Grande','Carly Rae Jepsen','Icona Pop','Beyoncé','Adele'],['DMX'],songs,false));
  //nathan likes indie artists
  users.push(seed.createSeedUser(['Bon Iver','AWOLNATION','BØRNS','Cage The Elephant','Fleetwood Mac','Grouplove','Icona Pop','John Mayer','Kendrick Lamar','alt-J'],['Ke$ha','Ariana Grande','Justin Bieber'],songs,false));
  //keith likes country
  users.push(seed.createSeedUser(['Zac Brown Band','alt-J','Keith Urban','Kelly Clarkson','Jason Aldean','Florida Georgia Line','Carrie Underwood','Bruce Springsteen','Blake Shelton','Eric Church'],['Kanye West'],songs,false));
  //armando loves techno
  users.push(seed.createSeedUser(['Kanye West','Armin van Buuren','DJ Luke Nasty', 'DJ Snake', 'DJ Mustard', 'Daft Punk','David Guetta','MGMT','ODESZA','Skrillex','Steve Aoki','Avicii'],['Florida Georgia Line','Avril Lavigne'],songs,false));
  //david loves classic rock
  users.push(seed.createSeedUser(['Bruce Springsteen','David Bowie','AC/DC','Aerosmith','Arctic Monkeys','Def Leppard','Guns N\' Roses','Imagine Dragons','Led Zeppelin','Michael Jackson','The Beatles','The Smashing Pumpkins','Jimi Hendrix'],['DJ Luke Nasty','Ke$ha'],songs,false));
  //samantha is in middle school
  users.push(seed.createSeedUser(['John Mayer','Bring Me The Horizon','Bright Eyes','Bon Iver','Capital Cities','Coldplay','Demi Lovato','Ellie Goulding','Fall Out Boy','Evanescence','Foster The People','Green Day','blink-182','WALK THE MOON'],['Guns N\' Roses'],songs,false));
  //random users like random things
  console.log("Seed Users Created");
  for (var i = 10; i >= 0; i--) {
  	likes = []
  	dislikes = []
  	for (var j = 0; j < 15; j++) {
  		like = Math.floor((Math.random() * Number(artists.length)));
  		likes.push(artists[like]);
  	};
    for (var j = 0; j < 5; j++) {
      dislike = Math.floor((Math.random() * Number(artists.length)));
      dislikes.push(artists[dislike]);
    };
  	users.push(seed.createSeedUser(likes,dislikes,songs,true))
  };
  console.log("Random users created");
  var mono = alg.createMonoUser(users.filter(function(x){return(x.real)}));
  console.log("Mono User Created");
  var results = alg.KNN(mono,users,3);
  console.log("Nearest Neighbors Found");
  console.log(alg.reccomend(results,mono,songs));

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