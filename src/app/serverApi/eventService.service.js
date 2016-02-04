(function() {
  'use strict';

  angular
    .module('client')
    .service('eventService', eventService);

  /** @ngInject */
  function eventService($http, $q, backendlink) {
    return {
      getEvents: function(data) {
        var event = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'/api/events',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      }
    }
  }

})();