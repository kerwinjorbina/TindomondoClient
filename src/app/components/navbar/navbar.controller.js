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

    vm.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          vm.user   = {};
          vm.loggedIn = false;
          $rootScope.$broadcast('logOutHappened');
        });
      });
    };

    $scope.$on('Facebook:statusChange', function(ev, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function() {
          vm.me();
        });
      } else {
        $scope.$apply(function() {
          //vm.salutation = false;
          //vm.byebye     = true;
          //vm.logout();
          // Dismiss byebye message after two seconds
          $timeout(function() {
            //vm.byebye = false;
            //vm.logout();
          }, 2000)
        });
      }


    });

    $rootScope.$on('fbLoginHappened', function(ev, user) {
      console.log("User: ",user);

        vm.user   = user;
        vm.loggedIn = true;
        //$scope.$digest();
    });


  }
})();
