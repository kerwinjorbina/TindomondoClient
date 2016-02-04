(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventListController', EventListController);

  /** @ngInject */
  function EventListController($scope, eventService) {
    var vm = this;
    vm.events = [];
    vm.loggedIn = false;
    vm.user = {};

    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        vm.loggedIn = true;
        vm.me();
      } else {
        $state.go('home');
      }
    });

    vm.me = function() {
      Facebook.api('/me', function(response) {

        $scope.$apply(function() {
          vm.user = response;
        });

      });
    };

    eventService.getEvents(1).then(function(response) {
		response.data.forEach(function(event) {
      var datetime = new Date(event.start_time);
      datetime = (datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear() + " " + datetime.toLocaleTimeString());
      vm.events.push(
          {sport_name: event.sport_id, user_name: event.user_id, location: event.location, time: datetime}
        );
      });
      $scope.events = vm.events;
  	});
  }
})();
