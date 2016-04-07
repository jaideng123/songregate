var PlayMusic = require('playmusic');
var pm = new PlayMusic();

exports.streamUrl = function(id, callback){
	pm.init({email: process.env.PLAY_EMAIL, password: process.env.PLAY_PASS}, function(err) {
	    if(err) console.error(err);
		return pm.getStreamUrl(id, function(err,url){
			callback(url); 
		});
	});
}