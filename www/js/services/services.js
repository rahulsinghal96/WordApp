angular.module('starter')
  
  .factory("AppParams", function () {
    return {
      locationRequired: ''
    };
  })
  .service("UploadService", function ($q, $ionicLoading, $timeout, $cordovaToast, $rootScope) {
    var service = {};
    service.uploadImage = uploadImage;
    return service;
    function uploadImage(ImageList, hasProfilePicture) {
      UploadImageUrl.imageUrl.length = 0;
      $rootScope.totalImages = ImageList.length;
      var deferred = $q.defer();
      var fileSize;
      var promiseResolved = false;
      var percentage;
      // Find out how big the original file is
      _.each(ImageList, function (image) {

        window.resolveLocalFileSystemURL(image, function (fileEntry) {

          fileEntry.file(function (fileObj) {

            fileSize = fileObj.size;
            // Display a loading indicator reporting the start of the upload
            $ionicLoading.show({ template: '<div> Uploading {{percentageUploaded|number:0}}% </div>' });
            // Trigger the upload
            uploadFile(image);
          });
        });
      })

      $rootScope.currentImageIndex = 0;
      function uploadFile(image) {
        $rootScope.currentImageIndex++;
        function win(r) {

          UploadImageUrl.imageUrl.push(r.response);

          if (UploadImageUrl.imageUrl.length == $rootScope.totalImages) {// ensures that all the images are upload on server. then it resolves the promise.

            //here we can upload the image on our server

            var imageUploadPromise = ImageFactory.create(UploadImageUrl.imageUrl, hasProfilePicture);
            imageUploadPromise.then(function (result) {
              $ionicLoading.hide();
              $cordovaToast.showShortCenter('Image uploaded successfully');
              deferred.resolve(result);
            }, function (err) {
              console.log(err);
            });

          }
          else {
            console.log('promise not resolved');
          }
        }

        function fail(error) {
          // alert("An error has occurred: Code = " + error.code);
          $cordovaToast.showShortCenter('Error in image upload');
          $ionicLoading.hide();
        }

        var uri = encodeURI('http://stormy-tor-12752.herokuapp.com/uploadImage');
        // var uri = encodeURI('http://onthebeach-be-dev.us-west-2.elasticbeanstalk.com/uploadImage');


        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = image.substr(image.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.name = "file";

        var headers = { 'headerParam': 'headerValue' };

        options.headers = headers;

        var ft = new FileTransfer();
        ft.onprogress = function (progressEvent) {
          if (progressEvent.lengthComputable) {
            $timeout(function () {
              $rootScope.percentageUploaded = progressEvent.loaded * 100 / progressEvent.total;
            }, 1)

          }
          else {

          }
        };

        ft.upload(image, uri, win, fail, options);

        var uploadOptions = {
          params: { 'upload_preset': "zhtib3yi" }
        };

      }

      return deferred.promise;

    }

  })
  .service("CheckInternet", function ($cordovaNetwork, $ionicLoading, $q) {

    this.internetStatus = function () {

      var defer = $q.defer();
      if (window.cordova && $cordovaNetwork.isOnline()) {
        defer.resolve({ internet: true });
      }

      else if (!window.cordova) {
        defer.resolve({ internet: true });
      }
      else {


        $ionicLoading.hide();
        function alertDismissed(buttonIndex) {

        }

        navigator.notification.alert(
          'Internet appears to be offline.',  // message
          alertDismissed,         // callback
          'Offline',            // title
          'Ok'                  // buttonName
        );
        defer.reject({ internet: false });
      }
      return defer.promise;
    }

  })




