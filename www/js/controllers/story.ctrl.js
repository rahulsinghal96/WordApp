/**
 * Created by abhishekrathore on 12/29/16.
 */
//extract word from database
 function extract_words(text)
			{
				var textArray = text.split(" ");
				var i=0;
				//var result=[]; uncomment to get words
				while(i<=textArray.length)
				{	
					if(textArray[i]=="#_")
					{	var start=i;
						var string="";
						while(textArray[i+1]!="_#")
						{
							var string =string+" "+textArray[i+1];
							i++;
						}
						textArray[start]="<a href='javascript::' class='button button-clear clickable-word margin-0 button-small button-balanced' ng-click=\"story.showModal('"+string.trim()+"')\" >";
						textArray[i+1]="</a>";
						//result.push(string.trim()); uncomment to get array of words
						
					}
					i++;
				}
					var finalTextToDisplay = textArray.join(" ");
				return finalTextToDisplay;
			}
 //Main Controler
(function () {
    'use strict';

    angular.module('starter')

        .controller('storyCtrl', function ($ionicSlideBoxDelegate,$rootScope,$scope, AppConfig, $timeout, $state, $cordovaNetwork,
            $cordovaToast, $ionicLoading, $ionicModal) {
				var story = this;
				if(!$rootScope.user){$state.go("login");}
			
				var currentStory=$rootScope.story;
				//console.log(currentStory);
				var Story=Parse.Object.extend("Slides");
					var query=new Parse.Query(Story);
					query.equalTo("storyID",currentStory);
					query.find({
					  success:function(list) {
						$timeout(function()
						{	var description=[];
							for(var i=0;i<list.length;i++)
							{
								var json=list[i];
								description.push(extract_words(json.attributes.description));
							}
							$scope.storyTitle=$rootScope.storyname;
							$scope.Slides=description;
							
							$ionicSlideBoxDelegate.update();
							//console.log(description);
						}, 200);
						
					  },
					  error:function(error){console.log("error message");}
					});
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

            story.showModal = function (wordTap) {
                story.flipped = null;
                $ionicModal.fromTemplateUrl('modals/word-modal.html', {
                    scope: $scope,
                    animation: 'fade-in-zoom'
                })
                    .then(function (modal) {
                        story.wordModal = modal;
                        story.wordModal.show();
						var Word=Parse.Object.extend("Words");
						var query= new Parse.Query(Word);
							query.equalTo("word", wordTap);
							query.find({
							success:function(meaning){
									$timeout(function(){
										$scope.ModalWordCicked=wordTap;
										$scope.ModalWordCickedMeaning=meaning[0].attributes.meaning;
									},100);
								},
							error:function(){
									console.log("error");
								}
							});
							
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
