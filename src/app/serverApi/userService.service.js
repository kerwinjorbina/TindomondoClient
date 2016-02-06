(function() {
  'use strict';

  angular
    .module('client')
    .service('userService', userService);

  /** @ngInject */
  function userService($http, $q, backendlink) {
    return {
      getUsers: function(data) {
        var event = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'users.json',
          data: data
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      },
      getUser: function(data) {
        var event = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'users/'+data+'.json',
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      },
      getUserByFbId: function(data) {
        var event = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'users/fbid/'+data,
        }).then(function(data) {
          event.resolve(data);
        });
        return event.promise;
      },
      createUser: function(data) {
        console.log(data);
        var event = $q.defer();
        $http({
          method: 'POST',
          url: backendlink+'users.json',
          data: data
        }).then(function(data) {
          event.resolve(data);
          return data;
        });
        return event.promise;
        
      }
    }
  }

})();