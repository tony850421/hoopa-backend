angular
    .module('RDash')
    .controller('DashBoardCtrl', ['$scope', '$window', '$timeout', DashBoardCtrl]);

function DashBoardCtrl($scope, $window, $timeout) {

    $scope.loading = false;

    $scope.userCount = 0;
    $scope.packageCount = 0;
    $scope.visitCount = 0;
    $scope.offerCount = 0;

    $scope.users = [];

    $scope.statistics = function () {
        $scope.loading = true;

        var userQuery = new AV.Query('_User');
        userQuery.count().then(function (res) {
            $scope.userCount = res;
            console.log(res);
            $scope.$apply();
        });

        var projectQuery = new AV.Query('Project');
        projectQuery.count().then(function (res) {
            $scope.packageCount = res;
            console.log(res);
            $scope.$apply();
        });

        var visitQuery = new AV.Query('ProjectVisit');
        visitQuery.count().then(function (res) {
            $scope.visitCount = res;
            console.log(res);
            $scope.$apply();
        });

        var offerQuery = new AV.Query('Offert');
        offerQuery.count().then(function (res) {
            $scope.offerCount = res;
            console.log(res);
            $scope.$apply();
        });

        var roleQuery = new AV.Query(AV.Role);
        roleQuery.get('5af3fad6fe88c2200cacea15').then(function (role) {

            var userRelation = role.getUsers();
            var query = userRelation.query();
            query.descending('createdAt');
            return query.find();
        }).then(function (results) {
            console.log('Users');
            results.forEach(function (user) {
            
                var fullName = user.get('fullName');
                var phone = user.get('mobilePhoneNumber');
                var company = user.get('company');
                console.log(fullName + ' ' + phone + company);
                $scope.users.push({fullName: fullName, phone: phone, company: company});
            });
            $scope.loading = false;
            $scope.$apply();

        }).catch(function (error) {
            console.log(error);
            $scope.loading = false;
            $scope.$apply();
        });
    }
    $scope.statistics();
};