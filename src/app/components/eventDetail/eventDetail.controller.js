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



    /*Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });*/

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
        $scope.join  = false;
        $scope.unjoin  = true; 
      }
      else{
        $scope.join  = true;
        $scope.unjoin  = false; 
      }
    });
    
    $scope.joinEvent = function() {
        if(vm.registeredParticipants == vm.eventParticipants){
          alert("Number of Participants has reached its limit");
          $scope.join  = true;
          $scope.unjoin  = false; 
        }
        else{
          vm.registeredParticipants += 1;
          registrationService.createRegistration({event_id: $stateParams.id, user_id: user_id});
        };
        $("#registered_participants").html(vm.registeredParticipants);
    }
    
    $scope.unJoinEvent = function() {
      vm.registeredParticipants -= 1;
      registrationService.unjoinEvent({event_id: $stateParams.id, user_id: user_id});
      $("#registered_participants").html(vm.registeredParticipants);
    }



    eventService.getEvent($stateParams.id).then(function(response){
      sportService.getSport(response.data.sport_id).then(function(sport_response){
        vm.activity = sport_response.data.name;
      });
      var datetime = new Date(response.data.start_time);
      vm.eventDate = datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear();
      vm.eventTime = datetime.toLocaleTimeString();
      vm.eventAddress = response.data.location;
      vm.eventParticipants = response.data.registration_limit;
      vm.minParticipants = response.data.registration_min;
      vm.eventDescription = response.data.description;
      vm.event_id = $stateParams.id;
      
      
      
      registrationService.getEventParticipants($stateParams.id).then(function(registration_response){
        vm.registeredParticipants = registration_response.data.count;
      });
      
      
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      error('Geo Location is not supported');
    }
    
    
    function success(position) {
          vm.dep_marker = {
            id: 0,
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
      
            },
      
            options: { draggable: false, visible: true},
            events: {
            }
          };
          
      vm.map = {
          center: {
            latitude : vm.dep_marker.coords.latitude,
            longitude : vm.dep_marker.coords.longitude
          },
          bounds: new google.maps.LatLngBounds(),
          zoom: 12,
          options: {
            mapTypeControl: true,
            panControl: true,
            zoomControl: true
          }
      };
      
      vm.markers = [];
      vm.markers.push(vm.dep_marker);
      
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
        
      vm.markers.push(vm.dest_marker);
    }
    
    function error(err) {
      
        vm.map = {
          center: {
            latitude : vm.dep_marker.coords.latitude,
            longitude : vm.dep_marker.coords.longitude
          },
          bounds: new google.maps.LatLngBounds(),
          zoom: 12,
          options: {
            mapTypeControl: true,
            panControl: true,
            zoomControl: true
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
      
         
      googleAddress.getCoordinates(vm.eventAddress).then(function successCallback(coordinates_response) {
          vm.dest_marker.coords.latitude = coordinates_response.data.results[0].geometry.location.lat;
          vm.dest_marker.coords.longitude = coordinates_response.data.results[0].geometry.location.lng;
      });
        
      vm.markers.push(vm.dest_marker);
    
    }
    });

  }
})();
