(function() {
  'use strict';

  angular
    .module('client')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(backendlink, eventService) {
    var vm = this;
    eventService.getEvents(1).then(function(response) {
		alert(response.data.length);
		response.data.forEach(function(event) {
          vm.orders.push(
            {sport_id: event.sport_id, user_id: event.user_id, location: event.location}
          );
        console.log(response);
        console.log(response);
        console.log(response);
  	});
  }
})();
