app.controller('UploadCtrl', function ($scope) {
    
    // App variable to show the uploaded response
    $scope.responseData = undefined;
    $scope.m = {};
/*    
    $scope.prueba = 'dsfsdffsdf';
    // Get initial uploads and populate list
    $http({
        method: 'get',
        url: '/uploads?' + new Date().getTime(),
        cache: false
    }).then(function (response) {
        $scope.uploads = response.data;
    });
  */  
    // Global handler for onSuccess that adds the uploaded files to the list
    $scope.onGlobalSuccess = function (response) {
        $scope.m.image = response.data.src + "/" + response.data.realName;
        $scope.$emit("onUpImgSuccess", response.data.realName);
    };
});

app.controller('SimpleCtrl', function ($scope, $http) {
        // Nothing special needed from the controller
});

app.controller('AdvancedMarkupCtrl', function ($scope, $http) {
    // Valid mimetypes
    
    $scope.acceptTypes = 'image/*,application/pdf';
    // Data to be sent to the server with the upload request
    
    $scope.uploadData = {
        myformdata: 'hello world'
    };
    
    $scope.onUpload = function (files) {
        console.log('AdvancedMarkupCtrl.onUpload', files);
    };
    
    $scope.onError = function (response) {
        console.error('AdvancedMarkupCtrl.onError', response);
        $scope.responseData = response.data;
    };
    
    $scope.onComplete = function (response) {
        console.log('AdvancedMarkupCtrl.onComplete', response);
        $scope.responseData = response.data;
    };
});



