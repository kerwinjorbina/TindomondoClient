(function() {
  'use strict';

  angular
    .module('client')
    .service('sportService', sportService);

  /** @ngInject */
  function sportService($http, $q) {
    return {
      getSport: function(data) {
        var sport = $q.defer();
        $http({
          method: 'GET',
          url: '/api/sport/1',
          data: data
        }).then(function(data) {
          sport.resolve(data);
        });
        return sport.promise;
      }
    }
  }

})();