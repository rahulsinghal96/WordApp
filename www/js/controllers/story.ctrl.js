/**
 * Created by abhishekrathore on 12/29/16.
 */
//extract word from database


//Main Controler
(function () {
	'use strict';

	angular.module('starter')

		.controller('storyCtrl', function ($ionicSlideBoxDelegate, $rootScope, $scope, AppConfig, $timeout, $state, $cordovaNetwork,
			$cordovaToast, $ionicLoading, $ionicModal) {
			var story = this;
			story.optionArray=[];
			
			var Word = Parse.Object.extend("Words");
			var WordVisited = Parse.Object.extend("WordsVisited");
			var Story = Parse.Object.extend("Slides");
			$ionicLoading.show({'template' : 'Loading..'});
			  retriveOptions();
			//retriveOptions();
			/*------------------other imp functions----------------------------------------------------------------------------------------*/
			function extract_words(text) {
				
				var textArray = text.split(" ");
				var i = 0;

				//var result=[]; uncomment to get words
				while (i <= textArray.length) {
					if (textArray[i] == "#_") {
						var start = i;
						var string = "";
						while (textArray[i + 1] != "_#") {
							var string = string + " " + textArray[i + 1];
							i++;
						}
						//check if the word is with the user 
						//console.log($rootScope.UserVisitedWords);
						if ($rootScope.UserVisitedWords.indexOf(string.trim()) > -1)
							$scope['isClicked_' + i] = true;

							textArray[start] = "<a href='javascript::' class='button button-clear clickable-word margin-0 button-small button-balanced' ng-style='isClicked_" + i + " && {\"color\": \"red\"}' ng-click=\"story.showModal('" + string.trim() + "',isClicked_" + i + ");isClicked_" + i + " = true;\" >";
							textArray[i + 1] = "</a>";
							//result.push(string.trim()); uncommient to get array of words

						}
						i++;
					}
					var finalTextToDisplay = textArray.join(" ");
					//console.log('textArray', finalTextToDisplay);
					return finalTextToDisplay;
				}



				/*------------------other imp functions----------------------------------------------------------------------------------------*/





				if (!$rootScope.user) { $state.go("login"); }
				var currentStory = $rootScope.story;
				//console.log(currentStory);
				
				var query = new Parse.Query(Story);
				query.equalTo("storyID", currentStory);
				query.find({
					success: function (list) {
						$timeout(function () {
							var desc=[];
							for (var i = 0; i < list.length; i++) {
								var json = list[i].toJSON();
								var data={};
									data.description=extract_words(json.description);
									data.slideOrder=json.slideOrder;
									data.url=json.url;
									desc.push(data);
									//console.log(json);
							}
							$scope.storyTitle = $rootScope.storyname;
							$scope.Slides = desc;
							story.StoryPointBoard=true;
							$ionicSlideBoxDelegate.update();
							$ionicLoading.hide();

						}, 2000);

					},
					error: function (error) { console.log("error message"); }
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
				
				function retriveOptions() {
					console.log("retrive words function called");
					var WordQuery = new Parse.Query(Word);
						WordQuery.limit(100);
						WordQuery.find({
							success:function(WordList){
								$timeout(function () {	
									for(var i=0;i<3;i++)
									{
										var randomNumberGenerated=Math.floor(Math.random() * 100); 
										console.log(randomNumberGenerated);
										story.optionArray.push(WordList[randomNumberGenerated].attributes.meaning);
									}
								console.log("words Retrived");
								},200);
							}
						});
						
				}

				story.showModal = function (wordTap, isClickedFlag) {
					if (!isClickedFlag) {
						
						//word add to database with user
						var WordsVisited = Parse.Object.extend("WordsVisited");
						var WordsVisit = new WordsVisited();
						$rootScope.UserVisitedWords.push(wordTap);
						WordsVisit.save({
							word: wordTap,
							storyID:$rootScope.story,
							userID: $rootScope.user
						}, {
								success: function (wordAdded) {
									console.log("word added to database with user");
								},
								error: function () {
									console.log("word not added to database");
								}
							});
						//flip of the modal	
						story.flipped = null;
						$ionicModal.fromTemplateUrl('modals/word-modal.html', {
							scope: $scope,
							animation: 'fade-in-zoom'
						})
							.then(function (modal) {
								story.wordModal = modal;
								story.wordModal.show();
								
								var query = new Parse.Query(Word);
								query.equalTo("word", wordTap);
								query.find({
									success: function (meaning) {
										console.log("word meaning found");
										$timeout(function () {
											$scope.ModalWordCicked = wordTap;
											$scope.ModalWordCickedMeaning=meaning[0].attributes.meaning.trim();
											console.log($scope.ModalWordCickedMeaning);
											story.optionArray.push($scope.ModalWordCickedMeaning);
											
										}, 100);
									},
									error: function () {
										console.log("error");
									}
								});

							})
					}
				};
				story.closeModal = function () {
					story.optionArray=[];
					retriveOptions();
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
					if (answer == $scope.ModalWordCickedMeaning) {
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
							story.state = 'definition';
						}, 3000)
					}
				}

				/*--------------------------------A P I  C A L L S----------------------------------------------*/

				/*--------------------------------R E D I R E C T I O N S----------------------------------------------*/


			})
})();
