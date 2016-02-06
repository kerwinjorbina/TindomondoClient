(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventParticipantsController', EventParticipantsController);

  /** @ngInject */
  function EventParticipantsController($scope, $state, $rootScope, Facebook, $stateParams, sportService, eventService, userService, registrationService, $cookieStore, $location) {
    var vm = this;
    vm.loggedIn = false;
    vm.user = {};
    vm.profilePicImage = "";
    vm.facebookReady = true;

    Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });

    eventService.getEvent($stateParams.id).then(function(response){

    });

    vm.participants = []
    registrationService.getParticipantsList($stateParams.id).then(function(response){
      console.log(response);
      response.data.forEach(function(registration) {
        console.log(registration);
        userService.getUser(registration.user_id).then(function(user_response){
          vm.participants.push(
              {name: user_response.data.name, registration_time: registration.created_at} ); 
        });
      });
      $scope.participants = vm.participants;
    });
  }
})();
