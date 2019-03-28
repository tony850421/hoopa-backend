app.controller('CitiesCtrl', ['$scope', '$rootScope', '$translate', CitiesCtrl])

function CitiesCtrl ($scope, $rootScope, $translate) {
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

  $scope.changeValueMainImage = function () {
    readURL($('#coreTeamPicture')[0])
  }

  $scope.changeValueMainImageCity = function () {
    readURLCity($('#cityPicture')[0])
  }

  $scope.init = function () {
    $('#updateMemberBox').addClass('ng-hide')
    $('#addCityBox').addClass('ng-hide')

    $scope.arrayCities = []
    var cities = new AV.Query('Cities')
    cities.find().then(function (res) {
      res.forEach(function (element) {
        var mainImage = element.get('image').thumbnailURL(240, 240)
        var price = element.get('price')
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
          show: show
        })
        $scope.$apply()
      })
    })
  }

  $scope.init()

  function readURL (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#mainTeamImage').attr('src', e.target.result)
        $scope.imageUpdate = e.target.result
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

//   $scope.updateMember = function (id) {
//     window.scrollTo(0, document.body.scrollHeight)
//     $('#updateMemberBox').removeClass('ng-hide')

//     for (var i = 0; i < $scope.arrayCities.length; i++) {
//       if ($scope.arrayCities[i].id == id) {
//         $scope.priceUpdate = $scope.arrayCities[i].price
//         $scope.nameUpdate = $scope.arrayCities[i].name
//         $scope.descriptionUpdate = $scope.arrayCities[i].description
//         $scope.cityVisibilityUpdate = $scope.arrayCities[i].show
//         $scope.imageUpdate = $scope.arrayCities[i].mainImage
//         $scope.coreTeamIdUpdate = id
//         $scope.$apply()
//         break
//       }
//     }
//   }

//   $scope.saveMember = function () {
//     $('#updateMemberBox').addClass('ng-hide')
//     var member = AV.Object.createWithoutData('Cities', $scope.coreTeamIdUpdate)
//     member.set('name', $scope.nameUpdate)
//     member.set('price', $scope.priceUpdate)
//     member.set('description', $scope.descriptionUpdate)
//     member.set('show', $scope.cityVisibilityUpdate)

//     var pos = -1
//     for (var i = 0; i < $scope.arrayCities.length; i++) {
//       if ($scope.arrayCities[i].id == $scope.coreTeamIdUpdate) {
//         $scope.arrayCities[i].name = $scope.nameUpdate
//         $scope.arrayCities[i].price = $scope.priceUpdate
//         $scope.arrayCities[i].description = $scope.descriptionUpdate
//         $scope.arrayCities[i].show = $scope.cityVisibilityUpdate
//         pos = i
//         break
//       }
//     }

//     var file = $('#coreTeamPicture')[0].files[0]
//     if (file) {
//       var name = file.name
//       var avFile = new AV.File(name, file)
//       member.set('image', avFile)

//       $scope.arrayCities[pos].mainImage = $scope.imageUpdate
//     }

//     member.save()
//   }

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

  $scope.saveCityName = function (index) {
    id1 = '#cityName_' + index
    id2 = '#updateCityName_' + index
    id3 = '#editCityName_' + index
    id4 = '#saveCityName_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')
    console.log($scope.nameUpdateCity)
  }

  $scope.updateCityName = function(index) {
    id = '#updateCityName_' + index
    $scope.nameUpdateCity = $(id).val()
  }
}
