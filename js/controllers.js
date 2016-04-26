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
songregateControllers.controller('StartCtrl', ['$scope', '$routeParams','$http','$location',
  function($scope, $routeParams, $http, $location) {
	//for GUI check purposes artists are hardcoded but will be random from server-side
    $http.get('artists.json')
       .then(function(res){
          var artists = res.data.artists;
          $scope.selected_artists = []
          for (var i = 4; i >= 0; i--) {
          	var randIndex = Math.floor((Math.random() * Number(artists.length)));
          	$scope.selected_artists.push({'name':artists[randIndex],'score':0});
          }
        });
    $scope.likeArtist = function(artist){
    	if(artist.score === 1)
    		artist.score = 0;
    	else
    		artist.score = 1;
    	return artist;
    }
    $scope.dislikeArtist = function(artist){
    	if(artist.score === -1)
    		artist.score = 0;
    	else
    		artist.score = -1;
    	return artist;
    }
    $http({
		  method: 'GET',
		  url: api_url+'users/new'
		}).then(function successCallback(response) {
		    $scope.user = response.data
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	$scope.continue = function(){
		for (var i = $scope.selected_artists.length - 1; i >= 0; i--) {
			if($scope.selected_artists[i].score === 1){
				$http({
				  method: 'GET',
				  url: api_url+'users/'+$scope.user.name+'/likes'+$scope.selected_artists[i].name.replace(' ','+')
				}).then(function successCallback(response) {
				    $scope.user = response.data
				  }, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
			}
			else if($scope.selected_artists[i].score === -1){
				$http({
				  method: 'GET',
				  url: api_url+'users/'+$scope.user.name+'/dislikes?artist='+$scope.selected_artists[i].name.replace(' ','+')
				}).then(function successCallback(response) {
				    $scope.user = response.data
				  }, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
			}
		}
		$location.path( 'music/'+$scope.user.name );
	}
		
  }]);
