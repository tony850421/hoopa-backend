app.controller('FeaturedCaseCtrl', ['$scope', '$state', '$rootScope', '$window', '$timeout', 'localStorageService', FeaturedCaseCtrl])

function FeaturedCaseCtrl ($scope, $state, $rootScope, $window, $timeout, localStorageService) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()

  $scope.loading = false

  $rootScope.activeList = 'cases'
  $scope.coreTeamImageUpdate = ''
  $scope.coreTeamImageUpdateArray = ''

  $scope.newsCases = []
  $scope.cases = []
  $scope.case = {}

  $scope.title = ''

  $scope.showAddBoxFlag = false
  $('#addNewsBox').addClass('ng-hide')

  $scope.initNews = function () {
    var Case = AV.Object.extend('FeaturedCase')
    $scope.case = new Case()
  }

  $scope.initNews()

  $scope.init = function () {
    var queryCase = new AV.Query('FeaturedCase')
    queryCase.find().then(function (res) {
      $scope.cases = []
      res.forEach(function (element) {
        var mainImage = ''
        if (element.get('image') != null && element.get('image') != undefined)
          mainImage = element.get('image').thumbnailURL(300, 240)
        var title = element.get('title')
        var id = element.get('objectId')

        $scope.cases.push({
          id: id,
          mainImage: mainImage,
          title: title
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

  $scope.changeValueNewsImage = function () {
    readURL($('#newsPicture')[0])
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

  $scope.changeValueNewsImageArray = function () {
    readURLArray($('#newsPictureArray')[0])
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

  $scope.addCasesMedia = function () {
    var file = $('#newsPictureArray')[0].files[0]

    if (file || $scope.captionContent != '' || $scope.textContent != '') {
      var NewsMedia = AV.Object.extend('FeaturedCaseMedia')
      var media = new NewsMedia()

      if (file) {
        var name = file.name
        var avFile = new AV.File(name, file)
        media.set('image', avFile)

        readURLMediaList($('#newsPictureArray')[0], media, $scope.newsCases.length)
      }


      media.set('caption', $scope.captionContent)
      media.set('content', $scope.textContent)
      media.set('case', $scope.case)

      $scope.newsCases.push(media)

      $('#newsPictureArray').val(null)
      $scope.textContent = $scope.captionContent = ''
      $scope.coreTeamImageUpdateArray = ''
    } else {
      console.log('bad case...')
    }
  }

  function readURLMediaList (input, media, length) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        if (length < $scope.newsCases.length) {
          $scope.newsCases[length].set('imageUrl', e.target.result)
        } else {
          media.set('imageUrl', e.target.result)
        }
        $scope.$apply()
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  $scope.orderUp = function (index) {
    if (index > 0) {
      var objectAux = $scope.newsCases[index]
      $scope.newsCases[index] = $scope.newsCases[index - 1]
      $scope.newsCases[index - 1] = objectAux
    }
  }

  $scope.orderDown = function (index) {
    if (index < $scope.newsCases.length - 1) {
      var objectAux = $scope.newsCases[index]
      $scope.newsCases[index] = $scope.newsCases[index + 1]
      $scope.newsCases[index + 1] = objectAux
    }
  }

  $scope.deleteNewsMedia = function (index) {
    $scope.newsCases.splice(index, 1)
  }

  $scope.deleteNews = function (id) {
    var news = AV.Object.createWithoutData('FeaturedCase', id)
    news.destroy().then(function (n) {
      $scope.init()
    })
  }

  $scope.publishCases = function () {
    if ($scope.title != '') {
      var currentUser = AV.User.current()
      if (currentUser) {
        $scope.case.set('title', $scope.title)

        var file = $('#newsPicture')[0].files[0]
        if (file) {
          $scope.loading = true
          var name = file.name
          var avFile = new AV.File(name, file)
          $scope.case.set('image', avFile)

          $scope.case.save().then(function (cases) {
            $('#addNewsBox').addClass('ng-hide')
            $scope.recursiveMediaSave($scope.newsCases, 0)
            $scope.title = ''
            $scope.newsCases = []
            $scope.captionContent = ''
            $scope.loading = false
            $scope.$apply()
            $scope.init()
          }, function (error) {
            alert(JSON.stringify(error))
          })
        } else {
          alert('你需要把一个主图像')
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

  $scope.addNewsFunction = function () {
    if (!$scope.showAddBoxFlag) {
      $('#addNewsBox').removeClass('ng-hide')
      $scope.showAddBoxFlag = true
    }else {
      $('#addNewsBox').addClass('ng-hide')
      $scope.showAddBoxFlag = false
    }
  }

  $scope.goToCase = function (index) {
    localStorageService.cookie.set('caseId', $scope.cases[index].id)
    $state.go('featuredcase')
  }
}
