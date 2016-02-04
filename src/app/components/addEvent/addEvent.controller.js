(function() {
  'use strict';

  angular
    .module('client')
    .controller('addEventController', addEventController);

  /** @ngInject */
  function addEventController($scope, $state) {
    var vm = this;
    vm.date;
    vm.sport;
    vm.participants;
    vm.place;
    vm.directionsService = new google.maps.DirectionsService();

  }
})();