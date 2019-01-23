app.controller('AddHoopaBranchsCtrl', ['$scope', '$rootScope', '$translate', '$state', AddHoopaBranchsCtrl]);

function AddHoopaBranchsCtrl($scope, $rootScope, $translate, $state) {

    $rootScope.activeList = 'addHoopaBranch';

    $scope.brancheName = "";
    $scope.brancheAddress = "";
    $scope.branchePhone = "";
    $scope.branchesCoordenates = "";

    $scope.addBranchs = function () {

        if ($scope.brancheAddress != '' && $scope.brancheName != '' && $scope.branchePhone != '' && branchesCoordenates != '') {
            var ltarray = $scope.branchesCoordenates.split(',');
            if (ltarray.length == 2) {
                var latitude = ltarray[1];
                var longitude = ltarray[0];

                var Branchs = AV.Object.extend('Branch');
                var b = new Branchs();
                b.set('address', $scope.brancheAddress);
                b.set('name', $scope.brancheName);
                b.set('phone', $scope.branchePhone);
                b.set('latitude', latitude);
                b.set('longitude', longitude);
                b.save().then(function (res) {
                    $scope.brancheName = "";
                    $scope.brancheAddress = "";
                    $scope.branchePhone = "";
                    $scope.branchesCoordenates = "";
                    $state.go('hoopaBranchesView');
                }, function (error) {

                });

            } else {
                var alert = $translate.instant('ALERT9');
                $scope.alertsAsset.push({ type: 'danger', msg: alert });
            }
        }
    };
}