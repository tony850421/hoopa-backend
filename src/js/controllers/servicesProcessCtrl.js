app.controller('ServicesProcessCtrl', ['$scope', '$rootScope', ServicesProcessCtrl])

function ServicesProcessCtrl ($scope, $rootScope) {
  $rootScope.activeList = 'services'

  $scope.imageGroupIntroduction = ''
  $scope.imageGroupIntroductionFlag = false
  $scope.textGroupIntroductionFlag = false
  $scope.textGroupIntroduction = ''
  $scope.titleGroupIntroduction = ''
  $scope.modeGroupIntroduction = 1

  $scope.servicesProcessArray = []

  $scope.changeImageGroupIntroduction = function () {
    readURL($('#groupIntroductionPicture')[0])
  }

  function readURL (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#imageGroupIntroduction').attr('src', e.target.result)
        $scope.imageGroupIntroduction = e.target.result
        if ($scope.imageGroupIntroduction != '')
          $scope.imageGroupIntroductionFlag = true
        else
          $scope.imageGroupIntroductionFlag = false
        $scope.$apply()
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  $scope.changeTextGroupState = function () {
    $scope.textGroupIntroductionFlag = true
    $('#textGroupIntroductionArea').focus()
  }

  $scope.saveInformation = function () {
    var file = $('#groupIntroductionPicture')[0].files[0]
    if (file) {
      var name = file.name
      var avFile = new AV.File(name, file)

      if ($scope.textGroupIntroduction != '' && $scope.titleGroupIntroduction != '') {
        var Services = AV.Object.extend('ServicesProcess')
        var service = new Services()
        service.set('image', avFile)
        service.set('description', $scope.textGroupIntroduction)
        service.set('title', $scope.titleGroupIntroduction)
        service.set('mode', $scope.modeGroupIntroduction)
        if ($scope.servicesProcessArray.length > 0)
          service.set('order', $scope.servicesProcessArray[$scope.servicesProcessArray.length - 1].order + 1)
        else
          service.set('order', 1)
        service.save().then(function(res){
          $scope.init()
        })
      }
    }
  }

  $scope.init = function () {
    $scope.servicesProcessArray = []
    var query = new AV.Query('ServicesProcess')
    query.ascending('order')
    query.find().then(function (data) {
      data.forEach(function (element) {
        var id = element.get('objectId')
        var mode = element.get('mode')
        var title = element.get('title')
        var description = element.get('description')
        var order = element.get('order')
        var image = element.get('image').get('url')

        var process = {
          id: id,
          mode: mode,
          title: title,
          description: description,
          order: order,
          image: image
        }

        $scope.servicesProcessArray.push(process)
      })
      $scope.$apply()
    })
  }

  $scope.init()

  $scope.changeMode = function (num) {
    $scope.modeGroupIntroduction = num
  }
}
