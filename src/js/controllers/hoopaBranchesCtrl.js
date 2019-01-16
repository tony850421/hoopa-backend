
app.controller('HoopaBranchesCtrl', ['$scope', '$rootScope', HoopaBranchesCtrl]);

function HoopaBranchesCtrl($scope, $rootScope) {

    console.log("Hoopa Branches Ctrl");

    $scope.brancheName = "";
    $scope.brancheAddress = "";
    $scope.branchePhone = "";
    $scope.branchesCoordenates = "";
}