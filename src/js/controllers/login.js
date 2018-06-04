
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

    $rootScope.notificationsMessages = false;
    $rootScope.notificationsOffers = false;
    $rootScope.notificationsMessagesCount = 0;
    $rootScope.notificationsOffersCount = 0;
    $rootScope.notificationsGeneral = false;

    $scope.login = function () {
        AV.User.logIn($scope.username, $scope.password).then(function (loginedUser) {
            // $window.location.href = '#/project-list';
            $scope.notificationsCount();

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


    $scope.notificationsCount = function() {

        var user = AV.User.current();

        if(user) {
            var queryInbox = new AV.Query('Message');
            queryInbox.equalTo('receiver', user);
            queryInbox.equalTo('readedAdmin', false);
            queryInbox.count().then(function (num) {
                $rootScope.notificationsMessagesCount = parseInt(num);
                if ($rootScope.notificationsMessagesCount > 0){
                    $rootScope.notificationsMessages = true;
                    $rootScope.notificationsGeneral = true;
                } else {
                    $rootScope.notificationsMessages = false;
                    if ($rootScope.notificationsMessagesCount + $rootScope.notificationsOffersCount == 0) {
                        $rootScope.notificationsGeneral = false;
                    } else {
                        $rootScope.notificationsGeneral = true;
                    }
                }
            })
    
            var query = new AV.Query('Offert');
            query.equalTo('pending', true);
            query.count().then(function (num) {
                $rootScope.notificationsOffersCount = parseInt(num);
                if ($rootScope.notificationsOffersCount > 0){
                    $rootScope.notificationsOffers = true;
                    $rootScope.notificationsGeneral = true;
                } else {
                    $rootScope.notificationsOffers = false;
                    if ($rootScope.notificationsMessagesCount + $rootScope.notificationsOffersCount == 0) {
                        $rootScope.notificationsGeneral = false;
                    } else {
                        $rootScope.notificationsGeneral = true;
                    }
                }
            })
    
            var querySocketMessage = new AV.Query('Message');
            querySocketMessage.equalTo('receiver', user);
            querySocketMessage.subscribe().then(function (liveQuery) {
                liveQuery.on('create', function (message) {

                    var queryInbox = new AV.Query('Message');
                    queryInbox.equalTo('receiver', user);
                    queryInbox.equalTo('readedAdmin', false);
                    queryInbox.count().then(function (num) {

                        $rootScope.notificationsMessagesCount = parseInt(num);
                        if ($rootScope.notificationsMessagesCount > 0) {
                            $rootScope.notificationsMessages = true;
                            $rootScope.notificationsGeneral = true;
                        } else {
                            $rootScope.notificationsMessages = false;
                            if ($rootScope.notificationsMessagesCount + $rootScope.notificationsOffersCount == 0) {
                                $rootScope.notificationsGeneral = false;
                            } else {
                                $rootScope.notificationsGeneral = true;
                            }
                        }
                        $scope.$apply();
                    })

                    $scope.$apply();
                })
            })
    
            var querySocketOffers = new AV.Query('Offert');
            querySocketOffers.equalTo('pending', true);
            querySocketOffers.subscribe().then(function (liveQuery) {
                liveQuery.on('create', function (message) {                
                    var query = new AV.Query('Offert');
                    query.equalTo('pending', true);
                    query.count().then(function (num) {
                        $rootScope.notificationsOffersCount = parseInt(num);
                        if ($rootScope.notificationsOffersCount > 0){
                            $rootScope.notificationsOffers = true;
                            $rootScope.notificationsGeneral = true;
                        } else {
                            $rootScope.notificationsOffers = false;
                            if ($rootScope.notificationsMessagesCount + $rootScope.notificationsOffersCount == 0) {
                                $rootScope.notificationsGeneral = false;
                            } else {
                                $rootScope.notificationsGeneral = true;
                            }
                        }
                        $scope.$apply();
                    })
                    $scope.$apply();
                })
            })    
        }
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

    $scope.goToDashboard = function(){
        $state.go('tables');
    };
}