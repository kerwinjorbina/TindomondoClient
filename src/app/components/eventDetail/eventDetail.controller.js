(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventController', EventController);

  /** @ngInject */
  function EventController($scope, $state, googleAddress) {
    var vm = this;
    vm.eventName = "Event 1";
    vm.activity = "Football";
    vm.eventDate = "04.02.2016";
    vm.eventTime = "6:00 PM";
    vm.eventAddress = "Tartu Gym, Tartu Estonia";
    vm.eventParticipants = "11/22";
    vm.directionsService = new google.maps.DirectionsService();
    
    var lat = 0.0;
    var lng = 1.0;
  
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
          
        vm.directionsService.route(createRouteRequest(), function(response, status) {
          if (status=='OK') {
            createPolylineRoute(response.routes[0].overview_path);
          };
        })
        

   /* function showPosition(position) {
      var coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      vm.map.center.latitude = coord.lat();
      vm.map.center.longitude = coord.lng();
    }*/
    
   
  }
})();