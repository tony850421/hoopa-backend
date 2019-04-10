app.controller('UsersCtrl', ['$scope', '$state', '$rootScope', '$window', '$translate', 'localStorageService', UsersCtrl])

function UsersCtrl ($scope, $state, $rootScope, $window, $translate, localStorageService) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $scope.users = []
  $scope.skip = 0

  $rootScope.activeList = 'users'

  $scope.init = function () {
    var queryUsers = new AV.Query('_User')
    queryUsers.limit(10)
    queryUsers.find().then(function (u) {
      for (var i = 0; i < u.length; i++) {
        var date = u[i].get('createdAt').toLocaleDateString('zh-CN') + ' ' + u[i].get('createdAt').toLocaleTimeString('zh-CN')
        u[i].set('createdDate', date)

        var dateU = u[i].get('updatedAt').toLocaleDateString('zh-CN') + ' ' + u[i].get('updatedAt').toLocaleTimeString('zh-CN')
        u[i].set('updatedDate', dateU)
        u[i].set('isAdmin', false)

        $scope.getAdmin(u[i].id, u)
      }

      $scope.users = u
      $scope.$apply()
    })
  }

  $scope.init()

  $scope.getAdmin = function (id, users) {
    var query = new AV.Query('_User')
    query.get(id).then(function (u) {
      var roleQuery = new AV.Query(AV.Role)
      roleQuery.equalTo('users', u)
      roleQuery.find().then(function (results) {
        results.forEach(function (element) {
          if (element.get('name') == 'Admin') {
            for (var t = 0; t < users.length; t++) {
              if (users[t].id == id) {
                users[t].set('isAdmin', true)
                $scope.$apply()
              }
            }
          }
        })
      })
    }, function (error) {
      // error is an instance of AVError.
    })
  }

  $scope.next = function () {
    $scope.skip += 10
    var queryUsers = new AV.Query('_User')
    queryUsers.limit(10)
    queryUsers.skip($scope.skip)
    queryUsers.find().then(function (u) {
      for (var i = 0; i < u.length; i++) {
        var date = u[i].get('createdAt').toLocaleDateString('zh-CN') + ' ' + u[i].get('createdAt').toLocaleTimeString('zh-CN')
        u[i].set('createdDate', date)

        var dateU = u[i].get('updatedAt').toLocaleDateString('zh-CN') + ' ' + u[i].get('updatedAt').toLocaleTimeString('zh-CN')
        u[i].set('updatedDate', dateU)
        u[i].set('isAdmin', false)

        $scope.getAdmin(u[i].id, u)
      }

      $scope.users = u
      $scope.$apply()
    })
  }

  $scope.previous = function () {
    if ($scope.skip >= 10) {
      $scope.skip -= 10
      var queryUsers = new AV.Query('_User')
      queryUsers.limit(10)
      queryUsers.skip($scope.skip)
      queryUsers.find().then(function (u) {
        for (var i = 0; i < u.length; i++) {
          var date = u[i].get('createdAt').toLocaleDateString('zh-CN') + ' ' + u[i].get('createdAt').toLocaleTimeString('zh-CN')
          u[i].set('createdDate', date)

          var dateU = u[i].get('updatedAt').toLocaleDateString('zh-CN') + ' ' + u[i].get('updatedAt').toLocaleTimeString('zh-CN')
          u[i].set('updatedDate', dateU)
          u[i].set('isAdmin', false)

          $scope.getAdmin(u[i].id, u)
        }

        $scope.users = u
        $scope.$apply()
      })
    }
  }

  $scope.makeAdmin = function (id) {
    var query = new AV.Query('_User')
    query.get(id).then(function (u) {
      var roleQuery = new AV.Query(AV.Role)
      roleQuery.equalTo('name', 'Admin')
      roleQuery.find().then(function (results) {
        var role = results[0]
        var relation = role.getUsers()
        relation.add(u)
        return role.save()
      }).then(function (role) {
        for (var i = 0; i < $scope.users.length; i++) {
          if ($scope.users[i].id == id) {
            $scope.users[i].set('isAdmin', true)
            $scope.$apply()
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    })
  }

  $scope.quitAdmin = function (id) {
    var query = new AV.Query('_User')
    query.get(id).then(function (u) {
      var roleQuery = new AV.Query(AV.Role)
      roleQuery.equalTo('name', 'Admin')
      roleQuery.find().then(function (results) {
        var role = results[0]
        var relation = role.getUsers()
        relation.remove(u)
        return role.save()
      }).then(function (role) {
        for (var i = 0; i < $scope.users.length; i++) {
          if ($scope.users[i].id == id) {
            $scope.users[i].set('isAdmin', false)
            $scope.$apply()
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    })
  }
}
