app.controller('StructureCtrl', ['$scope', '$rootScope', '$state', StructureCtrl])

function StructureCtrl ($scope, $rootScope, $state) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $rootScope.activeList = 'structure'

  $scope.imageGroupIntroduction = ''
  $scope.imageGroupIntroductionFlag = false

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

  $scope.saveInformation = function () {
    var file = $('#groupIntroductionPicture')[0].files[0]
    if (file) {
      var name = file.name
      var avFile = new AV.File(name, file)
      var query = AV.Object.createWithoutData('Structure', '5ca56268a3180b0068bcef3e')
      query.set('image', avFile)
      query.save()
    }
  }

  $scope.init = function () {
    var query = new AV.Query('Structure')
    query.equalTo('objectId', '5ca56268a3180b0068bcef3e')
    query.find().then(function (data) {
      $scope.imageGroupIntroduction = data[0].get('image').get('url')
      if ($scope.imageGroupIntroduction != '')
        $scope.imageGroupIntroductionFlag = true
      $scope.$apply()
    })
  }

  $scope.init()
}
