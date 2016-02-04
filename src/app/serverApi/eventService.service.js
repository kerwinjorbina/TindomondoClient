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
          url: backendlink+'/events.json',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      }
    }

    return {
      getEvent: function(data) {
        var event = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'/api/events/1',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      }
    }
  }

})();