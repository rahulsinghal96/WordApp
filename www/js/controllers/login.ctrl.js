angular.module('starter')

  .controller('loginCtrl', function ($rootScope,$scope,$cordovaOauth, AppConfig, $window, $http, $state, $ionicLoading,$localStorage,socialSignIn) {
    var loginPage = this;
	
	
	var WordVisited=Parse.Object.extend("WordsVisited");
	var query=new Parse.Query(WordVisited);
	console.log($localStorage.username);
	//direc login by cradentials saved in localstorage
	if($localStorage.username!="" && $localStorage.password!="")
	{
		Parse.User.logIn($localStorage.username,$localStorage.password,{
			  success:function(loginUser){
					$rootScope.user=loginUser;	
				//console.log($rootScope.user);
				//retriving data from the viewTable
				query.equalTo("userID",loginUser);
				query.find({
					success:function(data){
							var arrayWords=[];
							for(var i=0;i<data.length;i++)
							{
								arrayWords.push(data[i].attributes.word);
							}
							$rootScope.UserVisitedWords=arrayWords;
							//console.log($rootScope.UserVisitedWords)
						 },
						error:function()
						{
							console.log("error in retriving words");
						}
					});
					//console.log($rootScope.user);
					console.log("login success");
					$state.go("app.home");
				},
			     error:function(error){console.log(error.message);}
		   });
	}
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
				//console.log($rootScope.user);
				query.equalTo("userID",loginUser);
				query.find({
					success:function(data){
							var arrayWords=[];
							for(var i=0;i<data.length;i++)
							{
								arrayWords.push(data[i].attributes.word);
							}
							$rootScope.UserVisitedWords=arrayWords;
							
						 },
						error:function()
						{
							console.log("error in retriving words");
						}
					});
					//console.log($rootScope.user);
					console.log("login success");
					$state.go("app.home");
		},
		  error:function(error){console.log(error.message);}
	   });
	 }

	 
	 loginPage.googleLogin = function(){
    
		CordovaFacebook.login({
		   permissions: ['email', 'user_likes'],
		   onSuccess: function(result) {
			  if(result.declined.length > 0) {
				 alert("The User declined something!");
			  }
			  /* ... */
		   },
		   onFailure: function(result) {
			  if(result.cancelled) {
				 alert("The user doesn't like my app");
			  } else if(result.error) {
				 alert("There was an error:" + result.errorLocalized);
			  }
		   }
		});
    }
	
	
	loginPage.goToLogin = function(){
	  $state.go("app.home");
    }
	
	loginPage.forgetPassword = function(){
			$state.go("resetPassword");
    }
	
	loginPage.goToRegister = function(){
	//console.log("goto register");
	  $state.go("register");
    }

    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
