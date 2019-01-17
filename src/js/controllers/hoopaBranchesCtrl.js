
app.controller('HoopaBranchesCtrl', ['$scope', '$rootScope', '$translate', HoopaBranchesCtrl]);

function HoopaBranchesCtrl($scope, $rootScope, $translate) {

    console.log("Hoopa Branches Ctrl");

    $scope.brancheName = "";
    $scope.brancheAddress = "";
    $scope.branchePhone = "";
    $scope.branchesCoordenates = "";

    $scope.addBranchs = function () {
        
        var ltarray = $scope.branchesCoordenates.split(',');
        if (ltarray.length == 2) {
            var latitude = ltarray[1];
            var longitude = ltarray[0];
        } else {
            var alert = $translate.instant('ALERT9');
            $scope.alertsAsset.push({ type: 'danger', msg: alert });
        }
    }
}