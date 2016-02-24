(function() {
  'use strict';

  angular
    .module('client')
    .controller('giveFeedbackController', giveFeedbackController);
    
  /** @ngInject */
  function giveFeedbackController($scope, $timeout, $state, $rootScope, Facebook, $stateParams, $cookieStore, feedbackService, Notification) {
    var vm = this;

    Facebook.api('/me', function(user) {
      $scope.$apply(function() {
        $rootScope.$broadcast('fbLoginHappened', user);
      });
    });
    
        
    vm.sendFeedback = sendFeedback;
    
    function sendFeedback() {
      var currentdate = new Date();
      var feedbackData = {user_id: $cookieStore.get('user_id'), feedback_description: vm.feedback, date_time: currentdate};
      feedbackService.sendFeedback(feedbackData).then(function() {
        Notification.success('Thank you!');
        $timeout(function() {
          $state.go('myEvents');
        }, 2000);
      });
    }
  }    
})();