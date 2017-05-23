angular.module('starter')
  .controller('registerCtrl', function ($scope,$cordovaOauth, AppConfig, $window, $http, $state, $ionicLoading) {
    var registerPage = this;

    /*--------------------------------D E C L A R A T I O N S----------------------------------------------*/

    registerPage.fullHeight = { 'height': AppConfig.devHeight - 44 + 'px' };
    

    /*--------------------------------F U N C T I O N S----------------------------------------------*/
   registerPage.signup = function(){
     var username=$scope.register.username;
	 var password=$scope.register.password;
	 var name=$scope.register.name;
		var user = new Parse.User();
	
			user.set("username", username);
			user.set("password",password);
			user.set("name",name);

			// other fields can be set just like with Parse.

			user.signUp(null, {
			  success: function(user) {
				$state.go('login');
				},
			  error: function(user, error) {}
			});
    }

	registerPage.goToLogin = function(){
      $state.go('login');
    }

    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
