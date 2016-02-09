(function() {
  'use strict';

  angular
    .module('client')
    .config(config);

  /** @ngInject */
  function config($logProvider, FacebookProvider, NotificationProvider, $mdThemingProvider) {
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

    var customPrimary = {
      '50': '#fac8bb',
      '100': '#f8b6a3',
      '200': '#f6a38b',
      '300': '#f59073',
      '400': '#f37d5c',
      '500': '#f16A44',
      '600': '#ef572c',
      '700': '#ed4415',
      '800': '#d83c10',
      '900': '#c1360e',
      'A100': '#fcdbd2',
      'A200': '#fdeeea',
      'A400': '#ffffff',
      'A700': '#a92f0d'
    };
    $mdThemingProvider
      .definePalette('customPrimary',
        customPrimary);

    var customAccent = {
      '50': '#23ffd4',
      '100': '#0affcf',
      '200': '#00efc0',
      '300': '#00d6ac',
      '400': '#00bc97',
      '500': '#00a383',
      '600': '#00896f',
      '700': '#00705a',
      '800': '#005646',
      '900': '#003d31',
      'A100': '#3dffd9',
      'A200': '#56ffde',
      'A400': '#70ffe3',
      'A700': '#00231d'
    };
    $mdThemingProvider
      .definePalette('customAccent',
        customAccent);

    var customWarn = {
      '50': '#ffb280',
      '100': '#ffa266',
      '200': '#ff934d',
      '300': '#ff8333',
      '400': '#ff741a',
      '500': '#ff6400',
      '600': '#e65a00',
      '700': '#cc5000',
      '800': '#b34600',
      '900': '#993c00',
      'A100': '#ffc199',
      'A200': '#ffd1b3',
      'A400': '#ffe0cc',
      'A700': '#803200'
    };
    $mdThemingProvider
      .definePalette('customWarn',
        customWarn);

    var customBackground = {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#ffffff',
      '600': '#f2f2f2',
      '700': '#e6e6e6',
      '800': '#d9d9d9',
      '900': '#cccccc',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#bfbfbf'
    };
    $mdThemingProvider
      .definePalette('customBackground',
        customBackground);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn')
      .backgroundPalette('customBackground')
  }

})();
