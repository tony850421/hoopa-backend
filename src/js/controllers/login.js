
/**
 * Login and signup Controller
 */

app.controller('LoginCtrl', ['$scope', '$state', '$rootScope', '$window', '$translate', LoginCtrl]);

function LoginCtrl($scope, $state, $rootScope, $window, $translate) {

    $scope.ptitle = $translate.instant('PTITLE');
    $rootScope.activeList = 'dashboard';
    $scope.username = '';
    $scope.password = '';
    $scope.email = '';

    $scope.notificationsMessages = false;
    $scope.notificationsOffers = false;
    $scope.notificationsMessagesCount = 0;
    $scope.notificationsOffersCount = 0;
    $scope.notificationsGeneral = false;

    $scope.login = function () {
        AV.User.logIn($scope.username, $scope.password).then(function (loginedUser) {
            // $window.location.href = '#/project-list';
            $window.location.href = '#/dashboard';
        }, function (error) {
            $window.location.href = '#/signup';
        });

    };

    $scope.signup = function () {

        var user = new AV.User();
        user.setUsername($scope.username);
        user.setPassword($scope.password);
        user.setEmail($scope.email);

        user.signUp().then(function (loginedUser) {

            var roleQuery = new AV.Query(AV.Role);
            roleQuery.equalTo('name', 'guest');
            roleQuery.find().then(function (results) {
                var role = results[0];
                var relation = role.getUsers();
                relation.add(AV.User.current());
                return role.save();
            }).then(function (role) {

            }).catch(function (error) {
                console.log(error);
            });

            $window.location.href = '#/project-list';

        }, function (error) {
            alert(JSON.stringify(error));
        });
    };

    $scope.logout = function () {
        AV.User.logOut();
        $window.location.href = '#/login';
    };

    $scope.getUser = function () {
        var currentUser = AV.User.current();
        if (currentUser) {
            return currentUser.getUsername();
        } else {
            return ' ';
        }
    };

    $scope.changeActiveList = function(text){
        $rootScope.activeList = text;
    };


    $scope.notificationsCount = function(){
        var user = AV.User.current();

        var queryInbox = new AV.Query('Message');
        queryInbox.equalTo('receiver', user);
        queryInbox.equalTo('readedAdmin', false);
        queryInbox.count().then(function (num) {
            $scope.notificationsMessagesCount = parseInt(num);
            if ($scope.notificationsMessagesCount > 0){
                $scope.notificationsMessages = true;
                $scope.notificationsGeneral = true;
            } else {
                $scope.notificationsMessages = false;
                if ($scope.notificationsMessagesCount + $scope.notificationsOffersCount == 0) {
                    $scope.notificationsGeneral = false;
                }
            }
        })

        var query = new AV.Query('Offert');
        query.equalTo('pending', true);
        query.descending('createdAt');
        query.count().then(function (num) {
            $scope.notificationsOffersCount = parseInt(num);
            if ($scope.notificationsOffersCount > 0){
                $scope.notificationsOffers = true;
                $scope.notificationsGeneral = true;
            } else {
                $scope.notificationsOffers = false;
                if ($scope.notificationsMessagesCount + $scope.notificationsOffersCount == 0) {
                    $scope.notificationsGeneral = false;
                }
            }
        })
    };

    $scope.notificationsCount();

    $scope.goToNotifications = function(){
        if ($scope.notificationsOffersCount > 0) {
            $state.go('offers');
        } else if ($scope.notificationsMessagesCount> 0){
            $state.go('inbox');
        } else {
            $state.go('offers');
        }
    };
}