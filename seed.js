
exports.preMadeUsers = function(songs){
  var users = [];
  //franklin likes hip hop
  users.push(exports.createSeedUser(['Kanye West','Jay Z','DMX','J. Cole','Akon','A$AP Rocky','Kendrick Lamar','Drake','Frank Ocean'],['David Bowie','A$AP Ferg','Justin Bieber'],songs,false));
  //brenda likes popular female artists
  users.push(exports.createSeedUser(['Ke$ha','Katy Perry','Lana Del Rey','Avril Lavigne','Ariana Grande','Carly Rae Jepsen','Icona Pop','Beyoncé','Adele'],['DMX'],songs,false));
  //nathan likes indie artists
  users.push(exports.createSeedUser(['Bon Iver','AWOLNATION','BØRNS','Cage The Elephant','Fleetwood Mac','Grouplove','Icona Pop','John Mayer','Kendrick Lamar','alt-J'],['Ke$ha','Ariana Grande','Justin Bieber'],songs,false));
  //keith likes country
  users.push(exports.createSeedUser(['Zac Brown Band','alt-J','Keith Urban','Kelly Clarkson','Jason Aldean','Florida Georgia Line','Carrie Underwood','Bruce Springsteen','Blake Shelton','Eric Church'],['Kanye West'],songs,false));
  //armando loves techno
  users.push(exports.createSeedUser(['Kanye West','Armin van Buuren','DJ Luke Nasty', 'DJ Snake', 'DJ Mustard', 'Daft Punk','David Guetta','MGMT','ODESZA','Skrillex','Steve Aoki','Avicii'],['Florida Georgia Line','Avril Lavigne'],songs,false));
  //david loves classic rock
  users.push(exports.createSeedUser(['Bruce Springsteen','David Bowie','AC/DC','Aerosmith','Arctic Monkeys','Def Leppard','Guns N\' Roses','Imagine Dragons','Led Zeppelin','Michael Jackson','The Beatles','The Smashing Pumpkins','Jimi Hendrix'],['DJ Luke Nasty','Ke$ha'],songs,false));
  //samantha is in middle school
  users.push(exports.createSeedUser(['John Mayer','Bring Me The Horizon','Bright Eyes','Bon Iver','Capital Cities','Coldplay','Demi Lovato','Ellie Goulding','Fall Out Boy','Evanescence','Foster The People','Green Day','blink-182','WALK THE MOON'],['Guns N\' Roses'],songs,false));
  return users;
}
var psuedocount = 0;
exports.createSeedUser = function(likes, dislikes, songs, real){
  var user = {};
  user.taste = {};
  user.name = "SEEDUSER" + psuedocount;
  psuedocount += 1;
  user.real = real;
  for (var i = songs.length - 1; i >= 0; i--) {
    if(likes.indexOf(songs[i].artist.name) !== -1)
      user.taste[songs[i].playId] = 1;
    if(dislikes.indexOf(songs[i].artist.name) !== -1)
      user.taste[songs[i].playId] = -1;
  };
  return user
}
