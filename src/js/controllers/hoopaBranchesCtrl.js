app.controller('HoopaBranchesCtrl', ['$scope', '$rootScope', '$translate', HoopaBranchesCtrl])

function HoopaBranchesCtrl ($scope, $rootScope, $translate) {
  $scope.brancheName = ''
  $scope.brancheAddress = ''
  $scope.branchePhone = ''
  $scope.branchesCoordenates = ''
  $scope.branchesLatitude = ''
  $scope.branchesLongitude = ''
  $rootScope.activeList = 'hoopaBranchs'
  $scope.arrayBranchs = []

  $scope.branchUpdateId = -1

  $scope.init = function () {
    $('#addBrancheBox').addClass('ng-hide')

    $scope.arrayBranchs = []
    var Branchs = new AV.Query('Branch')
    Branchs.find().then(function (res) {
      res.forEach(function (element) {
        var id = element.id
        var address = element.get('address')
        var order = element.get('Order')
        var name = element.get('name')
        var phone = element.get('phone')
        var latitude = element.get('latitude')
        var longitude = element.get('longitude')

        $scope.arrayBranchs.push({
          id: id,
          address: address,
          phone: phone,
          name: name,
          order: order,
          latitude: latitude,
          longitude: longitude
        })
        $scope.$apply()
      })
    })
  }

  $scope.init()

  $scope.deleteBranchs = function (id) {
    $('#updateBranchBox').addClass('ng-hide')
    var b = AV.Object.createWithoutData('Branch', id)
    b.destroy().then(function (n) {
      $scope.init()
    })
  }

  $scope.updateBranch = function (id) {
    window.scrollTo(0, document.body.scrollHeight)
    $('#updateBranchBox').removeClass('ng-hide')

    for (var i = 0; i < $scope.arrayBranchs.length; i++) {
      if ($scope.arrayBranchs[i].id == id) {
        $scope.brancheName = $scope.arrayBranchs[i].name
        $scope.brancheAddress = $scope.arrayBranchs[i].address
        $scope.branchePhone = $scope.arrayBranchs[i].phone
        $scope.brancheLatitude = $scope.arrayBranchs[i].latitude
        $scope.brancheLongitude = $scope.arrayBranchs[i].longitude
        $scope.branchesCoordenates = $scope.brancheLongitude + ',' + $scope.brancheLatitude
        $scope.branchUpdateId = id
        $scope.$apply()
        break
      }
    }
  }

  $scope.updateBranchs = function () {
    if ($scope.brancheAddress != '' && $scope.brancheName != '' && $scope.branchePhone != '' && branchesCoordenates != '') {
      var ltarray = $scope.branchesCoordenates.split(',')
      if (ltarray.length == 2) {
        var latitude = ltarray[1]
        var longitude = ltarray[0]

        $('#updateBranchBox').addClass('ng-hide')
        var branch = AV.Object.createWithoutData('Branch', $scope.branchUpdateId)
        branch.set('name', $scope.brancheName)
        branch.set('address', $scope.brancheAddress)
        branch.set('phone', $scope.branchePhone)
        branch.set('latitude', latitude)
        branch.set('longitude', longitude)
        branch.save()

        for (var i = 0; i < $scope.arrayBranchs.length; i++) {
          if ($scope.arrayBranchs[i].id == $scope.branchUpdateId) {
            $scope.arrayBranchs[i].name = $scope.brancheName
            $scope.arrayBranchs[i].address = $scope.brancheAddress
            $scope.arrayBranchs[i].phone = $scope.branchePhone
            $scope.arrayBranchs[i].branchesCoordenates = $scope.brancheLongitude + ',' + $scope.brancheLatitude
            break
          }
        }
      } else {
        var alert = $translate.instant('ALERT9')
        $scope.alertsAsset.push({ type: 'danger', msg: alert })
      }
    }
  }

  $scope.addBrancheFuntion = function () {
    $('#addBrancheBox').removeClass('ng-hide')
  }

  $scope.addBranchs = function () {
    if ($scope.brancheAddress != '' && $scope.brancheName != '' && $scope.branchePhone != '' && branchesCoordenates != '') {
      var ltarray = $scope.branchesCoordenates.split(',')
      if (ltarray.length == 2) {
        var latitude = ltarray[1]
        var longitude = ltarray[0]

        var Branchs = AV.Object.extend('Branch')
        var b = new Branchs()
        b.set('address', $scope.brancheAddress)
        b.set('name', $scope.brancheName)
        b.set('phone', $scope.branchePhone)
        b.set('latitude', latitude)
        b.set('longitude', longitude)
        b.save().then(function (res) {
          $scope.init()
        })
      } else {
        var alert = $translate.instant('ALERT9')
        $scope.alertsAsset.push({ type: 'danger', msg: alert })
      }
    }
  }

  $scope.editBranchName = function (index, name) {
    $scope.nameUpdateBranch = name
    id1 = '#branchName_' + index
    id2 = '#updateBranchName_' + index
    id3 = '#editBranchName_' + index
    id4 = '#saveBranchName_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveCityName = function (index, id) {
    id1 = '#branchName_' + index
    id2 = '#updateBranchName_' + index
    id3 = '#editBranchName_' + index
    id4 = '#saveBranchName_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayBranchs.length; i++) {
      if ($scope.arrayBranchs[i].id == id) {
        $scope.arrayBranchs[i].name = $scope.nameUpdateBranch
        break
      }
    }

    if ($scope.nameUpdateBranch != '') {
      var city = AV.Object.createWithoutData('Branch', id)
      city.set('name', $scope.nameUpdateBranch)
      city.save()
    }
  }

  $scope.updateBranchName = function (index) {
    id = '#updateBranchName_' + index
    $scope.nameUpdateBranch = $(id).val()
  }

  $scope.updateBranchAddress = function (index) {
    id = '#updateBranchAddress_' + index
    $scope.addressUpdateBranch = $(id).val()
  }

  $scope.editBranchAddress = function (index, name) {
    $scope.addressUpdateBranch = name
    id1 = '#branchAddress_' + index
    id2 = '#updateBranchAddress_' + index
    id3 = '#editBranchAddress_' + index
    id4 = '#saveBranchAddress_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveCityName = function (index, id) {
    id1 = '#branchAddress_' + index
    id2 = '#updateBranchAddress_' + index
    id3 = '#editBranchAddress_' + index
    id4 = '#saveBranchAddress_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayBranchs.length; i++) {
      if ($scope.arrayBranchs[i].id == id) {
        $scope.arrayBranchs[i].address = $scope.addressUpdateBranch
        break
      }
    }

    if ($scope.addressUpdateBranch != '') {
      var city = AV.Object.createWithoutData('Branch', id)
      city.set('address', $scope.addressUpdateBranch)
      city.save()
    }
  }

//   $scope.updateBranchName = function (index) {
//     id = '#updateBranchName_' + index
//     $scope.nameUpdateBranch = $(id).val()
//   }

//   $scope.updateBranchName = function (index) {
//     id = '#updateBranchName_' + index
//     $scope.nameUpdateBranch = $(id).val()
//   }
}
