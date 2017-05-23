angular.module('starter')

  .controller('homeCtrl', function ($rootScope,$scope,$timeout,$cordovaOauth, AppConfig, $window, $http, $state, $ionicLoading) {
    var home = this;
		
		//Parse.User.logOut();
		 if(!$rootScope.user){$state.go("login");}
		var Stories=Parse.Object.extend("Story");
		var stories=new Stories();
		var query=new Parse.Query(Stories);
			query.limit(10);
      
			query.find({
			success:function(serverStories){
        
				$timeout(function()
					{
						$scope.Stories=serverStories;
						//console.log(serverStories);
					}, 200);
         
				},
			error:function(error){
				console.log(error);
				}
			});
    /*--------------------------------D E C L A R A T I O N S----------------------------------------------*/

    home.fullHeight = { 'height': AppConfig.devHeight - 44 + 'px' };


    /*--------------------------------F U N C T I O N S----------------------------------------------*/

    home.goToStory = function(story){
		$rootScope.story=story;
		$state.go('app.story');
    }

    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
