(function() {
  'use strict';

  angular
    .module('client')
    .controller('myEventsController', myEventsController);

  /** @ngInject */
  function myEventsController($scope, $rootScope, eventService, sportService, Facebook, $cookieStore, registrationService) {
    var vm = this;
    vm.events = [];
    
    Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });
    
    var user_id = $cookieStore.get('user_id');
    registrationService.getUserRegistrations(user_id).then(function(response) {
      var sports = [];
      sportService.getSports().then(function(sports_response){
        sports_response.data.forEach(function(sport) {
          sports[sport.id] = sport.name;
        });
      response.data.forEach(function(event) {
        eventService.getEvent(event.event_id).then(function(event_response){
        var datetime = new Date(event_response.data.start_time);
          datetime = (datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear() + " " + datetime.toLocaleTimeString());
          vm.events.push(
              {event_id: event.event_id, sport_name: sports[event_response.data.sport_id], user_name: event_response.data.user_id, location: event_response.data.location, time: datetime} ); 
        });
      });
      console.log(vm.events);
      $scope.events = vm.events;
  	}); 
  });
}
})();