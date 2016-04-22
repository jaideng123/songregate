'use strict';

/* Controllers */

var songregateControllers = angular.module('songregateControllers', []);

songregateControllers.controller('WelcomeCtrl', ['$scope',
  function($scope) {
	
  }]);

songregateControllers.controller('MusicCtrl', ['$scope', '$routeParams', $location,
  function($scope, $routeParams, $location) {
    //just hardcoded for now until server is up
    $scope.currentsong = "22"
	$scope.artist = "Taylor Swift"
	$scope.album = "1989"
	$scope.artURL = "http://s.newsweek.com/sites/www.newsweek.com/files/2014/10/26/image-1989.png"
	$scope.userid = $location.path().split('/')[2] //will be in form ['','music','userid']
  }]);

songregateControllers.controller('StartCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	//for GUI check purposes artists are hardcoded but will be random from server-side
    $scope.artists = ['Taylor Swift','Kanye West','Keith Urban','Avicii','AWOL Nation']
	
    $scope.userID = makeid()
	  
    //this whole function will be server-side once we get it up and running
	function makeid()
	{
	   var text = "";
	   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	  
	   for( var i=0; i < 5; i++ )
		   text += possible.charAt(Math.floor(Math.random() * possible.length));
	  
	   //check if that id has been generated already (maybe needed?)
	   /* this part requires server and backend to be working
	   if (text == Other User's ID)
	   	   text = makeid()
	   */
	   return text;
	}
		
  }]);
