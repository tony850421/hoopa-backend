app.controller('NewsViewCtrl', ['$scope', '$rootScope', '$window', '$timeout', 'localStorageService', '$state', NewsViewCtrl])

function NewsViewCtrl ($scope, $rootScope, $window, $timeout, localStorageService, $state) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()

  $scope.new = {}
  $scope.newsMedia = []

  $scope.newsTitle = ''

  $scope.init = function () {
    var id = localStorageService.cookie.get('newsId')

    var query = new AV.Query('News')
    query.get(id).then(function (n) {
      $scope.newsTitle = n.get('title')
      $scope.mainImage = n.get('image').get('url')
      $scope.newsContent = n.get('content')
      $scope.newsId = n.get('objectId')
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

  $scope.updateNewsTitle = function () {
    $scope.newsTitle = $('#updateNewsTitle').val()
  }

  $scope.editNewsTitle = function (title) {
    $scope.newsTitle = title
    $('#newsTitle').addClass('ng-hide')
    $('#updateNewsTitle').removeClass('ng-hide')
    $('#editNewsTitle').addClass('ng-hide')
    $('#saveNewsTitle').removeClass('ng-hide')
  }

  $scope.saveNewsTitle = function (id) {
    $('#newsTitle').removeClass('ng-hide')
    $('#updateNewsTitle').addClass('ng-hide')
    $('#editNewsTitle').removeClass('ng-hide')
    $('#saveNewsTitle').addClass('ng-hide')

    if ($scope.newsTitle != '') {
      var news = AV.Object.createWithoutData('News', id)
      news.set('title', $scope.newsTitle)
      news.save()
    }
  }

  $scope.updateNewsContent = function () {
    $scope.newsContent = $('#updateNewsContent').val()
  }

  $scope.editNewsContent = function (title) {
    $scope.newsContent = title
    $('#newsContent').addClass('ng-hide')
    $('#updateNewsContent').removeClass('ng-hide')
    $('#editNewsContent').addClass('ng-hide')
    $('#saveNewsContent').removeClass('ng-hide')
  }

  $scope.saveNewsContent = function (id) {
    $('#newsContent').removeClass('ng-hide')
    $('#updateNewsContent').addClass('ng-hide')
    $('#editNewsContent').removeClass('ng-hide')
    $('#saveNewsContent').addClass('ng-hide')

    if ($scope.newsContent != '') {
      var news = AV.Object.createWithoutData('News', id)
      news.set('content', $scope.newsContent)
      news.save()
    }
  }
}
