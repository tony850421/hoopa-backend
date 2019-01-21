
app.controller('HoopaBranchesCtrl', ['$scope', '$rootScope', '$translate', HoopaBranchesCtrl]);

function HoopaBranchesCtrl($scope, $rootScope, $translate) {

    $scope.brancheName = "";
    $scope.brancheAddress = "";
    $scope.branchePhone = "";
    $scope.branchesCoordenates = "";
    $rootScope.activeList = 'hoopaBranchs';
    $scope.arrayBranchs = [];

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
                    $scope.init();
                    $scope.brancheName = "";
                    $scope.brancheAddress = "";
                    $scope.branchePhone = "";
                    $scope.branchesCoordenates = "";
                }, function (error) {

                });

            } else {
                var alert = $translate.instant('ALERT9');
                $scope.alertsAsset.push({ type: 'danger', msg: alert });
            }
        }
    };

    $scope.init = function () {
        $scope.arrayBranchs = [];
        var Branchs = new AV.Query('Branch');
        Branchs.find().then(function (res) {
            res.forEach(function (element) {
                var id = element.id;
                var address = element.get('address');
                var name = element.get('name');
                var phone = element.get('phone');
                var latitude = element.get('latitude');
                var longitude = element.get('longitude');

                $scope.arrayBranchs.push({
                    id: id,
                    address: address,
                    phone: phone,
                    name: name,
                    latitude: latitude,
                    longitude: longitude
                })
                $scope.$apply();
            });
        });
    };

    $scope.init();

    $scope.deleteBranchs = function (id) {
        var b = AV.Object.createWithoutData('Branch', id);
        b.destroy().then(function (n) {
            $scope.init();
        })
    };
}