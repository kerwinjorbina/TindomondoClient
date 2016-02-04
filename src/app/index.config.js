(function() {
  'use strict';

  angular
    .module('client')
    .config(config);

  /** @ngInject */
  function config($logProvider, FacebookProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    FacebookProvider.init('221580528187597');

  }

})();
