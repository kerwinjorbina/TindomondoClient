(function() {
  'use strict';

  angular
    .module('client')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController($scope, $rootScope, $timeout, Facebook, $route) {
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
          $route.reload();
        });
      });
    };

    $rootScope.$on('fbLoginHappened', function(ev, user) {
        vm.user   = user;
        vm.loggedIn = true;
        vm.me();
    });


  }

  angular
    .module('client')
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };

      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      function debounce(func, wait, context) {
        var timer;

        return function debounced() {
          var context = $scope,
            args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }

      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildDelayedToggler(navID) {
        return debounce(function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }, 200);
      }

      function buildToggler(navID) {
        return function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }
      }
    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });

      };
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };
    });



})();
