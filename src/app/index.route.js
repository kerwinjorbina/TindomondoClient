(function() {
  'use strict';

  angular
    .module('client')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('eventDetail', {
        url: '/eventDetail/:id',
        templateUrl: 'app/components/eventDetail/eventDetail.html',
        controller: 'EventController',
        onEnter: ['$state', 'Facebook', function($state, Facebook) {
          Facebook.getLoginStatus(function(response) {
            if (response.status != 'connected') {
              $state.go('home');
            }
          });
        }]
      }).state('addEvent', {
        url: '/addEvent',
        templateUrl: 'app/components/addEvent/addEvent.html',
        controller: 'addEventController',
        controllerAs: 'controller',
        onEnter: ['$state', 'Facebook', function($state, Facebook) {
          Facebook.getLoginStatus(function(response) {
            if (response.status != 'connected') {
              $state.go('home');
            }
          });
        }]
      }).state('eventList', {
        url: '/eventList',
        templateUrl: 'app/components/eventList/eventList.html',
        controller: 'EventListController',
        onEnter: ['$state', 'Facebook', function($state, Facebook) {
          Facebook.getLoginStatus(function(response) {
            if (response.status != 'connected') {
              $state.go('home');
            }
          });
        }]
      }).state('myEvents', {
        url: '/myEvents',
        templateUrl: 'app/components/myEvents/myEvents.html',
        controller: 'myEventsController',
        onEnter: ['$state', 'Facebook', function($state, Facebook) {
          Facebook.getLoginStatus(function(response) {
            if (response.status != 'connected') {
              $state.go('home');
            }
          });
        }]
      })

    $urlRouterProvider.otherwise('/');
  }

})();
