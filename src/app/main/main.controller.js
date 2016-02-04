(function() {
  'use strict';

  angular
    .module('client')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, Facebook) {
    var vm = this;

    // Define user empty data :/
    vm.user = {};

    // Defining user logged status
    vm.logged = false;

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
      }
    });

    /**
     * IntentLogin
     */
    vm.IntentLogin = function() {
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
        }

      });
    };

    /**
     * me
     */
    vm.me = function() {
      Facebook.api('/me', function(response) {
        /**
         * Using $scope.$apply since this happens outside angular framework.
         */
        $scope.$apply(function() {
          vm.user = response;
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
        });
      });
    };

    /**
     * Taking approach of Events :D
     */
    /*$scope.$on('Facebook:statusChange', function(ev, data) {
     console.log('Status: ', data);
     if (data.status == 'connected') {
     $scope.$apply(function() {
     vm.salutation = true;
     vm.byebye     = false;
     });
     } else {
     $scope.$apply(function() {
     vm.salutation = false;
     vm.byebye     = true;

     // Dismiss byebye message after two seconds
     $timeout(function() {
     vm.byebye = false;
     }, 2000)
     });
     }


     });*/
  }
})();
