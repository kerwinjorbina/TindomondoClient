(function() {
  'use strict';

  angular
    .module('client')
    .controller('addEventController', addEventController);

  /** @ngInject */
  function addEventController($scope, $timeout, $state, $rootScope, Facebook, sportService, eventService, googleAddress, $cookieStore, $location, Notification) {
    var vm = this;
    vm.time = null;
    vm.minute = null;
    vm.sport = {};
    vm.participants;
    vm.place;
    $scope.eventData = {};
    vm.eventAddress = "Choose location on map";


    Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });

    vm.directionsService = new google.maps.DirectionsService();

    vm.markers = [];
    vm.markers.push(vm.marker);

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
        zoomControl: true,
        clickable: true
      },
      events: {
        click: function (mapModel, eventName, originalEventArgs) {
                vm.markers = [];
                var lat = originalEventArgs[0].latLng.lat();
                var lng = originalEventArgs[0].latLng.lng();
                var marker = {
                    id: 1,
                    coords: {
                        latitude: lat,
                        longitude: lng
                    }
                };
                vm.markers.push(marker);
                //vm.map.center.latitude = lat;
                //vm.map.center.longitude = lng;
                //console.log($scope.map.markers);
                googleAddress.getAddress(lat, lng).then(function successCallback(response) {
                  vm.eventAddress = response.data.results[0].formatted_address;
                });
                $scope.$digest();
            }
      }
    };

    sportService.getSports().then(function(sports_response){
      vm.sports = [];
      sports_response.data.forEach(function(sport) {
        vm.sports.push(
            {id: sport.id, name: sport.name}
        );
      });
    });

    function convertTime() {

    }

    vm.createEvent = createEvent;

    function createEvent() {
      var start_date = new Date(vm.date);
      var start_time = new Date(vm.time);
      start_time = start_time.toTimeString();
      start_time = (start_time.split(" "))[0];
      var start = start_date.getFullYear() + "-" + (start_date.getMonth() + 1) + "-" + start_date.getDate() + " " + start_time;

      var eventData = {user_id: $cookieStore.get('user_id'), sport_id: vm.sport, start_time: start, duration: 2,
        registration_min: vm.registration_min, registration_limit: vm.registration_limit, location: vm.eventAddress, description: vm.description};
      console.log("Event data: ", eventData);
      eventService.createEvent(eventData).then(function() {
        Notification.success('Event was created.');
        $timeout(function() {
          $state.go('myEvents');
        }, 2000);
      });
    };



    vm.marker = {
          id: 0,
          coords: {
            latitude: 58.3661916,
            longitude: 26.69020660000001
          },
          options: { draggable: false, visible: true},
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
