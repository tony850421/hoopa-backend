/**
 * SliderConfigCtrl Controller
 */

app.controller('SliderConfigCtrl', ['$scope', '$state', '$rootScope', '$window', '$timeout', 'localStorageService', SliderConfigCtrl])

function SliderConfigCtrl ($scope, $state, $rootScope, $window, $timeout, localStorageService) {
  $scope.slides = []
  $scope.type = ''
  $scope.typesArray = ['推荐', '热门资产', '高性价比住宅', '江浙沪地区优质厂房', '热推商铺土地全包资产']

  $scope.addNewSlide = function () {
    console.log('addNewSlide')
    console.log($scope.type)

    var file = $('#inputFile')[0].files[0]

    if (file) {
      var Slide = AV.Object.extend('Slide')
      var slide = new Slide()

      if (file && $scope.type != '') {
        var name = file.name
        var avFile = new AV.File(name, file)
        slide.set('image', avFile)

        slide.set('type', $scope.type)
        slide.save().then(function () {
          $scope.initSlides()
        })
      }

      $('#inputFile').val(null)
    } else {
      console.log('bad slide...')
    }
  }

  $scope.initSlides = function () {
    var queryNews = new AV.Query('Slide')
    queryNews.descending('createdAt')
    queryNews.find().then(function (res) {
      $scope.slides = []
      res.forEach(function (element) {
        var mainImage = element.get('image').thumbnailURL(100, 100)
        var type = element.get('type')
        var id = element.id

        $scope.slides.push({
          id: id,
          mainImage: mainImage,
          type: type
        })
        $scope.$apply()
      })
    })
  }

  $scope.deleteSlide = function (id) {
    var slide = AV.Object.createWithoutData('Slide', id)
    slide.destroy().then(function (s) {
      $scope.initSlides()
    }).catch(function (error) {
      alert(JSON.stringify(error))
    })
  }

  $scope.initSlides()
}
