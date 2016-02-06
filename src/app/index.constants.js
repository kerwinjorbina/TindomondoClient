/* global moment:false */
(function() {
  'use strict';

  angular
    .module('client')
    .constant('moment', moment)
<<<<<<< Updated upstream
    .constant('backendlink', "http://tindomondo.com:3000/");
    //.constant('backendlink', "http://api.tindomondo.com/");
=======
    //.constant('backendlink', "http://localhost:8081/");
    .constant('backendlink', "http://tindomondo.com:3000/");
>>>>>>> Stashed changes
})();
