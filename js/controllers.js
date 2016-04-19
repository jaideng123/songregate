'use strict';

/* Controllers */

var songregateControllers = angular.module('songregateControllers', []);

songregateControllers.controller('WelcomeCtrl', ['$scope',
  function($scope) {
    
  }]);

songregateControllers.controller('MusicCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    
  }]);

songregateControllers.controller('StartCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.artists = []
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
