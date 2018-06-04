app.controller('DashBoardCtrl', ['$scope', '$rootScope', '$window', '$timeout', '$state', DashBoardCtrl]);

function DashBoardCtrl($scope, $rootScope, $window, $timeout, $state) {

    $scope.getUser = function () {
        var currentUser = AV.User.current();
        if (!currentUser) {
            $state.go('login');
        }
    };

    $scope.getUser();

    $scope.loading = false;
    $rootScope.activeList = 'dashboard';

    $scope.userCount = 0;
    $scope.packageCount = 0;
    $scope.visitCount = 0;
    $scope.offerCount = 0;

    $scope.users = [];

    $scope.statistics = function () {

        var currentUser = AV.User.current();

        if (currentUser) {

            $scope.loading = true;

            var userQuery = new AV.Query('_User');
            userQuery.count().then(function (res) {
                $scope.userCount = res;
                $scope.$apply();
            });

            var projectQuery = new AV.Query('Project');
            projectQuery.count().then(function (res) {
                $scope.packageCount = res;
                $scope.$apply();
            });

            var visitQuery = new AV.Query('ProjectVisit');
            visitQuery.count().then(function (res) {
                $scope.visitCount = res;
                $scope.$apply();
            });

            var offerQuery = new AV.Query('Offert');
            offerQuery.count().then(function (res) {
                $scope.offerCount = res;
                $scope.$apply();
            });

            var roleQuery = new AV.Query(AV.Role);
            roleQuery.get('5af3fad6fe88c2200cacea15').then(function (role) {

                var userRelation = role.getUsers();
                var query = userRelation.query();
                query.descending('createdAt');
                return query.find();
            }).then(function (results) {
                results.forEach(function (user) {

                    var fullName = user.get('fullName');
                    var phone = user.get('mobilePhoneNumber');
                    var company = user.get('company');
                    $scope.users.push({ fullName: fullName, phone: phone, company: company });
                });
                $scope.loading = false;
                $scope.$apply();

            }).catch(function (error) {
                $scope.loading = false;
                $scope.$apply();
            });
        } else {
            $window.location.href = '#/login';
        }
    };
    $scope.statistics();

    $scope.goToProjects = function(){
        $state.go('project-list');
    };

    $scope.goToOffer = function(){
        $state.go('offers');
    };
};