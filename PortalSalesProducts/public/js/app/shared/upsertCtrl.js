app.controller("upsertController", function ($scope, $http, $q, sharedSvc) {
    $scope.working = false;
    
    $scope.save = function (formId, urlToGo) {
        $.validator.unobtrusive.parse(formId);
        if ($(formId).valid() == false) {
            return;
        }
        $scope.working = true;
        
        $http.post(urlToGo, { id: $scope.m.id, name: $scope.m.name, position: $scope.m.position, description: $scope.m.description })
            .then($scope.onSuccess, $scope.onError);
    };
    
    $scope.onError = function () {
        $scope.msgError = "No hay conexión con el servidor";
        $scope.working = false;
    };

    $scope.returnPage = function () {
        window.goToUrlMvcUrl($scope.urlToReturn);
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
        $scope.returnPage();
    };

    $scope.doAction = function (data, urlToGo, title, message, type) {
        if (type == undefined)
            type = "danger";
        
        var def = $q.defer();
        sharedSvc.showConf({ title: title, message: message, type: type }).
            then(function () {
            $scope.doPost(data, urlToGo, def);
        }, def.reject);
        return def.promise;
    };
    
    $scope.doPost = function (data, urlToGo, def) {
        var settings = {
            dataType: "json",
            type: "POST",
            url: urlToGo,
            data: data,
            success: function (resp) {
                if (resp.hasError === true) {
                    sharedSvc.showMsg(
                        {
                        title: resp.title,
                        message: resp.message,
                        type: "danger"
                    }).then(function () { def.reject({ isError: true }); });
                }
                else {
                    def.resolve();
                }
            },
            error: function () {
                sharedSvc.showMsg(
                    {
                    title: "Error de red",
                    message: "<strong>No fue posible conectarse al servidor</strong> <br/><br/>Por favor intente más tarde",
                    type: "danger"
                }).then(function () { def.reject({ isError: true }); });
            }
        };
        
        $.ajax(settings);
    };
});