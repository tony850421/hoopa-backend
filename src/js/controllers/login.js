
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

    $scope.alertsLogin = [];
    $scope.registered = false;

    $scope.closeAlertLogin = function(index) {
        $scope.alertsLogin.splice(index, 1);
    };

    $scope.login = function () {

        // AV.User.loginWithAuthData({
        //     openid: 'oRW061NUAnB26YfdJUsD8yJBGHTE',
        //     access_token: '10_bfas9qeJP6QVdON8_wcdSjWrLZac5j3n5R-jBlVV7V_eiGy5TWT4vRvDRTgHNA_oFnoWF7nlmwTnpDw0y-qmug',
        //     expires_in: 1382686496
        //   }, 'weixin').then(function(user) {
        //     console.log(user);
        //   }).catch(function(error) {
        //     console.error("error: ", error);
        //   });

        //   AV.User.loginWithAuthDataAndUnionId({
        //     openid: 'oRW061NUAnB26YfdJUsD8yJBGHTE',
        //     access_token: '10_bfas9qeJP6QVdON8_wcdSjWrLZac5j3n5R-jBlVV7V_eiGy5TWT4vRvDRTgHNA_oFnoWF7nlmwTnpDw0y-qmug',
        //     expires_in: 1382686496
        //   }, 'weixin', 'olpwM1LonD1SaJUVtfKbic56lbA8', {
        //     unionIdPlatform: 'weixin',
        //     asMainAccount: true,
        //   }).then(function(user) {
        //     console.log(user);
        //   }).catch(function(error) {
        //     console.error("error: ", error);
        //   });

        $scope.alertsLogin = [];
        var alert = "Login error";

        AV.User.logIn($scope.username, $scope.password).then(function (loginedUser) {

            var roleQuery = new AV.Query(AV.Role);
            roleQuery.equalTo('users', loginedUser);
            roleQuery.find().then(function(results) {
                var isAdmin = false;
                results.forEach( function(element) {
                    if(element.get('name') == 'Admin') {
                        isAdmin = true;
                    }
                });
                console.log('Is admin: ' + isAdmin);
                if(isAdmin) {
                    $scope.notificationsCount();
                    $window.location.href = '#/dashboard';
                } else {
                    alert = $translate.instant('ALERTLOGIN3');
                    $scope.alertsLogin.push({type: 'danger', msg: alert});

                    AV.User.logOut();

                    $scope.$apply();
                }
            });

        }, function (error) {

            switch(error.code){
                case 210:
                    alert = $translate.instant('ALERTLOGIN1');
                    break;
                case 211:
                    alert = $translate.instant('ALERTLOGIN2');
                    break;
                default:
                    alert = $translate.instant('ALERTLOGIN0');
            }
            
            $scope.alertsLogin.push({type: 'danger', msg: alert});
            $scope.$apply();
            // $window.location.href = '#/signup';
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

            var alert = $translate.instant('ALERTREGISTER');
            $scope.alertsLogin.push({type: 'success', msg: alert});

            $scope.registered = true;
            AV.User.logOut();
            $scope.$apply();

            // $window.location.href = '#/project-list';

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
            var admin = AV.Object.createWithoutData('_User', '5af264c07f6fd3003895d3a2');

            var queryInbox = new AV.Query('Message');
            queryInbox.equalTo('receiver', admin);
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
            querySocketMessage.equalTo('receiver', admin);
            querySocketMessage.subscribe().then(function (liveQuery) {
                liveQuery.on('create', function (message) {

                    var queryInbox = new AV.Query('Message');
                    queryInbox.equalTo('receiver', admin);
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

            var querySocketMessage1 = new AV.Query('Message');
            querySocketMessage1.equalTo('receiver', admin);
            querySocketMessage1.subscribe().then(function (liveQuery) {
                liveQuery.on('update', function (message) {

                    var queryInbox = new AV.Query('Message');
                    queryInbox.equalTo('receiver', admin);
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
                liveQuery.on('create', function (offer) {    
                    console.log('querySocketOffers');
                    var query = new AV.Query('Offert');
                    query.equalTo('pending', true);
                    query.count().then(function (num) {
                        $rootScope.notificationsOffersCount = parseInt(num);
                        console.log('count ' + $rootScope.notificationsOffersCount);
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
            
            var querySocketOffers1 = new AV.Query('Offert');
            querySocketOffers1.subscribe().then(function (liveQuery) {
                liveQuery.on('update', function (offer, updatedKeys) {    
                    console.log('querySocketOffers update');      
                    var query = new AV.Query('Offert');
                    query.equalTo('pending', true);
                    query.count().then(function (num) {
                        $rootScope.notificationsOffersCount = parseInt(num);
                        console.log('count ' + $rootScope.notificationsOffersCount);
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