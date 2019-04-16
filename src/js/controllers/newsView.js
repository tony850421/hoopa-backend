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

  $scope.changeValueMainImage = function () {
    readURL($('#updateMainImageNews')[0])
  }

  $scope.changeValueContentImage = function (index) {
    var id = '#updateImageNewsContent_' + index
    readURLContent($(id)[0], index)
  }

  function readURL (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      var file = $(id)[0].files[0]
      var name = file.name
      var avFile = new AV.File(name, file)

      reader.onload = function (e) {
        $('#mainImageNews').attr('src', e.target.result)
        $scope.mainImage = e.target.result

        var news = AV.Object.createWithoutData('News', newsId)
        news.set('image', avFile)
        news.save()
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  function readURLContent (input, index) {
    var id = '#updateImageNewsContent_' + index
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      var file = $(id)[0].files[0]
      var name = file.name
      var avFile = new AV.File(name, file)

      for (var i = 0; i < $scope.newsMedia.length; i++) {
        if (i == index) {
          var city = AV.Object.createWithoutData('NewsMedia', $scope.newsMedia[i].get('objectId'))
          city.set('image', avFile)
          city.save().then(function (res) {
            $scope.init()
          })
        }
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  $scope.updateNewsCaptionList = function (index) {
    var id = '#updateNewsCaption_'+index
    $scope.newsCaptionList = $(id).val()
  }

  $scope.editNewsCaptionList = function (index, content) {
    $scope.newsCaptionList = content
    id1 = '#newsCaption_' + index
    id2 = '#updateNewsCaption_' + index
    id3 = '#editNewsCaption_' + index
    id4 = '#saveNewsCaption_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveNewsCaption = function (index, id) {
    id1 = '#newsCaption_' + index
    id2 = '#updateNewsCaption_' + index
    id3 = '#editNewsCaption_' + index
    id4 = '#saveNewsCaption_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.newsMedia.length; i++) {
      if ($scope.newsMedia[i].get('objectId') == id) {
        $scope.newsMedia[i].set('caption') = $scope.newsCaptionList
        break
      }
    }

    if ($scope.newsCaptionList != '') {
      var news = AV.Object.createWithoutData('NewsMedia', id)
      news.set('caption', $scope.newsCaptionList)
      news.save()
    }
  }

  $scope.updateNewsContentList = function (index) {
    var id = '#updateNewsContent_'+index
    $scope.newsContentList = $(id).val()
  }

  $scope.editNewsContentList = function (index, content) {
    $scope.newsContentList = content
    id1 = '#newsContent_' + index
    id2 = '#updateNewsContent_' + index
    id3 = '#editNewsContent_' + index
    id4 = '#saveNewsContent_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveNewsContent = function (index, id) {
    id1 = '#newsContent_' + index
    id2 = '#updateNewsContent_' + index
    id3 = '#editNewsContent_' + index
    id4 = '#saveNewsContent_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.newsMedia.length; i++) {
      if ($scope.newsMedia[i].get('objectId') == id) {
        $scope.newsMedia[i].set('caption') = $scope.newsContentList
        break
      }
    }

    if ($scope.newsContentList != '') {
      var news = AV.Object.createWithoutData('NewsMedia', id)
      news.set('caption', $scope.newsContentList)
      news.save()
    }
  }
}
