(function () {
    'use strict';
    angular.module('starter')
      .constant('AppConfig', AppConfig())
	  .constant('GOOGLE_WEB_CLIENT_ID', '363036081958-re39ij7mkd2t5n4ru3mrs4snpu69p2q1.apps.googleusercontent.com');

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
