/**
 * Login and signup Controller
 */

app.controller('NewsCtrl', ['$scope', '$state', '$rootScope', 'localStorageService', NewsCtrl])

function NewsCtrl ($scope, $state, $rootScope, localStorageService) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()

  $scope.newsArray = []
  $scope.news = {}
  $rootScope.activeList = 'news'
  $scope.skip = 0

  $scope.isIndustry = 0

  $scope.newsMedias = []
  $scope.captionContent = ''
  $scope.textContent = ''

  $scope.coreTeamImageUpdate = ''
  $scope.coreTeamImageUpdateArray = ''

  $scope.showAddBoxFlag = false
  $('#addNewsBox').addClass('ng-hide')

  $scope.initNews = function () {
    var News = AV.Object.extend('News')
    $scope.news = new News()
  }

  $scope.initNews()

  $scope.init = function () {
    var queryNews = new AV.Query('News')
    queryNews.limit(10)
    queryNews.descending('createdAt')
    queryNews.find().then(function (res) {
      $scope.newsArray = []
      res.forEach(function (element) {
        var mainImage = ''
        if (element.get('image') != null && element.get('image') != undefined)
          mainImage = element.get('image').thumbnailURL(300, 240)
        var title = element.get('title')
        var content = element.get('content')
        var id = element.get('objectId')

        $scope.newsArray.push({
          id: id,
          mainImage: mainImage,
          title: title,
          content: content
        })
        $scope.$apply()
      })

      $scope.$apply()
    }).catch(function (error) {
      $scope.$apply()
      alert(JSON.stringify(error))
    })
  }

  $scope.init()

  $scope.next = function () {
    var currentUser = AV.User.current()
    if (currentUser) {

      $scope.skip += 10
      var queryNews = new AV.Query('News')
      queryNews.limit(10)
      queryNews.descending('createdAt')
      queryNews.skip($scope.skip)
      queryNews.find().then(function (res) {
        $scope.newsArray = []
        res.forEach(function (element) {
          var mainImage = ''
          if (element.get('image') != null && element.get('image') != undefined)
            mainImage = element.get('image').thumbnailURL(300, 240)
          var title = element.get('title')
          var content = element.get('content')
          var id = element.get('objectId')

          $scope.newsArray.push({
            id: id,
            mainImage: mainImage,
            title: title,
            content: content
          })
          $scope.$apply()
        })

        $scope.$apply()
      }).catch(function (error) {
        $scope.$apply()
        alert(JSON.stringify(error))
      })
    }
  }

  $scope.previous = function () {
    if ($scope.skip >= 10) {
      var currentUser = AV.User.current()
      if (currentUser) {

        $scope.skip -= 10
        var queryNews = new AV.Query('News')
        queryNews.limit(10)
        queryNews.descending('createdAt')
        queryNews.skip($scope.skip)
        queryNews.find().then(function (res) {
          $scope.newsArray = []
          res.forEach(function (element) {
            var mainImage = ''
            if (element.get('image') != null && element.get('image') != undefined)
              mainImage = element.get('image').thumbnailURL(300, 240)
            var title = element.get('title')
            var content = element.get('content')
            var id = element.get('objectId')

            $scope.newsArray.push({
              id: id,
              mainImage: mainImage,
              title: title,
              content: content
            })
            $scope.$apply()
          })

          $scope.$apply()
        }).catch(function (error) {
          $scope.$apply()
          alert(JSON.stringify(error))
        })
      }
    }
  }

  $scope.goToNews = function (index) {
    localStorageService.cookie.set('newsId', $scope.newsArray[index].id)
    $state.go('newsView')
  }

  $scope.deleteNews = function (id) {
    var news = AV.Object.createWithoutData('News', id)
    news.destroy().then(function (n) {
      $scope.init()
    })
  }

  $scope.addNewsFunction = function () {
    if (!$scope.showAddBoxFlag) {
      $('#addNewsBox').removeClass('ng-hide')
      $scope.showAddBoxFlag = true
    }else {
      $('#addNewsBox').addClass('ng-hide')
      $scope.showAddBoxFlag = false
    }
  }

  $scope.changeValueNewsImage = function () {
    readURL($('#newsPicture')[0])
  }

  $scope.changeValueNewsImageArray = function () {
    readURLArray($('#newsPictureArray')[0])
  }

  function readURL (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#mainNewsImage').attr('src', e.target.result)
        $scope.coreTeamImageUpdate = e.target.result
        $scope.$apply()
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  function readURLArray (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#mainNewsImageArray').attr('src', e.target.result)
        $scope.coreTeamImageUpdateArray = e.target.result
        $scope.$apply()
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  $scope.addNewsMedia = function () {
    var file = $('#newsPictureArray')[0].files[0]

    if (file || $scope.captionContent != '' || $scope.textContent != '') {
      var NewsMedia = AV.Object.extend('NewsMedia')
      var media = new NewsMedia()

      if (file) {
        var name = file.name
        var avFile = new AV.File(name, file)
        media.set('image', avFile)

        readURLMediaList($('#newsPictureArray')[0], media, $scope.newsMedias.length)
      }

      
      media.set('caption', $scope.captionContent)
      media.set('content', $scope.textContent)
      media.set('news', $scope.news)

      $scope.newsMedias.push(media)

      $('#newsPictureArray').val(null)
      $scope.textContent = $scope.captionContent = ''
      $scope.coreTeamImageUpdateArray = ''
    } else {
      console.log('bad news...')
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

  $scope.deleteNewsMedia = function (index) {
    $scope.newsMedias.splice(index, 1)
  }

  $scope.publishNews = function () {
    if ($scope.title != '' && $scope.newsContent != '') {
      var currentUser = AV.User.current()
      if (currentUser) {
        $('#addNewsBox').addClass('ng-hide')
        $scope.news.set('title', $scope.title)
        $scope.news.set('creator', currentUser)

        var file = $('#newsPicture')[0].files[0]
        if (file) {
          var name = file.name
          var avFile = new AV.File(name, file)
          $scope.news.set('image', avFile)
        

          $scope.news.set('content', $scope.newsContent)

          if ($scope.isIndustry == 1) {
            $scope.news.set('type', '1')
          } else {
            $scope.news.set('type', '0')
          }

          $scope.news.save().then(function (news) {
            $scope.recursiveMediaSave($scope.newsMedias, 0)
            $scope.title = ''
            $scope.newsMedias = []
            $scope.textContent = ''
            $scope.captionContent = ''
          }, function (error) {            
            alert(JSON.stringify(error))
          })
        } else {
          alert("你需要把一个主图像")
        }
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

  $scope.orderUp = function (index) { 
    if (index > 0) {
      var objectAux = $scope.newsMedias[index]
      $scope.newsMedias[index] = $scope.newsMedias[index - 1]
      $scope.newsMedias[index - 1] = objectAux
    }
  }

  $scope.orderDown = function (index) {
    if (index < $scope.newsMedias.length - 1) {
      var objectAux = $scope.newsMedias[index]
      $scope.newsMedias[index] = $scope.newsMedias[index + 1]
      $scope.newsMedias[index + 1] = objectAux
    }
  }
}
