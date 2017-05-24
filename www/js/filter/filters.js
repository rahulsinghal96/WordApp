angular.module('starter')
 
  .filter('capitalize', function () {
    return function (input, all) {
      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }) : '';
    }
  })
  .filter('trim', function () {
    return function (value) {
      if (!angular.isString(value)) {
        return value;
      }
      return value.replace(/^\s+|\s+$/g, ''); 
    };
  })
  



