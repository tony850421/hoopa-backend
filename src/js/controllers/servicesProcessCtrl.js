app.controller('ServicesProcessCtrl', ['$scope', '$rootScope', '$state', ServicesProcessCtrl])

function ServicesProcessCtrl ($scope, $rootScope, $state) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $rootScope.activeList = 'services'

  $scope.imageGroupIntroduction = ''
  $scope.imageGroupIntroductionFlag = false
  $scope.textGroupIntroductionFlag = false
  $scope.textGroupIntroduction = ''
  $scope.titleGroupIntroduction = ''
  // $scope.modeGroupIntroduction = 1

  $scope.servicesProcessArray = []

  $scope.loading = false

  $scope.changeImageGroupIntroduction = function () {
    readURL($('#groupIntroductionPicture')[0])
  }

  $scope.changeImageServicesProcess = function (index) {
    var id = '#updateServicesProcessPicture_' + index
    readURLUpdate($(id)[0], index)
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

  function readURLUpdate (input, index) {
    var id = '#updateServicesProcessPicture_' + index

    if (input.files && input.files[0]) {
      var reader = new FileReader()

      var file = $(id)[0].files[0]
      var name = file.name
      var avFile = new AV.File(name, file)

      for (var i = 0; i < $scope.servicesProcessArray.length; i++) {
        if (i == index) {
          var service = AV.Object.createWithoutData('ServicesProcess', $scope.servicesProcessArray[i].id)
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

  $scope.saveInformation = function () {
    $scope.loading = true
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
        // service.set('mode', $scope.modeGroupIntroduction)
        if ($scope.servicesProcessArray.length > 0)
          service.set('order', $scope.servicesProcessArray[$scope.servicesProcessArray.length - 1].order + 1)
        else
          service.set('order', 1)

        service.save().then(function (res) {
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

  // $scope.changeMode = function (num) {
  //   $scope.modeGroupIntroduction = num
  // }

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

    for (var i = 0; i < $scope.servicesProcessArray.length; i++) {
      if ($scope.servicesProcessArray[i].id == id) {
        $scope.servicesProcessArray[i].title = $scope.serviceTitle
        break
      }
    }

    if ($scope.serviceTitle != '') {
      var service = AV.Object.createWithoutData('ServicesProcess', id)
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

    for (var i = 0; i < $scope.servicesProcessArray.length; i++) {
      if ($scope.servicesProcessArray[i].id == id) {
        $scope.servicesProcessArray[i].description = $scope.serviceDescription
        break
      }
    }

    if ($scope.serviceDescription != '') {
      var service = AV.Object.createWithoutData('ServicesProcess', id)
      service.set('description', $scope.serviceDescription)
      service.save()
    }
  }

  $scope.orderUp = function (index) {
    if (index > 0) {
      var orderOld = $scope.servicesProcessArray[index].order
      $scope.servicesProcessArray[index].order = $scope.servicesProcessArray[index - 1].order
      $scope.servicesProcessArray[index - 1].order = orderOld

      var city = AV.Object.createWithoutData('ServicesProcess', $scope.servicesProcessArray[index].id)
      city.set('order', $scope.servicesProcessArray[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('ServicesProcess', $scope.servicesProcessArray[index - 1].id)
      city_Other.set('order', $scope.servicesProcessArray[index - 1].order)
      city_Other.save()

      var objectAux = $scope.servicesProcessArray[index]
      $scope.servicesProcessArray[index] = $scope.servicesProcessArray[index - 1]
      $scope.servicesProcessArray[index - 1] = objectAux
    }
  }

  $scope.orderDown = function (index) {
    if (index < $scope.servicesProcessArray.length - 1) {
      var orderOld = $scope.servicesProcessArray[index].order
      $scope.servicesProcessArray[index].order = $scope.servicesProcessArray[index + 1].order
      $scope.servicesProcessArray[index + 1].order = orderOld

      var city = AV.Object.createWithoutData('ServicesProcess', $scope.servicesProcessArray[index].id)
      city.set('order', $scope.servicesProcessArray[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('ServicesProcess', $scope.servicesProcessArray[index + 1].id)
      city_Other.set('order', $scope.servicesProcessArray[index + 1].order)
      city_Other.save()

      var objectAux = $scope.servicesProcessArray[index]
      $scope.servicesProcessArray[index] = $scope.servicesProcessArray[index + 1]
      $scope.servicesProcessArray[index + 1] = objectAux
    }
  }

  $scope.deleteServicesProcess = function (id, index) {
    var member = AV.Object.createWithoutData('ServicesProcess', id)
    member.destroy().then(function (n) {
      $scope.init()
    })
  }
}
