(function() {
  'use strict';

  angular
    .module('client')
    .controller('addEventController', addEventController);

  /** @ngInject */
  function addEventController($scope, $state, $rootScope, Facebook, sportService, eventService) {
    var vm = this;
    vm.date;
    vm.sport;
    vm.participants;
    vm.place;
    $scope.eventData = {};

    Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });

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

    vm.createEvent = createEvent;

    function createEvent() {
      var start_date = new Date(vm.date);
      var start_time = new Date(vm.time);
      start_time = start_time.toTimeString();
      start_time = (start_time.split(" "))[0];
      var start = start_date.getFullYear() + "-" + (start_date.getMonth() + 1) + "-" + start_date.getDate() + " " + start_time;

      eventService.createEvent({sport_id: vm.sport, start_time: start, duration: 2, registration_min: vm.registration_min, registration_limit: vm.registration_limit, location: vm.location});
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
