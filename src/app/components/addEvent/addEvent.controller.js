(function() {
  'use strict';

  angular
    .module('client')
    .controller('addEventController', addEventController);

  /** @ngInject */
  function addEventController($scope, $state, $rootScope, Facebook, sportService, eventService, googleAddress) {
    var vm = this;
    vm.date;
    vm.sport;
    vm.participants;
    vm.place;
    vm.eventAddress;

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
      eventService.createEvent("test").then(function(){
        alert("here 222");
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
