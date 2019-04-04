app.controller('GroupIntroductionCtrl', ['$scope', '$rootScope', GroupIntroductionCtrl])

function GroupIntroductionCtrl ($scope, $rootScope) {
  $rootScope.activeList = 'group'

  $scope.imageGroupIntroduction = ''
  $scope.imageGroupIntroductionFlag = false
  $scope.textGroupIntroductionFlag = false
  $scope.textGroupIntroduction = ''
  $scope.modeGroupIntroduction = 1

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

      if ($scope.textGroupIntroduction) {
        var query = AV.Object.createWithoutData('GroupIntroduction', '5ca4629a0237d7006895ef4f')
        query.set('image', avFile)
        query.set('text', $scope.textGroupIntroduction)
        query.set('mode', $scope.modeGroupIntroduction)
        query.save()
      }
    }
  }

  $scope.init = function () {
    var query = new AV.Query('GroupIntroduction')
    query.equalTo('objectId', '5ca4629a0237d7006895ef4f')
    query.find().then(function (data) {
      $scope.imageGroupIntroduction = data[0].get('image').get('url')
      if ($scope.imageGroupIntroduction != '')
        $scope.imageGroupIntroductionFlag = true
      $scope.textGroupIntroduction = data[0].get('text')
      if ($scope.textGroupIntroduction != '')
        $scope.textGroupIntroductionFlag = true
      $scope.modeGroupIntroduction = data[0].get('mode')
      $scope.$apply()
    })
  }

  $scope.init()

  $scope.changeMode = function (num) {
    $scope.modeGroupIntroduction = num
  }
}
