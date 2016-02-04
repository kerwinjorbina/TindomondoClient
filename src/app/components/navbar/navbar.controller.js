(function() {
  'use strict';

  angular
    .module('client')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController($scope, $rootScope, $timeout, Facebook) {
    var vm = this;
    vm.loggedIn = false;
    vm.user = {};
    vm.profilePicImage = "";
    vm.facebookReady = true;

    vm.me = function() {
      Facebook.api('/me', function(response) {
        Facebook.api("/me/picture?type=large",
          function (response2) {
            if (response2 && !response2.error) {
              vm.profilePicImage = response2.data.url;
            }
          }
        );
        /**
         * Using $scope.$apply since this happens outside angular framework.
         */
        $scope.$apply(function() {
          vm.user = response;
        });

      });
    };

    vm.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          vm.user   = {};
          vm.loggedIn = false;
          vm.profilePicImage = "";
          $rootScope.$broadcast('logOutHappened');
        });
      });
    };

    $rootScope.$on('fbLoginHappened', function(ev, user) {
        vm.user   = user;
        vm.loggedIn = true;
        vm.me();
    });


  }
})();
