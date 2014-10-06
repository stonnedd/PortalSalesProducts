app.service('sharedSvc', function ($timeout, $q) {
    //Dialogo para la espera de algún evento
    var dlgProcessing = $('#ProcessingDlgId');
    var th = this;
    this.cfgProc = { toProcessing: undefined, procCount: 0 };
    
    this.onProcTimeOut = function () {
        th.cfgProc.procCount++;
        if (th.cfgProc.procCount > 100)
            th.cfgProc.procCount = 0;
        th.cfgProc.toProcessing = $timeout(th.onProcTimeOut, 150);
    };
    
    this.showProcessing = function () {
        dlgProcessing.modal('show');
        th.cfgProc.procCount = 1;
        th.cfgProc.toProcessing = $timeout(th.onProcTimeOut, 400);
    };
    
    this.hideProcessing = function () {
        $timeout.cancel(th.cfgProc.toProcessing);
        dlgProcessing.modal('hide');
    };
    
    //Dialogo para mensajes con acciones de éxito, información, advertencia o error
    var dlgMsgBox = $('#MessageBoxDlgId');
    
    this.cfgMsg = { title: '', message: '', type: '' };
    this.respMsg = {};
    
    this.showDlg = function (cfg) {
        th.cfgMsg = cfg;
        var def = $q.defer();
        
        $timeout(function () {
            dlgMsgBox.modal('show');
            dlgMsgBox.on('hidden.bs.modal', function () {
                if (th.respMsg.IsOk === true) {
                    def.resolve();
                }
                else {
                    def.reject();
                }
            });
        }, 1);
        
        return def.promise;
    };
    
    this.showMsg = function (cfg) {
        dlgMsgBox = $('#MessageBoxDlgId');
        return th.showDlg(cfg);
    };
    
    
    this.showConf = function (cfg) {
        dlgMsgBox = $('#ConfirmationDlgId');
        return th.showDlg(cfg);
    };
    
    this.hideMsg = function (rMsg) {
        th.respMsg = rMsg;
        dlgMsgBox.modal('hide');
    };

});


app.controller('processingController', function ($scope, sharedSvc) {
    $scope.sharedSvc = sharedSvc;
    $scope.count = 0;
    
    $scope.$watch('sharedSvc.cfgProc.procCount', function (count) {
        $scope.count = count;
    });
});

app.controller('messageController', function ($scope, $sce, sharedSvc) {
    $scope.sharedSvc = sharedSvc;
    
    $scope.$watch('sharedSvc.cfgMsg', function (cfg) {
        $scope.Title = cfg.title;
        $scope.Message = $sce.trustAsHtml(cfg.message);
        $scope.Type = cfg.type;
    });
    
    $scope.ok = function () {
        $scope.IsOk = true;
        sharedSvc.hideMsg($scope);
    };
    
    $scope.alert = function (title, message, type) {
        $scope.Title = title;
        $scope.Message = $sce.trustAsHtml(message);
        $scope.Type = type;
    };
});

app.controller('confirmationController', function ($scope, $sce, sharedSvc) {
    $scope.sharedSvc = sharedSvc;
    
    $scope.$watch('sharedSvc.cfgMsg', function (cfg) {
        $scope.Title = cfg.title;
        $scope.Message = $sce.trustAsHtml(cfg.message);
        $scope.Type = cfg.type;
    });
    
    $scope.yes = function () {
        $scope.IsOk = true;
        sharedSvc.hideMsg($scope);
    };
    
    $scope.no = function () {
        $scope.IsOk = false;
        sharedSvc.hideMsg($scope);
    };
});
