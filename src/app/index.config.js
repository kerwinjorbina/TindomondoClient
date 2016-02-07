(function() {
  'use strict';

  angular
    .module('client')
    .config(config);

  /** @ngInject */
  function config($logProvider, FacebookProvider, NotificationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    FacebookProvider.init('221580528187597');

    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top'
    });
  }

})();
