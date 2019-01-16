
app.controller('AdvCtrl', ['$scope', '$rootScope', AdvCtrl]);

function AdvCtrl($scope, $rootScope) {

    $rootScope.activeList = 'adv';
    $scope.showAdv;

    $scope.init = function () {
        var query = new AV.Query('PublishImage');
        query.get('5c32cb9644d904005d324af6').then(function (data) {
            $scope.showAdv = data.get('Publish'); // show or not adv
            $scope.$apply();
        }, function (error) {
            alert(JSON.stringify(error));
        });
    };

    $scope.init();

    $scope.showAdvFunction = function () {    
        var publish = AV.Object.createWithoutData('PublishImage', '5c32cb9644d904005d324af6');
        publish.set('Publish', $scope.showAdv);
        publish.save();
    };

}