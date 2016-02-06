(function() {
  'use strict';

  angular
    .module('client')
    .controller('EventParticipantsController', EventParticipantsController);

  /** @ngInject */
  function EventParticipantsController($scope, $state, $rootScope, Facebook, sportService, eventService, userService, registrationService, $cookieStore, $location) {
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
/*
    eventService.getEvent($stateParams.id).then(function(response){

    });

    registrationService.getParticipantsList($stateParams.id).then(function(response){

    });
*/
  }
})();
