angular.module('starter')

  .controller('loginCtrl', function ($rootScope,$scope,$cordovaOauth, AppConfig, $window, $http, $state, $ionicLoading) {
    var loginPage = this;
    //if(Parse.User.current()){$state.go("app.home");}
    /*--------------------------------D E C L A R A T I O N S----------------------------------------------*/

    loginPage.fullHeight = { 'height': AppConfig.devHeight - 44 + 'px' };
    

    /*--------------------------------F U N C T I O N S----------------------------------------------*/
    

    loginPage.appLOGIN = function(){
     var username=$scope.login.username;
	  var password=$scope.login.password;
    Parse.User.logIn(username,password,{
		  success:function(loginUser){
        $rootScope.user=loginUser;
        console.log("login success");
        $state.go("app.home");
		},
		  error:function(error){console.log(error.message);}
	   });
	 }

	loginPage.goToLogin = function(){
	  $state.go("app.home");
    }
	
	loginPage.goToRegister = function(){
	//console.log("goto register");
	  $state.go("register");
    }

    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
