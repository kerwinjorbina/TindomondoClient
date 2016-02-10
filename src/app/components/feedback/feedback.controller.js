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
      var hours = (currentdate.getHours()<10?'0':'') + currentdate.getHours();
      var minutes = (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
      var seconds = (currentdate.getSeconds()<10?'0':'') + currentdate.getSeconds();
      var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
      var feedbackData = {user_id: $cookieStore.get('user_id'), feedback: vm.feedback, date_time: datetime};
      
      feedbackService.sendFeedback(feedbackData).then(function() {
        Notification.success('Thank you!');
        $timeout(function() {
          $state.go('myEvents');
        }, 2000);
      });
    }
  }    
})();