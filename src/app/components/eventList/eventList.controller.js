(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventListController', EventListController);

  /** @ngInject */
  function EventListController(backendlink, eventService) {
    var vm = this;
    vm.events = [];
    eventService.getEvents(1).then(function(response) {
		response.data.forEach(function(event) {
          vm.events.push(
            {sport_id: event.sport_id, user_id: event.user_id, location: event.location}
          );
        });
  	});
  }
})();
