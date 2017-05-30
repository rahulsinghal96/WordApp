angular.module('starter')
  .factory('socialSignIn', function ($window, $q, GOOGLE_WEB_CLIENT_ID) {
    var socialSignIn = {};
    var cb;
    socialSignIn.googleSignIn = _googleSignIn;//call it
    socialSignIn.facebookSignIn = _facebookSignIn;
    socialSignIn.googleLogout = _googleLogout;
    socialSignIn.facebookLogout = _facebookLogout;
    // Google Sign In Method
    function _googleSignIn(callback) {
      console.log('_googleSignIn', callback);
      if (angular.isDefined(window.plugins) && angular.isDefined(window.plugins.googleplus)) {
        window.plugins.googleplus.login(
          {
            'scopes': 'profile',
            'webClientId': GOOGLE_WEB_CLIENT_ID,
            'offline': true,
          },
          function (obj) {
            if (angular.isFunction(callback)) {
              _showNotification('Sign In Successfully');
              callback('google', obj);
            }
            console.log('google Sign In Success', obj)
          },
          function (error) {
            _showNotification('error : ' + error);
            console.log('google Sign In Error', error)
          }
        );
      }

    }
    // Facebook Sign In Method
    function _facebookSignIn(callback) {
      console.log('_facebookSignIn', callback);
      cb = callback;
      if (angular.isDefined(facebookConnectPlugin))
        facebookConnectPlugin.getLoginStatus(_connectedStatus, _disConnectedStatus);
    }
    // Google Logout
    function _googleLogout() {
      console.log('_googleLogout');
      var info = $q.defer();
      if (angular.isDefined(window.plugins) && angular.isDefined(window.plugins.googleplus)) {
        window.plugins.googleplus.logout(
          function (response) {
            info.resolve(response);
          }, function (response) {
            info.resolve(response);
          });
      }
      return info.promise;
    }
    // Facebook Log out
    function _facebookLogout() {
      console.log('_facebookLogout')
      var info = $q.defer();
      if (angular.isDefined(facebookConnectPlugin)) {
        facebookConnectPlugin.logout(function (response) {
          info.resolve(response);
        }, function (response) {
          info.resolve(response);
        });
      }
      return info.promise;
    }

    function _connectedStatus(connectRes) {
      console.log('_connectedStatus', connectRes);
      if (connectRes.status === 'connected') {
        _getFacebookProfileInfo(connectRes.authResponse).then(_getProfile, _fbLoginError);
      } else {
        facebookConnectPlugin.login(['email', 'public_profile'], _fbLoginSuccess, _fbLoginError);
      }
    }

    function _disConnectedStatus() {
      console.log('_disConnectedStatus');
      facebookConnectPlugin.login(['email', 'public_profile'], _fbLoginSuccess, _fbLoginError);
    }

    function _fbLoginSuccess(res) {
      console.log('_fbLoginSuccess', res);
      _getFacebookProfileInfo(res.authResponse).then(_getProfile, _fbLoginError);
    }

    function _fbLoginError(error) {
      console.log('_fbLoginError', error);
      _showNotification(error);
    }

    function _getProfile(res) {
      console.log('_getProfile', res);
      if (angular.isFunction(cb)) {
        _showNotification('Sign In Successfully');
        cb('facebook', res);
      }
    }

    function _getFacebookProfileInfo(authResponse) {
      console.log('_getFacebookProfileInfo', authResponse);
      var info = $q.defer();
      if (window.cordova) {
        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
          function (response) {
            info.resolve(response);
          },
          function (error) {
            info.reject(error);
          }
        );
        return info.promise;
      }
    };

    function _showNotification(msg) {
      console.log('_showNotification', msg);
      if (angular.isDefined(window.cordova) && angular.isDefined(msg)) {
        $cordovaToast.showShortBottom(msg);
      }
    }
    return socialSignIn;
  })