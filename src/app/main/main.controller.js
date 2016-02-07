(function() {
  'use strict';

  angular
    .module('client')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $rootScope, $timeout, Facebook, $http, $location, userService, $cookieStore) {
    var vm = this;

    // Define user empty data :/
    vm.user = {};

    // Defining user logged status
    vm.logged = false;
    vm.buttonDisabled = false;


    /**
     * Watch for Facebook to be ready.
     * There's also the event that could be used
     */
    $scope.$watch(
      function() {
        return Facebook.isReady();
      },
      function(newVal) {
        if (newVal)
          vm.facebookReady = true;
      }
    );

    var userIsConnected = false;

    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        userIsConnected = true;
        vm.logged = true;
        vm.me();
        $location.path('/eventList');
      }
    });

    /**
     * IntentLogin
     */
    vm.IntentLogin = function() {
      console.log("Before: ", vm.buttonDisabled);
      vm.buttonDisabled = true;
      console.log("After: ", vm.buttonDisabled);
      console.log("Login started!");
      if(!userIsConnected) {
        vm.login();
      }
    };

    /**
     * Login
     */
    vm.login = function() {
      Facebook.login(function(response) {

        if (response.status == 'connected') {
          vm.logged = true;
          vm.me();
        } else {
          vm.buttonDisabled = false;
        }

      }, {scope: 'email,public_profile'});
    };

    /**
     * me
     */
    vm.me = function() {
      Facebook.api('/me', function(response) {
        /**
         * Using $scope.$apply since this happens outside angular framework.
         */
        userService.createUser({name: response.name, fb_id: response.id});
        userService.getUserByFbId(response.id).then(function(response){
          $cookieStore.put('user_id',response.data.id);
        });
        $scope.$apply(function() {
          vm.user = response;
          $rootScope.$broadcast('fbLoginHappened', vm.user);
          $location.path('/eventList');
        });

      });
    };

    /**
     * Logout
     */
    vm.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          vm.user   = {};
          vm.logged = false;
          userIsConnected = false;
        });
      });
    };

    $rootScope.$on('logOutHappened', function() {
      vm.user   = {};
      vm.logged = false;
      userIsConnected = false;
      vm.buttonDisabled = false;
    });

  }
})();
