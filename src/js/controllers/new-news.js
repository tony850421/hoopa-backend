/**
 * Login and signup Controller
 */

app.controller('NewNewsCtrl', ['$scope', '$state', '$rootScope', '$window', '$timeout', NewNewsCtrl])

function NewNewsCtrl ($scope, $state, $rootScope, $window, $timeout) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $scope.newsMedias = []
  $rootScope.activeList = 'newnews'

  $scope.title = ''
  $scope.newsContent = ''
  $scope.caption = ''
  $scope.content = ''
  $scope.isIndustry = false

  $scope.fileModal = ''

  $scope.news = {}

  $scope.changeValueMainImage = function () {
    readURL($('#newsFile')[0])
  }

  $scope.initNews = function () {
    var News = AV.Object.extend('News')
    $scope.news = new News()
  }
  $scope.initNews()

  $scope.addNewsMedia = function () {
    var file = $('#inputFile')[0].files[0]

    if (file || $scope.caption != '' || $scope.content != '') {
      var NewsMedia = AV.Object.extend('NewsMedia')
      var media = new NewsMedia()

      if (file) {
        var name = file.name
        var avFile = new AV.File(name, file)
        media.set('image', avFile)

        readURLMediaList($('#inputFile')[0], media, $scope.newsMedias.length)
      }

      media.set('caption', $scope.caption)
      media.set('content', $scope.content)
      media.set('news', $scope.news)

      $scope.newsMedias.push(media)

      $('#inputFile').val(null)
      $scope.content = $scope.caption = ''
    } else {
      console.log('bad news...')
    }
  }

  $scope.deleteNewsMedia = function (index) {
    $scope.newsMedias.splice(index, 1)
  }

  $scope.publishNews = function () {
    if ($scope.title != '' && $scope.newsContent != '') {
      var currentUser = AV.User.current()
      if (currentUser) {
        $scope.news.set('title', $scope.title)
        $scope.news.set('creator', currentUser)

        var file = $('#newsFile')[0].files[0]
        if (file) {
          var name = file.name
          var avFile = new AV.File(name, file)
          $scope.news.set('image', avFile)
        }

        $scope.news.set('content', $scope.newsContent)

        if ($scope.isIndustry) {
          $scope.news.set('type', '1')
        } else {
          $scope.news.set('type', '0')
        }

        $scope.news.save().then(function (news) {
          $scope.recursiveMediaSave($scope.newsMedias, 0)
          $state.go('news')
        }, function (error) {
          alert(JSON.stringify(error))
        })
      } else {
        $window.location.href = '#/login'
      }
    } else {
      console.log('insert news title')
    }
  }

  $scope.recursiveMediaSave = function (arrayObj, index) {
    if (index < arrayObj.length) {
      arrayObj[index].save().then(function (obj) {
        $scope.recursiveMediaSave(arrayObj, index + 1)
      }, function (error) {
        console.log(JSON.stringify(error))
      })
    }
  }

  function readURL (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#mainImage').attr('src', e.target.result)
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  function readURLMediaList (input, media, length) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        if (length < $scope.newsMedias.length) {
          $scope.newsMedias[length].set('imageUrl', e.target.result)
        } else {
          media.set('imageUrl', e.target.result)
        }
        $scope.$apply()
      }

      reader.readAsDataURL(input.files[0])
    }
  }
}
