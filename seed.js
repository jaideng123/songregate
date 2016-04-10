
exports.preMadeUsers = function(songs){
  var users = [];
  //franklin likes hip hop
  users.push(exports.createSeedUser(['Kanye West','Jay Z','DMX','J. Cole','Akon','A$AP Rocky','Kendrick Lamar','Drake','Frank Ocean'],['David Bowie','A$AP Ferg','Justin Bieber'],songs,false));
  //brenda likes popular female artists
  users.push(exports.createSeedUser(['Ke$ha','Katy Perry','Lana Del Rey','Avril Lavigne','Ariana Grande','Carly Rae Jepsen','Icona Pop','Beyoncé','Adele','Selena Gomez'],['DMX'],songs,false));
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
  //clay likes more modern artists and leans to more pop songs
  users.push(exports.createSeedUser(['Carly Rae Jepsen','Carrie Underwood','Coldplay','Adele','Avicii','Demi Lovato','Ed Sheeran','Icona Pop','Katy Perry','Maroon 5','OneRepublic'],['Daft Punk', 'Def Leppard','AC/DC','Jimi Hendrix'],songs,false));
  //chris likes rock artiists
  users.push(exports.createSeedUser(['Def Leppard','AC/DC','Jimi Hendrix','Phil Collins','Led Zeppelin','Journey','The Strokes','Train','Aerosmith','Bob Dylan','Guns N\' Roses'],['Rachel Platten','Selena Gomez','T-Pain'],songs,false));
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

exports.randomUsers = function(songs,artists,limit){
  var users = [];
  for (var i = 0; i < limit; ++i) {
    likes = []
    dislikes = []
    for (var j = 0; j < 15; j++) {
      like = Math.floor((Math.random() * Number(artists.length)));
      likes.push(artists[like]);
    };
    for (var k = 0; k < 5; k++) {
      dislike = Math.floor((Math.random() * Number(artists.length)));
      dislikes.push(artists[dislike]);
    };
    users.push(exports.createSeedUser(likes,dislikes,songs,true))
  };
  return users;
}
