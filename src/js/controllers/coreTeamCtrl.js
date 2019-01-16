
app.controller('CoreTeamCtrl', ['$scope', '$rootScope', CoreTeamCtrl]);

function CoreTeamCtrl($scope, $rootScope) {

    console.log("Core Team Ctrl");

    $scope.coreTeamCharge = "";
    $scope.coreTeamName = "";
    $scope.coreTeamPicture = "";
    $scope.coreTeamDescription = "";
}