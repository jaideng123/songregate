var http = require("http");
var url = require('url');
var fs = require('fs');
var pm = require('./playmusic.js')
var alg = require('./algorithms.js')
var seed = require('./seed.js')


var port = Number(process.env.PORT || 3000)
var songs = []
var reccomended = []
var current_song = {}
var users = []

var server = http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    var request_url = url.parse(request.url);
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
            response.end(JSON.stringify(users.filter(function(x) {
                return (x.name === user_id)
            })));
        }
    }
    //song portion of the API
    else if (request_url.pathname.split('/')[1] === 'song') {
        if (request_url.pathname.split('/')[2] === 'current') {
            var song = current_song;
            var name = song.name;
            var artist = song.artist.name
            var album = song.album;
            if(request_url.query === '?url=true'){
              pm.streamUrl(song.playId, function(url) {
                  response.end(JSON.stringify({ 'name': name, 'artist': artist, 'url': url, 'album':album }));
              });
            }
            else{
              response.end(JSON.stringify({ 'name': name, 'artist': artist, 'album':album }));
            }
        }
        else if (request_url.pathname.split('/')[2] === 'next') {
            var song = reccomended.pop();
            var name = song.name;
            var artist = song.artist.name
            var current_song = song;
            if(request_url.query === '?url=true'){
              pm.streamUrl(song.playId, function(url) {
                  response.end(JSON.stringify({ 'name': name, 'artist': artist, 'url': url, 'album':album }));
              });
            }
            else{
              response.end(JSON.stringify({ 'name': name, 'artist': artist, 'album':album }));
            }
        }
    } else {
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
        return (x.popularity > 70) });
    alg.setSongs(songs);
    console.log(songs.length);
    artists = getArtists(songs);
    users = seed.preMadeUsers(songs);
    users.push.apply(users, seed.randomUsers(songs, artists, 1));
    console.log("Seed users created:" + users.length);
    var mono = alg.createMonoUser(users.filter(function(x) {
        return (x.real) }));
    console.log("Mono User Created");
    var results = alg.KNN(mono, users, 3);
    console.log("Nearest Neighbors Found");
    reccomended = alg.reccomend(results, mono, songs, 20);
    console.log("Reccomended Songs Found:" + reccomended.length);
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
