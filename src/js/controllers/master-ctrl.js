/**
 * Master Controller
 */
app.controller('MasterCtrl', ['$scope', '$rootScope', '$cookieStore', '$translate', MasterCtrl])

function MasterCtrl ($scope, $rootScope, $cookieStore, $translate) {
  $rootScope.activeList = 'dashboard'
  $rootScope.notificationsMessages = false
  $rootScope.notificationsOffers = false
  $rootScope.notificationsMessagesCount = 0
  $rootScope.notificationsOffersCount = 0
  $rootScope.notificationsGeneral = false

  /**
   * Sidebar Toggle & Cookie Control
   */
  $scope.changeLanguage = function (key) {
    $translate.use(key)
  }

  $scope.setLanguage = function () {
    $translate.use('ch_CH')
  }

  $scope.setLanguage()

  var mobileView = 992

  $scope.print = function () {
    console.log('hola master...')
  }

  $scope.print()

  $scope.getWidth = function () {
    return window.innerWidth
  }

  $scope.$watch($scope.getWidth, function (newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true
      } else {
        $scope.toggle = true
      }
    } else {
      $scope.toggle = false
    }
  })

  $scope.toggleSidebar = function () {
    $scope.toggle = !$scope.toggle
    $cookieStore.put('toggle', $scope.toggle)
  }

  window.onresize = function () {
    $scope.$apply()
  }
}
