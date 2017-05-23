/**
 * Created by abhishekrathore on 12/29/16.
 */
(function () {
    'use strict';

    angular.module('starter')

        .controller('storyCtrl', function ($rootScope,$scope, AppConfig, $timeout, $state, $cordovaNetwork,
            $cordovaToast, $ionicLoading, $ionicModal) {
            var story = this;
				var currentStory=$rootScope.story;
				//console.log(currentStory);
				var Story=Parse.Object.extend("Slides");
					var query=new Parse.Query(Story);
					query.equalTo("storyID",currentStory);
					query.find({
					  success:function(list) {
						$timeout(function()
						{
							$scope.Slides=list;
							console.log(list);
						}, 200);
						
					  },
					  error:function(error){console.log("error message");}
					});
					
             if(!$rootScope.user){$state.go("login");}
            /*--------------------------------D E C L A R A T I O N S----------------------------------------------*/
            story.fullHeight = { 'height': AppConfig.devHeight - 44 + 'px' };


            /*--------------------------------F U N C T I O N S----------------------------------------------*/

            story.flip = function (index) {
                story.flipped = !story.flipped;
                if (index == 1) {
                    story.state = 'question'
                }
                else if (index == 2) {
                    story.state = 'definition'
                }
            }

            story.showModal = function () {
                story.flipped = null;
                $ionicModal.fromTemplateUrl('modals/word-modal.html', {
                    scope: $scope,
                    animation: 'fade-in-zoom'
                })
                    .then(function (modal) {
                        story.wordModal = modal;
                        story.wordModal.show();

                    })
            };
            story.closeModal = function () {
                story.wordModal.hide();
                $timeout(function () {
                    story.wordModal.remove();
                }, 300)

            }
            //when the meaning is read by user, assign points
            story.meaningRead = function () {

            }

            //when the question is answered by user, check and assign points
            story.checkAnswer = function (answer) {

                //Dummy logic, correct later
                if (answer == 1) {
                    $timeout(function () {
                        story.showCheckmark = true;
                    }, 500)
                    $timeout(function () {
                        story.showCheckmark = false;
                        story.closeModal();
                    }, 2000)
                }
                else {
                    $timeout(function () {
                        story.showCross = true;
                    }, 500)
                    $timeout(function () {
                        story.showCross = false;
                    }, 1500)
                    $timeout(function () {
                        story.state='definition';
                    }, 3000)
                }
            }

            /*--------------------------------A P I  C A L L S----------------------------------------------*/


            /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/


        })
})();
