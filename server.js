var http = require("http");
var url = require('url');
var qs = require('qs');
var fs = require('fs');
var pm = require('./playmusic.js')
var alg = require('./algorithms.js')
var seed = require('./seed.js')


var port = Number(process.env.PORT || 3000)
var songs = []
var reccomended = []
var users = []

var server = http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    var request_url = url.parse(request.url);
    if(request_url.search)
        var query_string = qs.parse(request_url.search.substring(1))
    else
        var query_string = qs.parse('')
    //users portion of the API
    if (request_url.pathname.split('/')[1] === 'users') {
        //get list of users
        if (request_url.pathname.split('/')[2] === 'all') {
            response.end(JSON.stringify(users));
        }
        //create a new user and add it to the list of users
        else if (request_url.pathname.split('/')[2] === 'new') {
            var new_user = { name: randomId(), taste: {}, real: true }
            users.push(new_user)
            response.end(JSON.stringify(new_user));
        }
        //find a spefic user 
        else {
            var user_id = request_url.pathname.split('/')[2];
            var user = users.filter(function(x) {
                    return (x.name === user_id)
                })[0];
            var index = users.indexOf(user);
            if(request_url.pathname.split('/')[3] === 'likes'){
                if(query_string['song']){
                    console.log("LIKES")
                    user.taste[query_string['song']] = 1;
                }
                else if(query_string['artist']){
                    for (var i = songs.length - 1; i >= 0; i--) {
                        if(songs[i].artist.name === query_string['artist'])
                          user.taste[songs[i].playId] = 1;
                    };
                }
            }
            else if(request_url.pathname.split('/')[3] === 'dislikes'){
                if(query_string['song']){
                    user.taste[query_string['song']] = -1;
                }
                else if(query_string['artist']){
                    for (var i = songs.length - 1; i >= 0; i--) {
                        if(songs[i].artist.name === query_string['artist'])
                          user.taste[songs[i].playId] = -1;
                    };
                }
            }
            users[index] = user;
            response.end(JSON.stringify(user));
        }
    }
    //song portion of the API
    else if (request_url.pathname.split('/')[1] === 'song') {
        if (request_url.pathname.split('/')[2] === 'current') {
            var song = current_song;
            var name = song.name;
            var artist = song.artist.name
            var album = song.album;
            var id = song.playId;
            if (query_string['url'] === 'true') {
                pm.streamUrl(song.playId, function(url) {
                    response.end(JSON.stringify({ 'name': name, 'artist': artist, 'url': url, 'album': album,'id':id }));
                });
            } 
            else {
                response.end(JSON.stringify({ 'name': name, 'artist': artist, 'album': album,'id':id }));
            }
        } 
        else if (request_url.pathname.split('/')[2] === 'next') {
            var song = reccomended.pop();
            if(reccomended.length === 0){
              reccomended = getReccomended(10);
            }
            var name = song.name;
            var artist = song.artist.name
            var album = song.album;
            var id = song.playId;
            current_song = song;
            if (request_url.query === 'url=true') {
                pm.streamUrl(song.playId, function(url) {
                    response.end(JSON.stringify({ 'name': name, 'artist': artist, 'url': url, 'album': album,'id':id }));
                });
            } 
            else {
                response.end(JSON.stringify({ 'name': name, 'artist': artist, 'album': album,'id':id }));
            }
        }
    } 
    else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found\n");
        response.end();
    }
});

//Read in file and set up users
fs.readFile('Songs.json', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    songs = JSON.parse(data).filter(function(x) {
        return (x.popularity > 70)
    });
    alg.setSongs(songs);
    console.log(songs.length);
    artists = getArtists(songs);
    users = seed.preMadeUsers(songs);
    users.push.apply(users, seed.randomUsers(songs, artists, 1));
    console.log("Seed users created:" + users.length);
    reccomended = getReccomended(5);
    current_song = reccomended.pop();
    server.listen(port);
});

var getArtists = function(songs) {
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

var randomId = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    //check if that id has been generated already (maybe needed?)
    /* this part requires server and backend to be working
    if (text == Other User's ID)
        text = makeid()
    */
    return text;
}

var getReccomended = function(limit){
  var mono = alg.createMonoUser(users.filter(function(x) {
      return (x.real)
  }));
  console.log("Mono User Created");
  var results = alg.KNN(mono, users, 3);
  console.log("Nearest Neighbors Found");
  var reccomended_songs = alg.reccomend(results, mono, songs, limit);
  console.log("Reccomended Songs Found:" + reccomended_songs.length);
  return reccomended_songs
}