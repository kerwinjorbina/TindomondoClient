(function() {
  'use strict';

  angular
    .module('client')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController($scope, Facebook) {
    var vm = this;
    vm.loggedIn = false;
    vm.user = {};

    $scope.$watch(
      function() {
        return Facebook.isReady();
      },
      function(newVal) {
        if (newVal)
          vm.facebookReady = true;
      }
    );

    Facebook.getLoginStatus(function(response) {
      console.log(response);
      if (response.status == 'connected') {
        vm.loggedIn = true;
        vm.me();
      }
    });

    vm.me = function() {
      Facebook.api('/me', function(response) {
        /**
         * Using $scope.$apply since this happens outside angular framework.
         */
        $scope.$apply(function() {
          vm.user = response;
          console.log(vm.user.name);
        });

      });
    };


  }
})();
