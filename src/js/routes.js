'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

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
                templateUrl: 'templates/login.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('new-project', {
                url: '/new-project',
                templateUrl: 'templates/new-project.html'
            })
            .state('project-list', {
                url: '/project-list',
                templateUrl: 'templates/project-list.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html'
            });
    }
]);