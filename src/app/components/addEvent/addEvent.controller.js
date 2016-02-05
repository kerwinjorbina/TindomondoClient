(function() {
  'use strict';

  angular
    .module('client')
    .controller('addEventController', addEventController);

  /** @ngInject */
  function addEventController($scope, $state, $rootScope, Facebook, sportService) {
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

    vm.sports = [];
    sportService.getSports().then(function(sports_response){
      sports_response.data.forEach(function(sport) {
        vm.sports.push(
            {id: sport.id, name: sport.name}
        );
      });
      $scope.sports = vm.sports;
    });

    $scope.createEvent= function() {
      //to create the event here
    };
  }
})();

  angular
    .module('client').filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i=min; i<max; i++)
      input.push(i);
    return input;
  };});
