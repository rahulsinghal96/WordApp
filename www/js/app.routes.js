angular.module('starter')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom')
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-left').previousTitleText(false);

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in bookingCtrl.js
    $stateProvider

      // setup an abstract state for the tabs directive
     
       .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl',
        controllerAs: 'login'
      })
       .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl',
        controllerAs: 'register'
        })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/sidemenu.html',
        controller: 'menuCtrl',
        controllerAs: 'menu'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menu-content': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
          }
        }
      })
      .state('app.story', {
        url: '/story',
        views: {
          'menu-content': {
            templateUrl: 'templates/story.html',
            controller: 'storyCtrl',
            controllerAs: 'story'
          }
        }
      })
      
       
      
    // $urlRouterProvider.otherwise('/albums');
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    //$urlRouterProvider.otherwise('/app/home');


  })
