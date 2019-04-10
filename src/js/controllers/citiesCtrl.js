app.controller('CitiesCtrl', ['$scope', '$rootScope', '$translate', CitiesCtrl])

function CitiesCtrl ($scope, $rootScope, $translate) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $scope.arrayCities = []
  $rootScope.activeList = 'cities'

  $scope.cityPrice = ''
  $scope.cityName = ''
  $scope.cityDescription = ''
  $scope.cityVisibility = ''

  $scope.cityNameNew = ''
  $scope.cityPriceNew = ''
  $scope.cityDescriptionNew = ''
  $scope.cityVisibilityNew = false

  $scope.priceUpdate = ''
  $scope.nameUpdate = ''
  $scope.descriptionUpdate = ''
  $scope.imageUpdate = ''
  $scope.cityVisibilityUpdate = ''

  $scope.memberUpdateId = -1

  $scope.changeValueMainImage = function (index) {
    var id = '#updateCityPicture_' + index
    readURL($(id)[0], index)
  }

  $scope.changeValueMainImageCity = function () {
    readURLCity($('#cityPicture')[0])
  }

  $scope.init = function () {
    $('#updateMemberBox').addClass('ng-hide')
    $('#addCityBox').addClass('ng-hide')

    $scope.arrayCities = []
    var cities = new AV.Query('Cities')
    cities.ascending('Order')
    cities.find().then(function (res) {
      res.forEach(function (element) {
        var mainImage = element.get('image').thumbnailURL(240, 240)
        var price = element.get('price')
        var order = element.get('Order')
        var id = element.id
        var name = element.get('name')
        var description = element.get('description')
        var show = element.get('show')

        $scope.arrayCities.push({
          id: id,
          price: price,
          mainImage: mainImage,
          name: name,
          description: description,
          show: show,
          order: order
        })
        $scope.$apply()
      })
    })
  }

  $scope.init()

  function readURL (input, index) {
    var id = '#updateCityPicture_' + index
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      var file = $(id)[0].files[0]
      var name = file.name
      var avFile = new AV.File(name, file)

      for (var i = 0; i < $scope.arrayCities.length; i++) {
        if (i == index) {
          var city = AV.Object.createWithoutData('Cities', $scope.arrayCities[i].id)
          city.set('image', avFile)
          city.save().then(function (res) {
            $scope.init()
          })
        }
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  function readURLCity (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#cityImage').attr('src', e.target.result)
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  $scope.deleteMember = function (id) {
    $('#updateMemberBox').addClass('ng-hide')
    var member = AV.Object.createWithoutData('Cities', id)
    member.destroy().then(function (n) {
      $scope.init()
    })
  }

  $scope.addCityFuntion = function () {
    $('#addCityBox').removeClass('ng-hide')
  }

  $scope.addCity = function () {
    $('#addCityBox').addClass('ng-hide')
    var file = $('#cityPicture')[0].files[0]
    if (file) {
      var name = file.name
      var avFile = new AV.File(name, file)

      if ($scope.cityNameNew != '' && $scope.cityPriceNew != '') {
        var City = AV.Object.extend('Cities')
        var city = new City()
        city.set('name', $scope.cityNameNew)
        city.set('description', $scope.cityDescriptionNew)
        city.set('price', $scope.cityPriceNew)
        if ($scope.arrayCities.length > 0)
          city.set('Order', $scope.arrayCities[$scope.arrayCities.length - 1].order + 1)
        else
          city.set('Order', 1)
        city.set('show', $scope.cityVisibilityNew)
        city.set('image', avFile)
        city.save().then(function (res) {
          $scope.cityNameNew = ''
          $scope.cityPriceNew = ''
          $scope.cityDescriptionNew = ''
          $scope.cityVisibilityNew = false
          $scope.init()
        }, function (error) {})
      } else {
        console.log('empty')
      }
    } else {
      console.log('no file')
    }
  }

  $scope.editCityName = function (index, name) {
    $scope.nameUpdateCity = name
    id1 = '#cityName_' + index
    id2 = '#updateCityName_' + index
    id3 = '#editCityName_' + index
    id4 = '#saveCityName_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.nameUpdateCity = ''
  $scope.priceUpdateCity = ''
  $scope.visibilityUpdateCity = ''

  $scope.saveCityName = function (index, id) {
    id1 = '#cityName_' + index
    id2 = '#updateCityName_' + index
    id3 = '#editCityName_' + index
    id4 = '#saveCityName_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayCities.length; i++) {
      if ($scope.arrayCities[i].id == id) {
        $scope.arrayCities[i].name = $scope.nameUpdateCity
        break
      }
    }

    if ($scope.nameUpdateCity != '') {
      var city = AV.Object.createWithoutData('Cities', id)
      city.set('name', $scope.nameUpdateCity)
      city.save()
    }
  }

  $scope.updateCityName = function (index) {
    id = '#updateCityName_' + index
    $scope.nameUpdateCity = $(id).val()
  }

  $scope.updateCityPrice = function (index) {
    idPrice = '#updateCityPrice_' + index
    $scope.priceUpdateCity = $(idPrice).val()
  }

  $scope.updateCityVisibility = function (index) {
    idVisibility = '#updateCityVisibility_' + index
    $scope.visibilityUpdateCity = $(idVisibility).val()
  }

  $scope.editCityPrice = function (index, name) {
    $scope.priceUpdateCity = name
    id1 = '#cityPrice_' + index
    id2 = '#updateCityPrice_' + index
    id3 = '#editCityPrice_' + index
    id4 = '#saveCityPrice_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveCityPrice = function (index, id) {
    id1 = '#cityPrice_' + index
    id2 = '#updateCityPrice_' + index
    id3 = '#editCityPrice_' + index
    id4 = '#saveCityPrice_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayCities.length; i++) {
      if ($scope.arrayCities[i].id == id) {
        $scope.arrayCities[i].price = $scope.priceUpdateCity
        break
      }
    }

    if ($scope.priceUpdateCity != '') {
      var city = AV.Object.createWithoutData('Cities', id)
      city.set('price', $scope.priceUpdateCity)
      city.save()
    }
  }

  $scope.editCityVisibility = function (index, name) {
    $scope.visibilityUpdateCity = name
    id1 = '#cityVisibilityYes_' + index
    id1_1 = '#cityVisibilityNo_' + index
    id2 = '#updateCityVisibility_' + index
    id3 = '#editCityVisibility_' + index
    id4 = '#saveCityVisibility_' + index
    $(id1).addClass('ng-hide')
    $(id1_1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveCityVisibility = function (index, id) {
    id1 = '#cityVisibilityYes_' + index
    id1_1 = '#cityVisibilityNo_' + index
    id2 = '#updateCityVisibility_' + index
    id3 = '#editCityVisibility_' + index
    id4 = '#saveCityVisibility_' + index

    if ($scope.visibilityUpdateCity == 0)
      $(id1).removeClass('ng-hide')
    else
      $(id1_1).removeClass('ng-hide')

    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayCities.length; i++) {
      if ($scope.arrayCities[i].id == id) {
        if ($scope.visibilityUpdateCity == 0)
          $scope.arrayCities[i].show = true
        else
          $scope.arrayCities[i].show = false
        break
      }
    }

    if ($scope.visibilityUpdateCity != '') {
      var city = AV.Object.createWithoutData('Cities', id)
      var flag = false
      if ($scope.visibilityUpdateCity == 0)
        flag = true
      city.set('show', flag)
      city.save()
    }
  }

  $scope.orderUp = function (index) {
    if (index > 0) {
      var orderOld = $scope.arrayCities[index].order
      $scope.arrayCities[index].order = $scope.arrayCities[index - 1].order
      $scope.arrayCities[index - 1].order = orderOld

      var city = AV.Object.createWithoutData('Cities', $scope.arrayCities[index].id)
      city.set('Order', $scope.arrayCities[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('Cities', $scope.arrayCities[index - 1].id)
      city_Other.set('Order', $scope.arrayCities[index - 1].order)
      city_Other.save()

      var objectAux = $scope.arrayCities[index]
      $scope.arrayCities[index] = $scope.arrayCities[index - 1]
      $scope.arrayCities[index - 1] = objectAux
    }
  }

  $scope.orderDown = function (index) {
    if (index < $scope.arrayCities.length - 1) {
      var orderOld = $scope.arrayCities[index].order
      $scope.arrayCities[index].order = $scope.arrayCities[index + 1].order
      $scope.arrayCities[index + 1].order = orderOld

      var city = AV.Object.createWithoutData('Cities', $scope.arrayCities[index].id)
      city.set('Order', $scope.arrayCities[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('Cities', $scope.arrayCities[index + 1].id)
      city_Other.set('Order', $scope.arrayCities[index + 1].order)
      city_Other.save()

      var objectAux = $scope.arrayCities[index]
      $scope.arrayCities[index] = $scope.arrayCities[index + 1]
      $scope.arrayCities[index + 1] = objectAux
    }
  }
}
