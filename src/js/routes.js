'use strict'

/**
 * Route configuration for the RDash module.
 */
app.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
  function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/')

    // Application routes
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'templates/dashboard.html'
      }).state('tables', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html'
    }).state('new-project', {
      url: '/new-project',
      templateUrl: 'templates/new-project.html'
    }).state('project-list', {
      url: '/project-list',
      templateUrl: 'templates/project-list.html'
    }).state('offers', {
      url: '/offers',
      templateUrl: 'templates/offers.html'
    }).state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html'
    }).state('inbox', {
      url: '/inbox',
      templateUrl: 'templates/inbox.html'
    }).state('update', {
      url: '/update',
      templateUrl: 'templates/update-project.html'
    }).state('messages', {
      url: '/messages',
      templateUrl: 'templates/messages.html'
    }).state('new-news', {
      url: '/new-news',
      templateUrl: 'templates/new-news.html'
    }).state('news', {
      url: '/news',
      templateUrl: 'templates/news.html'
    }).state('forum', {
      url: '/forum',
      templateUrl: 'templates/forum.html'
    }).state('view-project', {
      url: '/view-project',
      templateUrl: 'templates/view-project.html'
    }).state('newsView', {
      url: '/newsView',
      templateUrl: 'templates/newsView.html'
    }).state('slider', {
      url: '/slider',
      templateUrl: 'templates/sliderConfig.html'
    }).state('usersView', {
      url: '/usersView',
      templateUrl: 'templates/usersView.html'
    }).state('advView', {
      url: '/advView',
      templateUrl: 'templates/advView.html'
    }).state('coreTeamView', {
      url: '/coreTeam',
      templateUrl: 'templates/coreTeam.html'
    }).state('hoopaBranchesView', {
      url: '/hoopaBranchs',
      templateUrl: 'templates/hoopaBranches.html'
    }).state('cities', {
      url: '/cities',
      templateUrl: 'templates/cities.html'
    }).state('structure', {
      url: '/structure',
      templateUrl: 'templates/structure.html'
    }).state('group', {
      url: '/group',
      templateUrl: 'templates/groupIntroduction.html'
    }).state('business', {
      url: '/business',
      templateUrl: 'templates/businessSystem.html'
    }).state('services', {
      url: '/services',
      templateUrl: 'templates/servicesProcess.html'
    }).state('honor', {
      url: '/honor',
      templateUrl: 'templates/honor.html'
    }).state('history', {
      url: '/history',
      templateUrl: 'templates/history.html'
    }).state('cases', {
      url: '/cases',
      templateUrl: 'templates/featuredCase.html'
    }).state('featuredcase', {
      url: '/featuredcase',
      templateUrl: 'templates/viewCase.html'
    })
  }
])

app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('Hoopa')
    .setStorageType('sessionStorage')
    .setNotify(true, true)
}])

app.filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return ''

    max = parseInt(max, 10)
    if (!max) return value
    if (value.length <= max) return value

    value = value.substr(0, max)
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ')
      if (lastspace !== -1) {
        // Also remove . and , so its gives a cleaner result.
        if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
          lastspace = lastspace - 1
        }
        value = value.substr(0, lastspace)
      }
    }

    return value + (tail || ' …')
  }
})
