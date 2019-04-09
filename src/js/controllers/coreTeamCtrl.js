app.controller('CoreTeamCtrl', ['$scope', '$rootScope', '$translate', CoreTeamCtrl])

function CoreTeamCtrl ($scope, $rootScope, $translate) {
  $scope.arrayMembers = []
  $rootScope.activeList = 'coreTeam'
  $scope.loading = false

  $scope.coreTeamCharge = ''
  $scope.coreTeamName = ''
  $scope.coreTeamDescription = ''

  $scope.coreTeamChargeUpdate = ''
  $scope.coreTeamNameUpdate = ''
  $scope.coreTeamDescriptionUpdate = ''
  $scope.coreTeamImageUpdate = ''

  $scope.showAddBoxFlag = false

  $scope.changeValueMainImage = function (index) {
    var id = '#updateMemberPicture_' + index
    readURL($(id)[0], index)
  }

  $scope.changeValueMainImageTeamMember = function () {
    readURLMember($('#teamMemberPicture')[0])
  }

  $scope.init = function () {
    $scope.loading = true
    $('#addTeamMemberBox').addClass('ng-hide')

    $scope.arrayMembers = []
    var coreTeam = new AV.Query('CoreTeam')
    coreTeam.ascending('Order')
    coreTeam.find().then(function (res) {
      res.forEach(function (element) {
        var mainImage = element.get('image').thumbnailURL(200, 200)
        var charge = element.get('charge')
        var id = element.id
        var order = element.get('Order')
        var name = element.get('name')
        var description = element.get('description')

        $scope.arrayMembers.push({
          id: id,
          charge: charge,
          mainImage: mainImage,
          name: name,
          order: order,
          description: description
        })
        $scope.loading = false
        $scope.$apply()
      })
    })
  }

  $scope.init()

  function readURL (input, index) {
    $scope.loading = true
    var id = '#updateMemberPicture_' + index
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      var file = $(id)[0].files[0]
      var name = file.name
      var avFile = new AV.File(name, file)

      for (var i = 0; i < $scope.arrayMembers.length; i++) {
        if (i == index) {
          var city = AV.Object.createWithoutData('CoreTeam', $scope.arrayMembers[i].id)
          city.set('image', avFile)
          city.save().then(function (res) {
            $scope.loading = false
            $scope.init()
          })
        }
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  function readURLMember (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#mainTeamImage').attr('src', e.target.result)
        $scope.coreTeamImageUpdate = e.target.result
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  $scope.deleteMember = function (id) {
    $scope.loading = true
    $('#updateMemberBox').addClass('ng-hide')
    var member = AV.Object.createWithoutData('CoreTeam', id)
    member.destroy().then(function (n) {
      $scope.loading = false
      $scope.init()
    })
  }

  $scope.saveMember = function () {
    $scope.loading = true
    $('#updateMemberBox').addClass('ng-hide')
    var member = AV.Object.createWithoutData('CoreTeam', $scope.coreTeamIdUpdate)
    member.set('name', $scope.coreTeamNameUpdate)
    member.set('charge', $scope.coreTeamChargeUpdate)
    member.set('description', $scope.coreTeamDescriptionUpdate)

    var pos = -1
    for (var i = 0; i < $scope.arrayMembers.length; i++) {
      if ($scope.arrayMembers[i].id == $scope.coreTeamIdUpdate) {
        $scope.arrayMembers[i].name = $scope.coreTeamNameUpdate
        $scope.arrayMembers[i].charge = $scope.coreTeamChargeUpdate
        $scope.arrayMembers[i].description = $scope.coreTeamDescriptionUpdate
        pos = i
        break
      }
    }

    var file = $('#coreTeamPicture')[0].files[0]
    if (file) {
      var name = file.name
      var avFile = new AV.File(name, file)
      member.set('image', avFile)

      $scope.arrayMembers[pos].mainImage = $scope.coreTeamImageUpdate
    }

    member.save().then(function(res){
      $scope.loading = false
    })
  }

  $scope.addMemberFuntion = function () {
    if (!$scope.showAddBoxFlag){
      $('#addTeamMemberBox').removeClass('ng-hide')
      $scope.showAddBoxFlag = true
    }
    else {
      $('#addTeamMemberBox').addClass('ng-hide')
      $scope.showAddBoxFlag = false
    }
  }

  $scope.addMember = function () {
    $scope.loading = true
    var file = $('#teamMemberPicture')[0].files[0]
    if (file) {
      var name = file.name
      var avFile = new AV.File(name, file)

      if ($scope.coreTeamCharge != '' && $scope.coreTeamDescription != '' && $scope.coreTeamName != '') {
        var Team = AV.Object.extend('CoreTeam')
        var member = new Team()
        member.set('charge', $scope.coreTeamCharge)
        member.set('description', $scope.coreTeamDescription)
        member.set('name', $scope.coreTeamName)
        if ($scope.arrayMembers.length > 0)
          member.set('Order', $scope.arrayMembers[$scope.arrayMembers.length - 1].order + 1)
        else
          member.set('Order', 1)
        member.set('image', avFile)
        member.save().then(function (res) {
          $scope.loading = false
          $scope.init()
        }, function (error) {})
      } else {
        console.log('empty')
      }
    } else {
      console.log('no file')
    }
  }

  $scope.orderUp = function (index) {
    if (index > 0) {
      var orderOld = $scope.arrayMembers[index].order
      $scope.arrayMembers[index].order = $scope.arrayMembers[index - 1].order
      $scope.arrayMembers[index - 1].order = orderOld

      var city = AV.Object.createWithoutData('CoreTeam', $scope.arrayMembers[index].id)
      city.set('Order', $scope.arrayMembers[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('CoreTeam', $scope.arrayMembers[index - 1].id)
      city_Other.set('Order', $scope.arrayMembers[index - 1].order)
      city_Other.save()

      var objectAux = $scope.arrayMembers[index]
      $scope.arrayMembers[index] = $scope.arrayMembers[index - 1]
      $scope.arrayMembers[index - 1] = objectAux
    }
  }

  $scope.orderDown = function (index) {
    if (index < $scope.arrayMembers.length - 1) {
      var orderOld = $scope.arrayMembers[index].order
      $scope.arrayMembers[index].order = $scope.arrayMembers[index + 1].order
      $scope.arrayMembers[index + 1].order = orderOld

      var city = AV.Object.createWithoutData('CoreTeam', $scope.arrayMembers[index].id)
      city.set('Order', $scope.arrayMembers[index].order)
      city.save()

      var city_Other = AV.Object.createWithoutData('CoreTeam', $scope.arrayMembers[index + 1].id)
      city_Other.set('Order', $scope.arrayMembers[index + 1].order)
      city_Other.save()

      var objectAux = $scope.arrayMembers[index]
      $scope.arrayMembers[index] = $scope.arrayMembers[index + 1]
      $scope.arrayMembers[index + 1] = objectAux
    }
  }

  $scope.editMemberCharge = function (index, name) {
    $scope.memberCharge = name
    id1 = '#memberCharge_' + index
    id2 = '#updateMemberCharge__' + index
    id3 = '#editMemberCharge_' + index
    id4 = '#saveMemberCharge_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveMemberCharge = function (index, id) {
    id1 = '#memberCharge_' + index
    id2 = '#updateMemberCharge__' + index
    id3 = '#editMemberCharge_' + index
    id4 = '#saveMemberCharge_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayMembers.length; i++) {
      if ($scope.arrayMembers[i].id == id) {
        $scope.arrayMembers[i].charge = $scope.memberCharge
        break
      }
    }

    if ($scope.memberCharge != '') {
      var member = AV.Object.createWithoutData('CoreTeam', id)
      member.set('charge', $scope.memberCharge)
      member.save()
    }
  }

  $scope.updateMemberCharge = function (index) {
    id = '#updateMemberCharge__' + index
    $scope.memberCharge = $(id).val()
  }

  $scope.updateMemberName = function (index) {
    id = '#updateMemberName__' + index
    $scope.memberName = $(id).val()
  }

  $scope.updateMemberDescription = function (index) {
    id = '#updateMemberDescription__' + index
    $scope.memberDescription = $(id).val()
  }

  $scope.editMemberName = function (index, name) {
    $scope.memberName = name
    id1 = '#memberName_' + index
    id2 = '#updateMemberName__' + index
    id3 = '#editMemberName_' + index
    id4 = '#saveMemberName_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveMemberName = function (index, id) {
    id1 = '#memberName_' + index
    id2 = '#updateMemberName__' + index
    id3 = '#editMemberName_' + index
    id4 = '#saveMemberName_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayMembers.length; i++) {
      if ($scope.arrayMembers[i].id == id) {
        $scope.arrayMembers[i].name = $scope.memberName
        break
      }
    }

    if ($scope.memberName != '') {
      var member = AV.Object.createWithoutData('CoreTeam', id)
      member.set('name', $scope.memberName)
      member.save()
    }
  }

  $scope.editMemberDescription = function (index, name) {
    $scope.memberDescription = name
    id1 = '#memberDescription_' + index
    id2 = '#updateMemberDescription__' + index
    id3 = '#editMemberDescription_' + index
    id4 = '#saveMemberDescription_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveMemberDescription = function (index, id) {
    id1 = '#memberDescription_' + index
    id2 = '#updateMemberDescription__' + index
    id3 = '#editMemberDescription_' + index
    id4 = '#saveMemberDescription_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.arrayMembers.length; i++) {
      if ($scope.arrayMembers[i].id == id) {
        $scope.arrayMembers[i].description = $scope.memberDescription
        break
      }
    }

    if ($scope.memberDescription != '') {
      var member = AV.Object.createWithoutData('CoreTeam', id)
      member.set('description', $scope.memberDescription)
      member.save()
    }
  }
}
