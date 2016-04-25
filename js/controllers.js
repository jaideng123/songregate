'use strict';

/* Controllers */
var api_url = 'http://songregate.herokuapp.com/'

var songregateControllers = angular.module('songregateControllers', []);

songregateControllers.controller('WelcomeCtrl', ['$scope',
  function($scope) {
	
  }]);

songregateControllers.controller('MusicCtrl', ['$scope', '$routeParams', '$location',
  function($scope, $routeParams, $location) {
    //just hardcoded for now until server is up
    $scope.currentsong = "22"
	$scope.artist = "Taylor Swift"
	$scope.album = "1989"
	$scope.artURL = "http://s.newsweek.com/sites/www.newsweek.com/files/2014/10/26/image-1989.png"
	$scope.userid = $location.path().split('/')[2] //will be in form ['','music','userid']
  }]);

songregateControllers.controller('StartCtrl', ['$scope', '$routeParams','$http',
  function($scope, $routeParams, $http) {
	//for GUI check purposes artists are hardcoded but will be random from server-side
    $scope.artists = ['Taylor Swift','Kanye West','Keith Urban','Avicii','AWOL Nation']
	
    $scope.user = {}
    $http({
		  method: 'GET',
		  url: api_url+'users/new'
		}).then(function successCallback(response) {
		    $scope.user = response.data
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
		
  }]);
