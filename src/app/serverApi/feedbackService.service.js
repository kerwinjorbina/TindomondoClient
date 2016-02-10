(function() {
  'use strict';

  angular
    .module('client')
    .service('feedbackService', feedbackService);

  function feedbackService($http, $q, backendlink) {
    return {
      getEvents: function(data) {
        var event = $q.defer();
        $http({
          method: 'POST',
          url: backendlink+'feedbacks.json',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      }
    }
  }
})();