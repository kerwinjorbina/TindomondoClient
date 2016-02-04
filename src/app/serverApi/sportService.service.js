(function() {
  'use strict';

  angular
    .module('client')
    .service('sportService', sportService);

  /** @ngInject */
  function sportService($http, $q, backendlink) {
    return {
      getSports: function(data) {
        var sport = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'/sports.json',
          data: data
        }).then(function(data) {
          sport.resolve(data);
        });
        return sport.promise;
      },
      getSport: function(data) {
        alert(data);
        var sport = $q.defer();
        $http({
          method: 'GET',
          url: backendlink+'/sports/'+id+'.json',
          data: data
        }).then(function(data) {
          sport.resolve(data);
        });
        return sport.promise;
      }
    }
  }

})();