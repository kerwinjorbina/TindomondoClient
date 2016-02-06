(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventController', EventController);

  /** @ngInject */
  function EventController($scope, $rootScope, $state, googleAddress, Facebook, eventService, $stateParams, sportService, $cookieStore, registrationService) {
    var vm = this;
    vm.eventName = null;
    vm.activity = null;
    vm.eventDate = null;
    vm.eventTime = null;
    vm.eventAddress = null;
    vm.eventParticipants = null;
    vm.registeredParticipants = null;
    vm.joinDisplay = true;
    vm.directionsService = new google.maps.DirectionsService();

    var lat = 0.0;
    var lng = 1.0;

    Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });

    /*var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var myOptions = {
      zoom : 16,
      center : userLatLng,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    }
    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);*/

   /* if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }*/
    var user_id = $cookieStore.get('user_id');

    registrationService.getUserEvents({event_id: $stateParams.id, user_id: user_id}).then(function(response){
      vm.joinDisplay = response.data == "null";
      if(!vm.joinDisplay){
        $("#joinButton").attr('class','unjoinButton');
        $("#joinButton").html('UNJOIN');
      }
      else{
        $("#joinButton").attr('class','joinButton');
        $("#joinButton").html('JOIN');
      }
    });

    $scope.changeButton = function(){

      if(document.getElementById('joinButton').textContent === 'JOIN') 
        document.getElementById('joinButton').textContent = 'UNJOIN'
      else 
        document.getElementById('joinButton').textContent = 'JOIN';

      if ($("#joinButton").attr('class') === 'unjoinButton') {
        $("#joinButton").attr('class','joinButton');
        vm.registeredParticipants -= 1;
        registrationService.unjoinEvent({event_id: $stateParams.id, user_id: user_id});
      }
      else {
        if(vm.registeredParticipants == vm.eventParticipants){
          alert("Number of Participants has reached its limit");
        }
        else{
          vm.registeredParticipants += 1;
          $("#joinButton").attr('class','unjoinButton');
          registrationService.createRegistration({event_id: $stateParams.id, user_id: user_id});          
        }

      }
      $("#registered_participants").html(vm.registeredParticipants);
    };
   /* function showPosition(position) {
      var coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      vm.map.center.latitude = coord.lat();
      vm.map.center.longitude = coord.lng();
    }*/

    eventService.getEvent($stateParams.id).then(function(response){
      console.log(response);
      sportService.getSport(response.data.sport_id).then(function(sport_response){
        vm.activity = sport_response.data.name;
      });
      var datetime = new Date(response.data.start_time);
      vm.eventDate = datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear();
      vm.eventTime = datetime.toLocaleTimeString();
      vm.eventAddress = response.data.location;
      vm.eventParticipants = response.data.registration_limit;
      vm.minParticipants = response.data.registration_min;
      vm.event_id = $stateParams.id;

      registrationService.getEventParticipants($stateParams.id).then(function(registration_response){
        vm.registeredParticipants = registration_response.data.count;
      });

     vm.dep_marker = {
      id: 0,
      coords: {
        latitude: 58.3783078,
        longitude: 26.71467329999996
      },

      options: { draggable: false, visible: true},
      events: {
      }
    };

   vm.dest_marker = {
      id: 1,
      coords: {
        latitude: 58.3664525,
        longitude: 26.713723699999946
      },

      options: { draggable: false, visible: true},
      events: {
      }
    };

    vm.fillMap = fillMap;
    function fillMap(coords) {
      vm.map.center.latitude = coords.latitude;
      vm.map.center.longitude = coords.longitude;
      vm.dep_marker.coords.latitude = coords.latitude;
      vm.dep_marker.coords.longitude = coords.longitude;
      vm.eventDescription;
      $scope.$apply();
    }


    vm.markers = [];
    vm.markers.push(vm.dep_marker);
    vm.markers.push(vm.dest_marker);

    vm.currentPositionCallback = currentPositionCallback;
    function currentPositionCallback(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;

      fillMap(position.coords);

      //not used but let it be
      googleAddress.getAddress(position.coords.latitude, position.coords.longitude).then(function successCallback(response) {
        vm.currentLocation = response.data.results[0].formatted_address;
      });
    }

    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentPositionCallback);
      } else {
        Notification.warning("Your browser doesn't support geolocation");
      }
    }
    getCurrentLocation();


    vm.map = {
      center: {
        latitude : vm.dep_marker.coords.latitude,
        longitude : vm.dep_marker.coords.longitude
      },
      bounds: new google.maps.LatLngBounds(),
      zoom: 13,
      options: {
        mapTypeControl: true,
        panControl: true,
        zoomControl: true
      }
    };

    vm.polylines = [{
      id: 0,
      path: [],
      stroke: {
        color: '#3498db',
        weight: 3
      },
      editable: false,
      draggable: false,
      geodesic: true,
      visible: false,
      icons: [{

        offset: '25px',
        repeat: '50px'
      }]
    }];

      vm.createRouteRequest = createRouteRequest;

          function createRouteRequest() {
            return {
              origin: new google.maps.LatLng(
                vm.dep_marker.coords.latitude,
                vm.dep_marker.coords.longitude
              ),
              destination: new google.maps.LatLng(
                vm.dest_marker.coords.latitude,
                vm.dest_marker.coords.longitude
              ),
              travelMode: google.maps.TravelMode['WALKING'],
              optimizeWaypoints: true
            };
          }

      vm.createPolylineRoute = createPolylineRoute;
          function createPolylineRoute(routeList) {
            var path = [];
            angular.forEach(routeList, function(routeElement) {
              //console.log(routeElement.getNorthEast())
              var pathPoint = {latitude: routeElement.lat(), longitude: routeElement.lng()};
              path.push(pathPoint);
            });
            vm.polylines[0].path = path;
            vm.polylines[0].visible = true;
            $scope.$digest(); //Seems to make map updating faster but is not totally necessary
          }

        googleAddress.getCoordinates(vm.eventAddress).then(function successCallback(coordinates_response) {
          vm.dest_marker.coords.latitude = coordinates_response.data.results[0].geometry.location.lat;
          vm.dest_marker.coords.longitude = coordinates_response.data.results[0].geometry.location.lng;
          vm.directionsService.route(createRouteRequest(), function(response, status) {
          if (status=='OK') {
              createPolylineRoute(response.routes[0].overview_path);
            };
          });
        });

    });

  }
})();
