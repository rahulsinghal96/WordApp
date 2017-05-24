angular.module('starter')
  .directive('noScroll', function ($document) {

    return {
      restrict: 'A',
      link: function () {

        $document.on('touchmove', function (e) {
          e.preventDefault();
        });
      }
    }
  })
  .directive('autoFocus', function($rootScope) {
    return {
      restrict: 'AEC',
      link: function(scope, element, attrs)
      {
        element.bind('blur', function()
        {
          if($rootScope.sendButtonClicked) {
            element[0].focus();
          }
        });
      }
    }
  })
.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
  }])

  