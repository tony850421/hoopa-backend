app.controller('GroupIntroductionCtrl', ['$scope', '$rootScope', GroupIntroductionCtrl])

function GroupIntroductionCtrl ($scope, $rootScope) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
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

      if ($scope.textGroupIntroduction != '') {
        var query = AV.Object.createWithoutData('GroupIntroduction', '5cb533bea3180b78325e175a')
        query.set('image', avFile)
        query.set('text', $scope.textGroupIntroduction)
        query.set('mode', $scope.modeGroupIntroduction)
        query.save()
      }
    }
  }

  $scope.init = function () {    
    var query = new AV.Query('GroupIntroduction')
    query.equalTo('objectId', '5cb533bea3180b78325e175a')
    query.find().then(function (data) {

      $scope.imageGroupIntroduction = data[0].get('image').get('url')
      if ($scope.imageGroupIntroduction != '')
        $scope.imageGroupIntroductionFlag = true
      else
        $scope.imageGroupIntroductionFlag = false

      $scope.textGroupIntroduction = data[0].get('text')
      if ($scope.textGroupIntroduction != '')
        $scope.textGroupIntroductionFlag = true
      else
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
