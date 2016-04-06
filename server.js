var http = require("http");
var fs = require('fs');

var counter = 0
var songs = []
fs.readFile('Songs.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  songs = JSON.parse(data);
  console.log("finished parsing")
});
var server = http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   var rand = Math.floor((Math.random() * Number(songs.length))); 
   // Send the response body as "Hello World"
   response.end(JSON.stringify({'name':songs[rand].name,'artist':songs[rand]['artists'][0].name}));
});
var port = Number(process.env.PORT || 3000)

server.listen(port);

// Console will print the message
