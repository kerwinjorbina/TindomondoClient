(function() {
  'use strict';

  angular
    .module('client')
    .service('googleAddress', googleAddress);

  /** @ngInject */
  function googleAddress($http, $q) {
    return {
      getAddress: function(latitude, longitude) {
        var address = $q.defer();
        $http({
          method: 'GET',
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude +','+ longitude
        }).then(function(data) {
          address.resolve(data);
        }, function(err) {
          address.reject(err);
        });
        return address.promise;
      }
    }
  }

})();