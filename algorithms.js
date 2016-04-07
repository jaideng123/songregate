knn = require('alike');

exports.runKNN = function(user, users, limit){
	//var objectKey = function(o) {console.log(o);return o.taste}
	options = {
		k: limit | 3,
		debug: true
	}
	return knn(user, users, options);
}

//FORGE THE MONOUSER
exports.createMonoUser = function(users){
	var user = {};
	user.taste = {};
	user.name = "MONOUSER";
	user.real = false;
	var allvotes = {}
	for (var i = users.length - 1; i >= 0; i--) {
		for (var key in users[i].taste) {
		  if (users[i].taste.hasOwnProperty(key)) {
		  	if (!allvotes[key]){
		  		allvotes[key] = {'upvotes':0,'downvotes':0};
		  	}
		    if(users[i].taste[key] === 1)
		    	allvotes[key].upvotes += 1 
		    if(users[i].taste[key] === -1)
		    	allvotes[key].downvotes += 1 
		  }
		}
	}
	for (var key in allvotes) {
		  if (allvotes.hasOwnProperty(key)) {
		  		var up = allvotes[key].upvotes
		  		var down = allvotes[key].downvotes
		  		var total = up + down
		  		user.taste[key] = ((up/total)-(down/total))
		  }
	}
	return user
}

var psuedocount = 0;
//pass in array of liked and disliked artists (as strings)
//creates user that likes/dislikes those things
exports.createSeedUser = function(likes, dislikes, songs, real){
	var user = {};
	user.taste = {};
	user.name = "SEEDUSER" + psuedocount;
	psuedocount += 1;
	user.real = real | false;
	for (var i = songs.length - 1; i >= 0; i--) {
		if(likes.indexOf(songs[i].artist.name) !== -1)
			user.taste[songs[i].playId] = 1;
		if(dislikes.indexOf(songs[i].artist.name) !== -1)
			user.taste[songs[i].playId] = -1;
	};
	return user
}