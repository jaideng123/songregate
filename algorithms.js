pq = require('js-priority-queue');

//takes in an array of users and a reference(Mono) user
exports.songHash = {};
exports.reccomended = []
exports.reccomend = function(neighbors,user,songs){
	if(Object.keys(exports.songHash).length === 0 && JSON.stringify(exports.songHash) === JSON.stringify({}))
		exports.setSongs(songs);
	//gather potential candidates
	for (var i = 0; i < neighbors.length; ++i) {
		for(key in neighbors[i].taste){
			if(user.taste[key] === undefined)
				user.taste[key] = neighbors[i].taste[key]
		}
	};
	var queue = new pq({ comparator: function(a, b) { return b.score - a.score; }});
	for(key in user.taste){
		var song = exports.songHash[key]
		song.score = user.taste[key] + (song.popularity/1000)
		queue.queue(song);
	}
	var results = []
	for (var i = 0; i < 50; i++) {
		results.push(queue.dequeue())
	};
	return results;
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

exports.setSongs = function(songs){
	exports.songHash = {}
	for (var i = songs.length - 1; i >= 0; i--) {
		exports.songHash[songs[i].playId] = songs[i];
	};
}