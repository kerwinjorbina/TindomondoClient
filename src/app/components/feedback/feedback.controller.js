(function() {
  'use strict';

  angular
    .module('client')
    .controller('giveFeedbackController', giveFeedbackController);
    
  /** @ngInject */
  function giveFeedbackController($scope, $state, $rootScope, Facebook, $stateParams, sportService, eventService, userService, registrationService, $cookieStore, $location) {
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
          Facebook.api('/'+user_response.data.fb_id, function(facebook_data) {
            Facebook.api("/"+user_response.data.fb_id+"/picture?type=large", function (response2) {
              if (response2 && !response2.error) {
                vm.participants.push(
                    {name: user_response.data.name, picture: response2.data.url} ); 
              }
              else{
                vm.participants.push(
                    {name: user_response.data.name, picture: "http://style.anu.edu.au/_anu/4/images/placeholders/person.png"} ); 
              }
            });
          });

        });
      });
      $scope.participants = vm.participants;
    });
  }
})();
