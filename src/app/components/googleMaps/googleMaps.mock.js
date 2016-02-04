window.google = {
  maps: {
    LatLng: function(lat, lng) {
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng)
      };
    },
    LatLngBounds: function(ne, sw) {
      return {};
    },
    DirectionsService: function() {
      return {
        route: function (request, callback) {
          return callback();
        }
      };
    },
    TravelMode: {
      DRIVING: 'DRIVING'
    }
  }
};