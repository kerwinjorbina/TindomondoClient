(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventController', EventController);

  /** @ngInject */
  function EventController($scope, $state, googleAddress) {
    var vm = this;
    vm.activity = "Running";
    vm.eventDate = "12.12.12";
    vm.eventTime = "12.00";
    vm.eventAddress = "Liivi 2";
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
    
     vm.marker = {
      id: 0,
      coords: {
        latitude: 59.43669647920433,
        longitude: 24.754600524902344
      },
      
      options: { draggable: false, visible: true},
      events: {
      }
    };
    
    
   
    
    vm.fillMap = fillMap;
    function fillMap(coords) {
      vm.map.center.latitude = coords.latitude;
      vm.map.center.longitude = coords.longitude;
      vm.marker.coords.latitude = coords.latitude;
      vm.marker.coords.longitude = coords.longitude;
      $scope.$apply();
    }
    
    vm.markers = [];
    vm.markers.push(vm.marker);

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
    
    
    
 

   /* function showPosition(position) {
      var coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      vm.map.center.latitude = coord.lat();
      vm.map.center.longitude = coord.lng();
    }*/
    
   
  }
})();