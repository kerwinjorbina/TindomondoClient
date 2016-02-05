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
          url: backendlink+'events.json',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      },
      getEvent: function(data) {
        var event = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'events/'+data+'.json',
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      },
      createEvent: function(data) {
        console.log(data);
        var event = $q.defer();
        $http({
          method: 'POST',
          url: backendlink+'events',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
        
      }
    }
  }

})();