app.controller('HistoryCtrl', ['$scope', '$rootScope', '$state', HistoryCtrl])

function HistoryCtrl ($scope, $rootScope, $state) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $rootScope.activeList = 'history'

  $scope.imageGroupIntroduction = ''
  $scope.imageGroupIntroductionFlag = false
  $scope.textGroupIntroductionFlag = false
  $scope.textGroupIntroduction = ''
  $scope.modeGroupIntroduction = 1

  $scope.year = ''
  $scope.month = ''

  $scope.timelineArray = []

  $scope.changeImageGroupIntroduction = function () {
    readURL($('#groupIntroductionPicture')[0])
  }

  function readURL (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        $('#imageGroupIntroduction').attr('src', e.target.result)
        $scope.imageGroupIntroduction = e.target.result
        if ($scope.imageGroupIntroduction != '') {
          $scope.imageGroupIntroductionFlag = true

          var file = $('#groupIntroductionPicture')[0].files[0]
          if (file) {
            var name = file.name
            var avFile = new AV.File(name, file)
            var query = AV.Object.createWithoutData('Timeline', '5caaf0120237d70068f85323')
            query.set('image', avFile)
            query.set('mode', $scope.modeGroupIntroduction)
            query.save()
          }
        }
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
    if ($scope.textGroupIntroduction != '' && $scope.year != '' && $scope.month != '' && $scope.day != '') {
      var TimeHistory = AV.Object.extend('Timeline')
      var item = new TimeHistory()
      item.set('description', $scope.textGroupIntroduction)
      item.set('mode', $scope.modeGroupIntroduction)
      var date = new Date(parseInt($scope.year), parseInt($scope.month), parseInt($scope.day))
      item.set('date', date)
      item.save().then(function () {
        $scope.year = ''
        $scope.month = ''
        $scope.day = ''
        $scope.textGroupIntroductionFlag = false
        $scope.textGroupIntroduction = ''
        $scope.$apply()
        $scope.init()
      })
    }
  }

  $scope.init = function () {
    $scope.timelineArray = []
    var query = new AV.Query('Timeline')
    query.descending('date')
    query.find().then(function (data) {
      data.forEach(function (element) {
        if (element.get('objectId') == '5caaf0120237d70068f85323') {
          $scope.imageGroupIntroduction = element.get('image').get('url')
          if ($scope.imageGroupIntroduction != '')
            $scope.imageGroupIntroductionFlag = true
          else
            $scope.imageGroupIntroductionFlag = false
          $scope.modeGroupIntroduction = element.get('mode')
        } else {
          $scope.modeGroupIntroduction = 1
        }
        var date = element.get('date')
        var description = element.get('description')
        var id = element.get('objectId')

        var item = {
          date: date,
          description: description,
          id: id
        }

        $scope.timelineArray.push(item)
      })
      $scope.$apply()
    })
  }

  $scope.init()

  $scope.changeMode = function (num) {
    $scope.modeGroupIntroduction = num
  }

  $scope.deleteMember = function (id) {
    var member = AV.Object.createWithoutData('Timeline', id)
    member.destroy().then(function (n) {
      $scope.init()
    })
  }

  $scope.updateTimelineDescription = function (index) {
    id = '#updateTimelineDescription__' + index
    $scope.timelineDescription = $(id).val()
  }

  $scope.editTimelineDescription = function (index, name) {
    $scope.timelineDescription = name
    id1 = '#timelineDescription_' + index
    id2 = '#updateTimelineDescription__' + index
    id3 = '#editTimelineDescription_' + index
    id4 = '#saveTimelineDescription_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveTimelineDescription = function (index, id) {
    id1 = '#timelineDescription_' + index
    id2 = '#updateTimelineDescription__' + index
    id3 = '#editTimelineDescription_' + index
    id4 = '#saveTimelineDescription_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    for (var i = 0; i < $scope.timelineArray.length; i++) {
      if ($scope.timelineArray[i].id == id) {
        $scope.timelineArray[i].description = $scope.timelineDescription
        break
      }
    }

    if ($scope.timelineDescription != '') {
      var member = AV.Object.createWithoutData('Timeline', id)
      member.set('description', $scope.timelineDescription)
      member.save().then(function (result) {
        $scope.$apply()
      })
    }
  }

  $scope.updateTimelineYear = function (index) {
    id = '#timelineYear_' + index
    $scope.timelineYear = $(id).val()
  }

  $scope.updateTimelineMonth = function (index) {
    id = '#timelineMonth_' + index
    $scope.timelineMonth = $(id).val()
  }

  $scope.updateTimelineDay = function (index) {
    id = '#timelineDay_' + index
    $scope.timelineDay = $(id).val()
  }

  $scope.editTimelineDate = function (index) {
    id1 = '#timelineDate_' + index
    id2 = '#updateTimelineDate_' + index
    id3 = '#editTimelineDate_' + index
    id4 = '#saveTimelineDate_' + index
    $(id1).addClass('ng-hide')
    $(id2).removeClass('ng-hide')
    $(id3).addClass('ng-hide')
    $(id4).removeClass('ng-hide')
  }

  $scope.saveTimelineDate = function (index, id) {
    id1 = '#timelineDate_' + index
    id2 = '#updateTimelineDate_' + index
    id3 = '#editTimelineDate_' + index
    id4 = '#saveTimelineDate_' + index
    $(id1).removeClass('ng-hide')
    $(id2).addClass('ng-hide')
    $(id3).removeClass('ng-hide')
    $(id4).addClass('ng-hide')

    var date = new Date(parseInt($scope.timelineYear), parseInt($scope.timelineMonth), parseInt($scope.timelineDay))

    for (var i = 0; i < $scope.timelineArray.length; i++) {
      if ($scope.timelineArray[i].id == id) {
        $scope.timelineArray[i].date = date
        break
      }
    }

    if ($scope.timelineDescription != '') {
      var member = AV.Object.createWithoutData('Timeline', id)
      member.set('date', date)
      member.save().then(function (result) {
        $scope.$apply()
      })
    }
  }
}
