(function() {
  'use strict';

  angular
    .module('client')
    .controller('myEventsController', myEventsController);

  /** @ngInject */
  function myEventsController($scope, $rootScope, eventService, sportService, Facebook, $cookieStore) {
    var vm = this;
    vm.events = [];

    Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });

    eventService.getEvents().then(function(response) {
      var user_id = $cookieStore.get('user_id');
      //alert(user_id);
      
      var sports = [];
      sportService.getSports().then(function(sports_response){
        sports_response.data.forEach(function(sport) {
          sports[sport.id] = sport.name;
        });
        response.data.forEach(function(event) {
          var datetime = new Date(event.start_time);
          datetime = (datetime.getDate() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getFullYear() + " " + datetime.toLocaleTimeString());
          
          if (event.user_id === user_id) 
          vm.events.push(
              {event_id: event.id, sport_name: sports[event.sport_id], user_name: event.user_id, location: event.location, time: datetime}
          );
        });
      });
      $scope.events = vm.events;
  	});
  }
})();