app.controller('BusinessSystemCtrl', ['$scope', '$rootScope', BusinessSystemCtrl])

function BusinessSystemCtrl ($scope, $rootScope) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $rootScope.activeList = 'business'

  $scope.imageGroupIntroduction = ''
  $scope.imageGroupIntroductionFlag = false
  $scope.modeGroupIntroduction = 1

  $scope.businessSystemArray = []

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

  $scope.saveInformation = function () {
    var file = $('#groupIntroductionPicture')[0].files[0]
    if (file) {
      var name = file.name
      var avFile = new AV.File(name, file)

      var System = AV.Object.extend('BusinessSystem')
      var b = new System()
      b.set('image', avFile)
      b.set('mode', $scope.modeGroupIntroduction)
      if ($scope.businessSystemArray.length > 0)
        b.set('order', $scope.businessSystemArray[$scope.businessSystemArray.length - 1].order + 1)
      else
        b.set('order', 1)
      b.save().then(function (res) {
        $scope.imageGroupIntroduction = ''
        if ($scope.imageGroupIntroduction != '')
          $scope.imageGroupIntroductionFlag = true
        else
          $scope.imageGroupIntroductionFlag = false
        $scope.init()
      })
    }
  }

  $scope.init = function () {
    $scope.businessSystemArray = []
    var query = new AV.Query('BusinessSystem')
    query.ascending('order')
    query.find().then(function (data) {
      data.forEach(function (element) {
        var image = element.get('image').get('url')
        var order = element.get('order')
        var id = element.get('objectId')

        var bSystem = {
          image: image,
          order: order,
          id: id
        }

        $scope.businessSystemArray.push(bSystem)
      })
      $scope.$apply()
    })
  }

  $scope.init()

  $scope.changeMode = function (num) {
    $scope.modeGroupIntroduction = num
  }

  $scope.deleteBusinessSystem = function (id) {
    var member = AV.Object.createWithoutData('BusinessSystem', id)
    member.destroy().then(function (n) {
      $scope.init()
    })
  }

  $scope.orderUp = function (index) {
    if (index > 0) {
      var orderOld = $scope.businessSystemArray[index].order
      $scope.businessSystemArray[index].order = $scope.businessSystemArray[index - 1].order
      $scope.businessSystemArray[index - 1].order = orderOld

      var city = AV.Object.createWithoutData('BusinessSystem', $scope.businessSystemArray[index].id)
      city.set('order', $scope.businessSystemArray[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('BusinessSystem', $scope.businessSystemArray[index - 1].id)
      city_Other.set('order', $scope.businessSystemArray[index - 1].order)
      city_Other.save()

      var objectAux = $scope.businessSystemArray[index]
      $scope.businessSystemArray[index] = $scope.businessSystemArray[index - 1]
      $scope.businessSystemArray[index - 1] = objectAux
    }
  }

  $scope.orderDown = function (index) {
    if (index < $scope.businessSystemArray.length - 1) {
      var orderOld = $scope.businessSystemArray[index].order
      $scope.businessSystemArray[index].order = $scope.businessSystemArray[index + 1].order
      $scope.businessSystemArray[index + 1].order = orderOld

      var city = AV.Object.createWithoutData('BusinessSystem', $scope.businessSystemArray[index].id)
      city.set('order', $scope.businessSystemArray[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('BusinessSystem', $scope.businessSystemArray[index + 1].id)
      city_Other.set('order', $scope.businessSystemArray[index + 1].order)
      city_Other.save()

      var objectAux = $scope.businessSystemArray[index]
      $scope.businessSystemArray[index] = $scope.businessSystemArray[index + 1]
      $scope.businessSystemArray[index + 1] = objectAux
    }
  }

  $scope.changeValueMainImage = function (index) {
    var id = '#updateBusinessImage_' + index
    readURL($(id)[0], index)
  }

  function readURL (input, index) {
    var id = '#updateBusinessImage_' + index
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      var file = $(id)[0].files[0]
      var name = file.name
      var avFile = new AV.File(name, file)

      for (var i = 0; i < $scope.businessSystemArray.length; i++) {
        if (i == index) {
          var b = AV.Object.createWithoutData('BusinessSystem', $scope.businessSystemArray[i].id)
          b.set('image', avFile)
          b.save().then(function (res) {
            $scope.init()
          })
        }
      }

      reader.readAsDataURL(input.files[0])
    }
  }
}
