var http = require("http");
var fs = require('fs');
var pm = require('./playmusic.js')


var port = Number(process.env.PORT || 3000)
var songs = []

var server = http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   var rand = Math.floor((Math.random() * Number(songs.length)));
   var name = songs[rand].name;
   var artist = songs[rand].artist.name
   pm.streamUrl(songs[rand].playId,function(url){
      response.end(JSON.stringify({'name':name,'artist':artist,'url':url}));
   });
});
fs.readFile('Songs.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  songs = JSON.parse(data);
  server.listen(port);
});
