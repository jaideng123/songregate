'use strict';

/* Controllers */
var api_url = 'http://songregate.herokuapp.com/'

var songregateControllers = angular.module('songregateControllers', []);

songregateControllers.controller('WelcomeCtrl', ['$scope',
  function($scope) {
	
  }]);

songregateControllers.controller('MusicCtrl', ['$scope', '$routeParams', '$location','$http',
  function($scope, $routeParams, $location,$http) {
    $scope.userid = $location.path().split('/')[2] //will be in form ['','music','userid']
    $http({
		  method: 'GET',
		  url: api_url+'song/current?url=true'
		}).then(function successCallback(response) {
		    $scope.current_song = response.data
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	$scope.nextSong = function(){
		$http({
		  method: 'GET',
		  url: api_url+'song/next?url=true'
		}).then(function successCallback(response) {
		    $scope.current_song = response.data
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}
	$scope.pausePlay = function(){
		
	}
	$scope.like = function(){
		$http({
		  method: 'GET',
		  url: api_url+'users/'+$scope.userId+'/likes?song='+current_song.playId
		}).then(function successCallback(response) {
		    $scope.current_song = response.data
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}
	$scope.dislike = function(){
		$http({
		  method: 'GET',
		  url: api_url+'users/'+$scope.userId+'/dislikes?song='+current_song.playId
		}).then(function successCallback(response) {
		    $scope.current_song = response.data
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}
  }]);
songregateControllers.controller('StartCtrl', ['$scope', '$routeParams','$http',
  function($scope, $routeParams, $http) {
	//for GUI check purposes artists are hardcoded but will be random from server-side
    $scope.artists = ['Taylor Swift','Kanye West','Keith Urban','Avicii','AWOL Nation']
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
