app.controller("detailController", function ($scope, $http) {
    
    $scope.confirmPurchase = function(urlToGo) {
        if (!$scope.product) {
            $scope.msgError = "No fue posible obtener el detalle del producto";
            return false;
        }
        $http.post(urlToGo, {
            id: $scope.stringId,
            fullname: $scope.fullname,
            email: $scope.email
        }).then($scope.onSuccess, $scope.onError);

        alert("los datos se enviaron a tu correo");
    }
    
    $scope.onError = function () {
        $scope.msgError = "No hay conexión con el servidor";
    };
    
    $scope.returnPage = function () {
        window.goToUrlMvcUrl($scope.urlToReturn);
    };
    
    $scope.onSuccess = function (res) {
        alert("succes" + res.data.success);

        if (res.data.success) {
            $scope.returnPage();
        } else {
            $scope.msgError = res.data.msg;
        }
    };

});


