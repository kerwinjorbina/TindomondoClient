(function() {
  'use strict';

  angular
    .module('client')
    .service('registrationService', registrationService);

  /** @ngInject */
  function registrationService($http, $q, backendlink) {
    return {
      getRegistrations: function(data) {
        var registration = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'registrations.json',
          data: data
        }).then(function(data) {
          registration.resolve(data);
        });
        return registration.promise;
      },
      getRegistrationByEvent: function(data) {
        var registration = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'registrations/'+data+'.json',
        }).then(function(data) {
          registration.resolve(data);
        });
        return registration.promise;
      },
      createRegistration: function(data) {
        console.log(data);
        var registration = $q.defer();
        $http({
          method: 'POST',
          url: backendlink+'registrations.json',
          data: data
        }).then(function(data) {
          registration.resolve(data);
        });
        return registration.promise;
      },
      unjoinEvent: function(data) {
        console.log(data);
        var registration = $q.defer();
        $http({
          method: 'POST',
          url: backendlink+'registrations/unjoin',
          data: data
        }).then(function(data) {
          registration.resolve(data);
        });
        return registration.promise;
      },
      getUserRegistrations: function(data) {
        console.log(data);
        var registration = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'registrations/userevents?user_id='+data,
        }).then(function(data) {
          registration.resolve(data);
        });
        return registration.promise;
      },
      getUserEvents: function(data) {
        console.log(data);
        var registration = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'registrations/usereventid?user_id='+data.user_id+'&event_id='+data.event_id,
          data: data
        }).then(function(data) {
          registration.resolve(data);
        });
        return registration.promise;
      },
      getEventParticipants: function(data) {
        console.log(data);
        var registration = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'registrations/eventparticipants?event_id='+data,
          data: data
        }).then(function(data) {
          registration.resolve(data);
        });
        return registration.promise;
      }
    }
  }
})();