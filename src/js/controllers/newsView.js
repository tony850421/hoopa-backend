app.controller('NewsViewCtrl', ['$scope', '$rootScope', '$window', '$timeout', 'localStorageService', NewsViewCtrl])

function NewsViewCtrl ($scope, $rootScope, $window, $timeout, localStorageService) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $scope.new = {}
  $scope.newsMedia = []

  $scope.init = function () {
    var id = localStorageService.cookie.get('newsId')

    var query = new AV.Query('News')
    query.get(id).then(function (n) {
      $scope.new = n

      var queryMedias = new AV.Query('NewsMedia')
      queryMedias.equalTo('news', n)
      queryMedias.find().then(function (mediasObject) {
        $scope.newsMedia = mediasObject
        $scope.$apply()
      })

      $scope.$apply()
    })
  }

  $scope.init()
}
