app.controller("loginController", function ($scope, $http) {
    $scope.working = false;
    $scope.m = {};

    $scope.login = function (formId, urlToGo) {
        $.validator.unobtrusive.parse(formId);
        if ($(formId).valid() == false) {
            return;
        }
        $scope.working = true;

        $http.post(urlToGo, { username: $scope.m.username, password: $scope.m.password })
            .then($scope.onSuccess, $scope.onError);
    };

    $scope.onError = function () {
        $scope.msgError = "No hay conexión con el servidor";
        $scope.working = false;
    };

    $scope.onSuccess = function (res) {
        $scope.working = false;
        if (res.data === undefined) {
            $scope.msgError = "Existe un fallo en el servidor";
            return;
        }

        if (res.data.success === false) {
            $scope.msgError = res.data.msg;
            return;
        }
        //Ir a la URL que corresponde
        window.goToUrlMvcUrl(res.data.urlToGo);

    };
});