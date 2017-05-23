(function () {
    'use strict';
    angular.module('starter')
      .constant('AppConfig', AppConfig())

    function AppConfig() {
        return {
            app            : {
                name : '',
            },
            facebookAppId  : '',
            parse          : {
               appId : 'APPLICATION_ID',
              server: 'https://akshaychauhan.herokuapp.com/parse'
              },
            devHeight :   window.innerHeight,
            devWidth  :   window.innerWidth

        };
    }
})();
