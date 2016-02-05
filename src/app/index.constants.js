/* global moment:false */
(function() {
  'use strict';

  angular
    .module('client')
    .constant('moment', moment)
    .constant('backendlink', "http://localhost:8081/");
    //.constant('backendlink', "http://api.tindomondo.com/");
})();
