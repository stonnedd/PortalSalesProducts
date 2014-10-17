app.controller("upsertController", function ($scope, $http, $q, sharedSvc) {
    $scope.working = false;
    $scope.m = {};
    
    $scope.save = function (formId, urlToGo) {
        $scope.msgError = undefined;
        $.validator.unobtrusive.parse(formId);
        if ($(formId).valid() == false) {
            return;
        }
        
        $scope.working = true;
        
        $http.post(urlToGo, $scope.m)
            .then($scope.onSuccess, $scope.onError);
    };

    $scope.singleSelection = function singleSelection() {
        $scope.value = true;
    };

    $scope.toggleSelection = function (itemSel, key) {
        
        if (!$scope.m[key]) {
            $scope.m[key] = [];
        }
        
        var idx = $scope.m[key].indexOf(itemSel);
        
        if (idx > -1) {
            $scope.m[key].splice(idx, 1);
        }
        else {
            $scope.m[key].push(itemSel);
        }
        
        if (!$scope.m[key]) {
            $scope.m[key] = '';
        }
        console.log($scope.m[key]);
    };
    
    $scope.toggleSelectionMultiple = function(itemSel, key) {
        
        if (!$scope.m[key]) {
            $scope.m[key] = [];
        }
        
        var idx = $scope.indexOf(itemSel, $scope.m[key]);
        
        if (idx > -1) {
            $scope.m[key].splice(idx, 1);
        }
        else {
            $scope.m[key].push(itemSel);
        }
        
        if (!$scope.m[key]) {
            $scope.m[key] = '';
        }
        console.log($scope.m[key]);
    };

    $scope.isValidImg = function () {
        if (!$scope.m.image) {
            $scope.msgError = "Debe elegir una imagen, antes de guardar la información.";
            return false;
        }
        return true;
    };
    
    
    $scope.$on("onUpImgSuccess", function (ev, data) {
        $scope.m.image = data;
    });
    
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
    
    $scope.initSelect = function (list, key, value) {
        if (value) {
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                if (item.name == value) {
                    $scope.m[key] = item;
                    return;
                }
            }
        }
        $scope.m[key] = list[0];
        return;
    };

    $scope.indexOf = function(value, list) {
        for (var i = 0, len = list.length; i < len; i++) {
            var bMatch = true;
            var item = list[i];
            for (var k in value) {
                if (!item[k] || !value[k] || value[k] !== item[k]) {
                    bMatch = false;
                    break;
                }
            }

            if (bMatch) {
                return i;
            }
        }
        return -1;
    };
    
    
    $scope.initCheckBox = function (list, key, value) {
        $scope.m[key] = [];
        if (value && value.length > 0) {
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                for (var j = value.length - 1; j >= 0; j--) {
                    var itValue = value[j];
                    var bMatch = true;
                    for (var k in item) {
                        if (!item[k] || !itValue[k] || itValue[k] !== item[k]){
                            bMatch = false;
                            break;
                        }
                    }

                    if (bMatch) {
                        $scope.m[key].push(item);
                        value.splice(j, 1);
                        break;
                    }
                }

                //if (item.name == value) {
                //    $scope.m[key] = item;
                //    return;
                //}
            }
        }
        return;
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