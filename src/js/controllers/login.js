
/**
 * Login and signup Controller
 */

angular
    .module('RDash')
    .controller('LoginCtrl', ['$scope', '$window', '$translate', LoginCtrl]);

function LoginCtrl($scope, $window, $translate) {

    $scope.ptitle = $translate.instant('PTITLE');

    $scope.username = '';
    $scope.password = '';
    $scope.email = '';

    // $scope.changeLanguage = function (key) {
    //     console.log('changeLanguage LoginCtrl'+ key);
    //     $translate.use(key);
    // };

    $scope.login = function () {
        console.log('login:' + $scope.username + ' ' + $scope.password);

        AV.User.logIn($scope.username, $scope.password).then(function (loginedUser) {
            $window.location.href = '#/project-list';
        }, function (error) {
            $window.location.href = '#/signup';
        });

    };

    $scope.signup = function () {
        console.log('signup:' + $scope.username + ' ' + $scope.password + ' ' + $scope.email);

        var user = new AV.User();
        user.setUsername($scope.username);
        user.setPassword($scope.password);
        user.setEmail($scope.email);

        user.signUp().then(function (loginedUser) {

            console.log("signedUser");
            console.log(loginedUser);

            var roleQuery = new AV.Query(AV.Role);
            roleQuery.equalTo('name', 'guest');
            roleQuery.find().then(function (results) {
                var role = results[0];
                var relation = role.getUsers();
                relation.add(AV.User.current());
                return role.save();
            }).then(function (role) {
                console.log("role asigned ok");
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
    }

    $scope.getUser = function () {
        var currentUser = AV.User.current();
        if (currentUser) {
            return currentUser.getUsername();
        } else {
            return ' ';
        }
    }
}