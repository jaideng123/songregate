'use strict';
$(document).foundation()

/* App Module */

var songregateApp = angular.module('songregateApp', [
  'ngRoute',
  'songregateControllers'
  //'songregateServices'
]);

songregateApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/welcome', {
        templateUrl: 'partials/welcome.html',
        controller: 'WelcomeCtrl'
      }).
      when('/getting-started/:userId', {
        templateUrl: 'partials/getting-started.html',
        controller: 'StartCtrl'
      }).
      when('/music/:userId', {
        templateUrl: 'partials/music.html',
        controller: 'MusicCtrl'
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);