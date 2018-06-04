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
    $scope.projectsWithOffers = [];

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

        var projectWithOffers = new AV.Query('Offert');
        projectWithOffers.include('project');
        projectWithOffers.find().then(function (p) {

            p.forEach(function (pro) {
                var title = pro.get('project').get('title');
                var company = pro.get('project').get('companyName');
                var debit = pro.get('project').get('debitAmount');
                var offerAmount = pro.get('amount');

                var flagProject = false;
                $scope.projectsWithOffers.forEach(function (proWO) {
                    if (proWO.id == pro.id) {
                        flagProject = true;
                    }
                })
                if (!flagProject) {
                    $scope.projectsWithOffers.push({
                        title: title,
                        company: company,
                        debit: debit,
                        offerAmount: offerAmount
                    });
                }
                $scope.$apply();
            })
        })
    };
    $scope.statistics();

    $scope.goToProjects = function () {
        $state.go('project-list');
    };

    $scope.goToOffer = function () {
        $state.go('offers');
    };

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ]
        }
    };

    $scope.chartLineInit = function () {
        $scope.labels = [];
        $scope.data = [];
        $scope.serie1 = []
        $scope.series = ['Visits'];

        var d = new Date();
        var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 000);

        var visitQuery = new AV.Query('ProjectVisit');
        var dateAM = new Date(date - 86400000);
        var datePM = date;
        $scope.labels[6] = datePM.getDate() + "/" + datePM.getMonth();
        visitQuery.lessThanOrEqualTo('createdAt', datePM);
        visitQuery.greaterThanOrEqualTo('createdAt', dateAM);
        visitQuery.count().then(function (res) {
            $scope.serie1[6] = res;
        });

        var visitQuery1 = new AV.Query('ProjectVisit');
        dateAM = new Date(date - (2 * 86400000));
        datePM = new Date(date - 86400000);
        $scope.labels[5] = datePM.getDate() + "/" + datePM.getMonth();
        visitQuery1.lessThanOrEqualTo('createdAt', datePM);
        visitQuery1.greaterThanOrEqualTo('createdAt', dateAM);
        visitQuery1.count().then(function (res) {
            $scope.serie1[5] = res;
        });

        var visitQuery2 = new AV.Query('ProjectVisit');
        dateAM = new Date(date - (3 * 86400000));
        datePM = new Date(date - (2 * 86400000));
        $scope.labels[4] = datePM.getDate() + "/" + datePM.getMonth();
        visitQuery2.lessThanOrEqualTo('createdAt', datePM);
        visitQuery2.greaterThanOrEqualTo('createdAt', dateAM);
        visitQuery2.count().then(function (res) {
            $scope.serie1[4] = res;
        });

        var visitQuery3 = new AV.Query('ProjectVisit');
        dateAM = new Date(date - (4 * 86400000));
        datePM = new Date(date - (3 * 86400000));
        $scope.labels[3] = datePM.getDate() + "/" + datePM.getMonth();
        visitQuery3.lessThanOrEqualTo('createdAt', datePM);
        visitQuery3.greaterThanOrEqualTo('createdAt', dateAM);
        visitQuery3.count().then(function (res) {
            $scope.serie1[3] = res;
        });

        var visitQuery4 = new AV.Query('ProjectVisit');
        dateAM = new Date(date - (5 * 86400000));
        datePM = new Date(date - (4 * 86400000));
        $scope.labels[2] = datePM.getDate() + "/" + datePM.getMonth();
        visitQuery4.lessThanOrEqualTo('createdAt', datePM);
        visitQuery4.greaterThanOrEqualTo('createdAt', dateAM);
        visitQuery4.count().then(function (res) {
            $scope.serie1[2] = res;
        });

        var visitQuery5 = new AV.Query('ProjectVisit');
        dateAM = new Date(date - (6 * 86400000));
        datePM = new Date(date - (5 * 86400000));
        $scope.labels[1] = datePM.getDate() + "/" + datePM.getMonth();
        visitQuery5.lessThanOrEqualTo('createdAt', datePM);
        visitQuery5.greaterThanOrEqualTo('createdAt', dateAM);
        visitQuery5.count().then(function (res) {
            $scope.serie1[1] = res;
        });

        var visitQuery6 = new AV.Query('ProjectVisit');
        dateAM = new Date(date - (7 * 86400000));
        datePM = new Date(date - (6 * 86400000));
        $scope.labels[0] = datePM.getDate() + "/" + datePM.getMonth();
        visitQuery6.lessThanOrEqualTo('createdAt', datePM);
        visitQuery6.greaterThanOrEqualTo('createdAt', dateAM);
        visitQuery6.count().then(function (res) {
            $scope.serie1[0] = res;
        });

        $scope.data.push($scope.serie1);
    };

    $scope.chartLineInit();

    $scope.chartLineUsersInit = function () {
        $scope.labelsUsers = [];
        $scope.dataUsers = [];
        $scope.serieUsers = []
        $scope.seriesUsers = ['Users'];

        var d = new Date();
        var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 000);

        var roleQuery = new AV.Query(AV.Role);
        roleQuery.get('5af3fad6fe88c2200cacea15').then(function (role) {
            var userRelation = role.getUsers();

            var query = userRelation.query();
            var dateAM = new Date(date - 86400000);
            var datePM = date;
            $scope.labelsUsers[6] = datePM.getDate() + "/" + datePM.getMonth();
            query.lessThanOrEqualTo('createdAt', datePM);
            query.greaterThanOrEqualTo('createdAt', dateAM);
            query.count().then(function (count) {
                $scope.serieUsers[6] = count;
                $scope.$apply();
            })

            var query1 = userRelation.query();
            dateAM = new Date(date - (2 * 86400000));
            datePM = new Date(date - 86400000);
            $scope.labelsUsers[5] = datePM.getDate() + "/" + datePM.getMonth();
            query1.lessThanOrEqualTo('createdAt', datePM);
            query1.greaterThanOrEqualTo('createdAt', dateAM);
            query1.count().then(function (count) {
                $scope.serieUsers[5] = count;
                $scope.$apply();
            })

            var query2 = userRelation.query();
            dateAM = new Date(date - (3 * 86400000));
            datePM = new Date(date - (2 * 86400000));
            $scope.labelsUsers[4] = datePM.getDate() + "/" + datePM.getMonth();
            query2.lessThanOrEqualTo('createdAt', datePM);
            query2.greaterThanOrEqualTo('createdAt', dateAM);
            query2.count().then(function (count) {
                $scope.serieUsers[4] = count;
                $scope.$apply();
            })

            var query3 = userRelation.query();
            dateAM = new Date(date - (4 * 86400000));
            datePM = new Date(date - (3 * 86400000));
            $scope.labelsUsers[3] = datePM.getDate() + "/" + datePM.getMonth();
            query3.lessThanOrEqualTo('createdAt', datePM);
            query3.greaterThanOrEqualTo('createdAt', dateAM);
            query3.count().then(function (count) {
                $scope.serieUsers[3] = count;
                $scope.$apply();
            })

            var query4 = userRelation.query();
            dateAM = new Date(date - (5 * 86400000));
            datePM = new Date(date - (4 * 86400000));
            $scope.labelsUsers[2] = datePM.getDate() + "/" + datePM.getMonth();
            query4.lessThanOrEqualTo('createdAt', datePM);
            query4.greaterThanOrEqualTo('createdAt', dateAM);
            query4.count().then(function (count) {
                $scope.serieUsers[2] = count;
                $scope.$apply();
            })

            var query5 = userRelation.query();
            dateAM = new Date(date - (6 * 86400000));
            datePM = new Date(date - (5 * 86400000));
            $scope.labelsUsers[1] = datePM.getDate() + "/" + datePM.getMonth();
            query5.lessThanOrEqualTo('createdAt', datePM);
            query5.greaterThanOrEqualTo('createdAt', dateAM);
            query5.count().then(function (count) {
                $scope.serieUsers[1] = count;
                $scope.$apply();
            })

            var query6 = userRelation.query();
            dateAM = new Date(date - (7 * 86400000));
            datePM = new Date(date - (6 * 86400000));
            $scope.labelsUsers[0] = datePM.getDate() + "/" + datePM.getMonth();
            query6.lessThanOrEqualTo('createdAt', datePM);
            query6.greaterThanOrEqualTo('createdAt', dateAM);
            query6.count().then(function (count) {
                $scope.serieUsers[0] = count;
                $scope.$apply();
            })
        })

        $scope.dataUsers.push($scope.serieUsers);
    };

    $scope.chartLineUsersInit();
};