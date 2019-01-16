'use strict';

/**
 * Route configuration for the RDash module.
 */
app.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
    function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            // .state('index', {
            //     url: '/',
            //     templateUrl: 'templates/dashboard.html'
            // })
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html'
            })
            .state('new-project', {
                url: '/new-project',
                templateUrl: 'templates/new-project.html'
            })
            .state('project-list', {
                url: '/project-list',
                templateUrl: 'templates/project-list.html'
            })
            .state('offers', {
                url: '/offers',
                templateUrl: 'templates/offers.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html'
            })
            .state('inbox', {
                url: '/inbox',
                templateUrl: 'templates/inbox.html'
            })
            .state('update', {
                url: '/update',
                templateUrl: 'templates/update-project.html'
            })
            .state('messages', {
                url: '/messages',
                templateUrl: 'templates/messages.html'
            })
            .state('new-news', {
                url: '/new-news',
                templateUrl: 'templates/new-news.html'
            })
            .state('news', {
                url: '/news',
                templateUrl: 'templates/news.html'
            })
            .state('forum', {
                url: '/forum',
                templateUrl: 'templates/forum.html'
            })
            .state('view-project', {
                url: '/view-project',
                templateUrl: 'templates/view-project.html'
            })
            .state('newsView', {
                url: '/newsView',
                templateUrl: 'templates/newsView.html'
            })
            .state('slider', {
                url: '/slider',
                templateUrl: 'templates/sliderConfig.html'
            })
            .state('usersView', {
                url: '/usersView',
                templateUrl: 'templates/usersView.html'
            }).state('advView', {
                url: '/advView',
                templateUrl: 'templates/advView.html'
            }).state('coreTeamView', {
                url: '/coreTeam',
                templateUrl: 'templates/coreTeam.html'
            }).state('hoopaBranchesView', {
                url: '/hoopaBranches',
                templateUrl: 'templates/hoopaBranches.html'
            });
    }
]);

app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('Hoopa')
        .setStorageType('sessionStorage')
        .setNotify(true, true)
}]);