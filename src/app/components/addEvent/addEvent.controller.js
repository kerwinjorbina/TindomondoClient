(function() {
  'use strict';

  angular
    .module('client')
    .controller('addEventController', addEventController);

  /** @ngInject */
  function addEventController($scope, $state, $rootScope, Facebook) {
    var vm = this;
    vm.date;
    vm.sport;
    vm.participants;
    vm.place;
    vm.user = {};
    vm.directionsService = new google.maps.DirectionsService();
        vm.map = {
      center: {
        latitude : 58.3661916,
        longitude : 26.69020660000001
      },
      bounds: new google.maps.LatLngBounds(),
      zoom: 16,
      options: {
        mapTypeControl: true,
        panControl: true,
        zoomControl: true
      }
    };

    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        vm.me();
      } else {
        $state.go('home');
      }
    });

    vm.me = function() {
      Facebook.api('/me', function(response) {
        $scope.$apply(function() {
          vm.user = response;
          $rootScope.$broadcast('fbLoginHappened', vm.user);
        });
      });
    };

  }
})();
