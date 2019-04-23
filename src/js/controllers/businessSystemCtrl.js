app.controller('BusinessSystemCtrl', ['$scope', '$rootScope', '$state', BusinessSystemCtrl])

function BusinessSystemCtrl ($scope, $rootScope, $state) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()

  $rootScope.activeList = 'business'
  $scope.loading = false

  $scope.imageGroupIntroduction = ''
  $scope.imageGroupIntroductionFlag = false
  $scope.textGroupIntroductionFlag = false
  $scope.titleGroupIntroduction = ''
  $scope.textGroupIntroduction = ''
  // $scope.modeGroupIntroduction = 1

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
      
      if ($scope.textGroupIntroduction != '' && $scope.titleGroupIntroduction != '') {
        $scope.loading = true
        var System = AV.Object.extend('BusinessSystem')
        var b = new System()
        b.set('image', avFile)
        // b.set('mode', $scope.modeGroupIntroduction)
        b.set('description', $scope.textGroupIntroduction)
        b.set('title', $scope.titleGroupIntroduction)
        if ($scope.businessSystemArray.length > 0)
          b.set('order', $scope.businessSystemArray[$scope.businessSystemArray.length - 1].order + 1)
        else
          b.set('order', 1)
        b.save().then(function (res) {
          $scope.loading = false
          $scope.textGroupIntroduction = ''
          $scope.textGroupIntroductionFlag = false
          $scope.titleGroupIntroduction = ''
          $scope.imageGroupIntroduction = ''
          $scope.imageGroupIntroductionFlag = false
          $scope.init()
        }, function (error) {
          $scope.loading = false
          $scope.$apply()
          alert(JSON.stringify(error))
        })
      }
    }
  }

  $scope.init = function () {
    $scope.businessSystemArray = []
    $scope.loading = true
    var query = new AV.Query('BusinessSystem')
    query.ascending('order')
    query.find().then(function (data) {
      $scope.loading = false
      data.forEach(function (element) {
        var image = element.get('image').get('url')
        var order = element.get('order')
        var title = element.get('title')
        var description = element.get('description')
        var id = element.get('objectId')

        var bSystem = {
          image: image,
          order: order,
          description: description,
          title: title,
          id: id
        }

        $scope.businessSystemArray.push(bSystem)
      })
      $scope.$apply()
    })
  }

  $scope.init()

  // $scope.changeMode = function (num) {
  //   $scope.modeGroupIntroduction = num
  // }

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

  $scope.changeImageBusinessSystem = function (index) {
    var id = '#updateBusinessSystemPicture_' + index
    readURLUpdate($(id)[0], index)
  }

  function readURLUpdate (input, index) {
    var id = '#updateBusinessSystemPicture_' + index

    if (input.files && input.files[0]) {
      var reader = new FileReader()

      var file = $(id)[0].files[0]
      var name = file.name
      var avFile = new AV.File(name, file)

      for (var i = 0; i < $scope.businessSystemArray.length; i++) {
        if (i == index) {
          var service = AV.Object.createWithoutData('BusinessSystem', $scope.businessSystemArray[i].id)
          service.set('image', avFile)
          service.save().then(function (res) {
            $scope.init()
          })
        }
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  $scope.changeTextGroupState = function () {
    $scope.textGroupIntroductionFlag = true
    $('#textGroupIntroductionArea').focus()
  }

  $scope.updateServiceTitle = function (index) {
    id = '#updateServiceTitle_' + index
    $scope.serviceTitle = $(id).val()
  }

  $scope.editServiceTitle = function (index, name) {
    $scope.serviceTitle = name
    id1 = '#serviceTitle_' + index
    id2 = '#updateServiceTitle_' + index
    id3 = '#editServiceTitle_' + index
    id4 = '#saveServiceTitle_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveServiceTitle = function (index, id) {
    id1 = '#serviceTitle_' + index
    id2 = '#updateServiceTitle_' + index
    id3 = '#editServiceTitle_' + index
    id4 = '#saveServiceTitle_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.businessSystemArray.length; i++) {
      if ($scope.businessSystemArray[i].id == id) {
        $scope.businessSystemArray[i].title = $scope.serviceTitle
        break
      }
    }

    if ($scope.serviceTitle != '') {
      var service = AV.Object.createWithoutData('BusinessSystem', id)
      service.set('title', $scope.serviceTitle)
      service.save()
    }
  }

  $scope.updateServiceDescription = function (index) {
    id = '#updateServiceDescription_' + index
    $scope.serviceDescription = $(id).val()
  }

  $scope.editServiceDescription = function (index, name) {
    $scope.serviceDescription = name
    id1 = '#serviceDescription_' + index
    id2 = '#updateServiceDescription_' + index
    id3 = '#editServiceDescription_' + index
    id4 = '#saveServiceDescription_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveServiceDescription = function (index, id) {
    id1 = '#serviceDescription_' + index
    id2 = '#updateServiceDescription_' + index
    id3 = '#editServiceDescription_' + index
    id4 = '#saveServiceDescription_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.businessSystemArray.length; i++) {
      if ($scope.businessSystemArray[i].id == id) {
        $scope.businessSystemArray[i].description = $scope.serviceDescription
        break
      }
    }

    if ($scope.serviceDescription != '') {
      var service = AV.Object.createWithoutData('BusinessSystem', id)
      service.set('description', $scope.serviceDescription)
      service.save()
    }
  }
}
