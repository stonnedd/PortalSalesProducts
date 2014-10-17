app.controller("detailController", function ($scope, $http) {
    
    $scope.working = false;

    $scope.confirmPurchase = function(formId,urlToGo) {
        
        $scope.working = true;
        
        $scope.msgError = undefined;
        $.validator.unobtrusive.parse(formId);
        if ($(formId).valid() == false) {
            return;
        }
        

        if (!$scope.product) {
            $scope.msgError = "No fue posible obtener el detalle del producto";
            return false;
        }
        $http.post(urlToGo, {
            id: $scope.stringId,
            fullname: $scope.fullname,
            email: $scope.email,
            quantity: $scope.quantity,
            cbfee:$scope.cbfee
        }).then($scope.onSuccess, $scope.onError);
    }
    
    $scope.onError = function () {
        $scope.msgError = "No hay conexión con el servidor";
        $scope.working = false;
        
    };
    
    $scope.returnPage = function () {
        window.goToUrlMvcUrl($scope.urlToReturn);
    };
    
    $scope.onSuccess = function (res) {
        if (res.data.success) {
            $scope.returnPage();
        } else {
            $scope.msgError = res.data.msg;
        }
        $scope.working = false;
        
    };

});


