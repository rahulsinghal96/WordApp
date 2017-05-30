angular.module('starter')

  .controller('resetPasswordCtrl', function ($rootScope,$scope,$timeout,$cordovaOauth, AppConfig, $window, $http, $state, $ionicLoading) {
    var resetPassword = this;
	
    /*--------------------------------D E C L A R A T I O N S----------------------------------------------*/

    resetPassword.fullHeight = { 'height': AppConfig.devHeight - 44 + 'px' };


    /*--------------------------------F U N C T I O N S----------------------------------------------*/
        resetPassword.resetPassword=function()
        {
            console.log(resetPassword.username);
            Parse.User.requestPasswordReset(resetPassword.username, {
                success: function () {
                    alert("we have sent you a reset Password Link");
                   
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }

        resetPassword.goToLogin=function()
        {
             $state.go("login");
        }
  
    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
