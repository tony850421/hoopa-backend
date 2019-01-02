
app.controller('AdvCtrl', ['$scope', '$rootScope', AdvCtrl]);

function AdvCtrl($scope, $rootScope) {

    console.log("ADV Ctrl");

    $rootScope.activeList = 'adv';
    $scope.showAdv = false;

    $scope.showAdvFunction = function(){
        console.log($scope.showAdv);
    };

}