(function() {
  'use strict';

  angular
    .module('client')
    .service('eventService', eventService);

  /** @ngInject */
  function eventService($http, $q) {
    alert("here 112");
    return {
      getEvents: function(data) {
        alert("here 113");
        var event = $q.defer();
        $http({
          method: 'GET',
          url: '/api/events',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      }
    }
  }

})();