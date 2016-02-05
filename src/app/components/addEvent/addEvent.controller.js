(function() {
  'use strict';

  angular
    .module('client')
    .controller('addEventController', addEventController);

  /** @ngInject */
  function addEventController($scope, $state, sportService) {
    var vm = this;
    vm,
    vm.date;
    vm.sport;
    vm.participants;
    vm.place;
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
      alert("submitted data");
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