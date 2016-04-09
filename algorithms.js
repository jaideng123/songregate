pq = require('js-priority-queue');

//takes in an array of users and a reference(Mono) user
exports.reccomended = []
exports.reccomend = function(results,user,songs){
	//gather potential candidates
	for (var i = results.length - 1; i >= 0; i--) {
		for(key in results[i]){

		}
	};
	//sort by score + normalize popularity
}

exports.KNN = function(user, users, limit){
	var queue = new pq({ comparator: function(a, b) { return a.dist - b.dist; }});
	console.log(user);
	for (var i = users.length - 1; i >= 0; i--) {
		users[i].dist = exports.distance(user.taste,users[i].taste);
		queue.queue(users[i]);
	};
	var results = []
	for (var i = 0; i < limit; i++) {
		results.push(queue.dequeue());
	};
	return results;
}

//taken and modified with love from https://github.com/axiomzen/Alike/blob/master/lib/util.js
exports.distance = function(p1, p2, opts) {
    var attr, dist, distance, val, x, y;
    dist = {
      distance: 0,
      details: {}
    };
    for (attr in p1) {
      val = p1[attr];
      x = val;
      y = p2[attr] | 0;
      if(p2[attr] === undefined)
      	continue;
      if ((opts != null ? opts.stdv : void 0) && Object.getOwnPropertyNames(opts.stdv).length > 0) {
        x /= opts.stdv[attr];
        y /= opts.stdv[attr];
      }
      if ((opts != null ? opts.weights : void 0) && Object.getOwnPropertyNames(opts.weights).length > 0) {
        x *= opts.weights[attr];
        y *= opts.weights[attr];
      }
      distance = Math.pow(x - y, 2);
      dist.details[attr] = distance;
      dist.distance += distance;
    }
    if (opts != null ? opts.debug : void 0) {
      return dist;
    } else {
      if(dist.distance === 0)
      	return Infinity;
      return dist.distance;
    }
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
	user.real = real;
	for (var i = songs.length - 1; i >= 0; i--) {
		if(likes.indexOf(songs[i].artist.name) !== -1)
			user.taste[songs[i].playId] = 1;
		if(dislikes.indexOf(songs[i].artist.name) !== -1)
			user.taste[songs[i].playId] = -1;
	};
	return user
}