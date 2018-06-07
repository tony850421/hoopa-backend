app.controller('OffersCtrl', ['$scope', '$rootScope', '$window', '$timeout', OffersCtrl]);

function OffersCtrl($scope, $rootScope, $window, $timeout) {

  $rootScope.activeList = 'offers';
  $scope.loading = false;
  $scope.offers = [];
  $scope.skip = 0;

  $scope.initSocket = function () {
    var querySocketOffer = new AV.Query('Offert');
    querySocketOffer.subscribe().then(function (liveQuery) {
      liveQuery.on('create', function (offer) {
        $scope.listAllOffers();
      })
    })
  }

  $scope.initSocket();

  $scope.listAllOffers = function () {
    $scope.offers = [];
    $scope.openOffer = false;

    var currentUser = AV.User.current();

    if (currentUser) {

      $scope.loading = true;

      var query = new AV.Query('Offert');
      query.include('user');
      query.include('project');
      query.descending('createdAt');
      query.limit(10);
      query.find().then(function (offers) {
        $scope.offers = [];
        offers.forEach(function (offer) {
          var offerId = offer.id;
          var amount = offer.get('amount');
          var userFullName = offer.get('user').get('fullName');
          var date = (offer.createdAt.getMonth() + 1) + '/' + offer.createdAt.getDate() + '/' + offer.createdAt.getFullYear();
          var avatar = offer.get('user').get('avatarUrl');
          var content = offer.get('description');
          var open = false;
          var pending = offer.get('pending');
          var userId = offer.get('user').id;
          var projectId = offer.get('project').id;
          var projectTitle = offer.get('project').get('title');
          var projectDescription = offer.get('project').get('description');

          var p = projectDescription;
          if (projectDescription.length > 50) {
            p = '';
            for (var i = 0; i < 50; i++) {
              p += projectDescription[i];
            }
          }

          projectDescription = p;

          // handlebars context
          $scope.offers.push({
            offerId: offerId,
            amount: amount,
            userFullName: userFullName,
            date: date,
            avatar: avatar,
            content: content,
            open: open,
            pending: pending,
            userId: userId,
            projectId: projectId,
            projectTitle: projectTitle,
            projectDescription: projectDescription
          })
          $scope.$apply();
        });

        $scope.loading = false;

      }).catch(function (error) {
        $scope.loading = false;
        alert(JSON.stringify(error));
      });

    } else {
      $window.location.href = '#/login';
    }
  };

  $scope.listAllOffers();

  $scope.openOfferFunction = function (id) {
    $scope.offers.forEach(function (offer) {
      if (offer.offerId == id) {
        offer.open = !offer.open;
      } else {
        offer.open = false;
      }
    })
  };


  $scope.sendOfferNotification = function (id, userId, projectId, content) {
    var currentUser = AV.User.current();

    if (currentUser) {
      if (content != '') {
        var Notification = AV.Object.extend('OfferNotification');
        var notification = new Notification();
        notification.set('content', content);
        notification.set('readed', false);

        var offerMaker = AV.Object.createWithoutData('_User', userId);
        var involvedProject = AV.Object.createWithoutData('Project', projectId);

        notification.set('user', offerMaker);
        notification.set('project', involvedProject);

        notification.save().then(function (obj) {
          var offer = AV.Object.createWithoutData('Offert', id);
          offer.set('pending', false);
          offer.save().then(function (obj) {

            $scope.listAllOffers();

          }, function (error) {
            // $scope.loading = false;
            alert(JSON.stringify(error));
          });

        }, function (error) {
          // $scope.loading = false;
          alert(JSON.stringify(error));
        });

      }
    }
  };

  $scope.next = function () {
    var currentUser = AV.User.current();
    if (currentUser) {
      $scope.loading = true;
      $scope.skip += 10;
      var query = new AV.Query('Offert');
      query.include('user');
      query.include('project');
      query.descending('createdAt');
      query.limit(10);
      query.skip($scope.skip);
      query.find().then(function (offers) {
        $scope.offers = [];
        offers.forEach(function (offer) {
          var offerId = offer.id;
          var amount = offer.get('amount');
          var userFullName = offer.get('user').get('fullName');
          var date = (offer.createdAt.getMonth() + 1) + '/' + offer.createdAt.getDate() + '/' + offer.createdAt.getFullYear();
          var avatar = offer.get('user').get('avatarUrl');
          var content = offer.get('description');
          var open = false;
          var pending = offer.get('pending');
          var userId = offer.get('user').id;
          var projectId = offer.get('project').id;
          var projectTitle = offer.get('project').get('title');
          var projectDescription = offer.get('project').get('description');

          var p = projectDescription;
          if (projectDescription.length > 50) {
            p = '';
            for (var i = 0; i < 50; i++) {
              p += projectDescription[i];
            }
          }

          projectDescription = p;

          // handlebars context
          $scope.offers.push({
            offerId: offerId,
            amount: amount,
            userFullName: userFullName,
            date: date,
            avatar: avatar,
            content: content,
            open: open,
            pending: pending,
            userId: userId,
            projectId: projectId,
            projectTitle: projectTitle,
            projectDescription: projectDescription
          })
          $scope.$apply();
        });

        $scope.loading = false;

      }).catch(function (error) {
        $scope.loading = false;
        alert(JSON.stringify(error));
      });

    } else {
      $window.location.href = '#/login';
    }
  };

  $scope.previous = function () {
    if ($scope.skip >= 10) {
      var currentUser = AV.User.current();
      if (currentUser) {
        $scope.loading = true;
        $scope.skip -= 10;
        var query = new AV.Query('Offert');
        query.include('user');
        query.include('project');
        query.descending('createdAt');
        query.limit(10);
        query.skip($scope.skip);
        query.find().then(function (offers) {
          $scope.offers = [];
          offers.forEach(function (offer) {
            var offerId = offer.id;
            var amount = offer.get('amount');
            var userFullName = offer.get('user').get('fullName');
            var date = (offer.createdAt.getMonth() + 1) + '/' + offer.createdAt.getDate() + '/' + offer.createdAt.getFullYear();
            var avatar = offer.get('user').get('avatarUrl');
            var content = offer.get('description');
            var open = false;
            var pending = offer.get('pending');
            var userId = offer.get('user').id;
            var projectId = offer.get('project').id;
            var projectTitle = offer.get('project').get('title');
            var projectDescription = offer.get('project').get('description');

            var p = projectDescription;
            if (projectDescription.length > 50) {
              p = '';
              for (var i = 0; i < 50; i++) {
                p += projectDescription[i];
              }
            }

            projectDescription = p;

            // handlebars context
            $scope.offers.push({
              offerId: offerId,
              amount: amount,
              userFullName: userFullName,
              date: date,
              avatar: avatar,
              content: content,
              open: open,
              pending: pending,
              userId: userId,
              projectId: projectId,
              projectTitle: projectTitle,
              projectDescription: projectDescription
            })
            $scope.$apply();
          });

          $scope.loading = false;

        }).catch(function (error) {
          $scope.loading = false;
          alert(JSON.stringify(error));
        });

      } else {
        $window.location.href = '#/login';
      }
    }
  };
}