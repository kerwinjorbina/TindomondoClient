(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventController', EventController);

  /** @ngInject */
  function EventController($scope, $state) {
    var vm = this;
    vm.activity = "Running";
    vm.eventDate = "12.12.12";
    vm.eventTime = "12.00";
    vm.eventAddress = "Liivi 2";
    vm.eventParticipants = "11/22";
    vm.directionsService = new google.maps.DirectionsService();
    var latitude = 0.0; 
    var longitude = 0.0;
    

   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("FHUISHKJS")
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
    vm.map = {
      center: {
        latitude : 1,
        longitude : 1
      },
      bounds: new google.maps.LatLngBounds(),
      zoom: 16,
      options: {
        mapTypeControl: true,
        panControl: true,
        zoomControl: true
      }
    };

    function showPosition(position) {
      
      var coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      vm.map.center.latitude = coord.lat();
      vm.map.center.longitude = coord.lng();
      console.log( vm.map.center.longitude)
      
    }
    
   
  }
})();