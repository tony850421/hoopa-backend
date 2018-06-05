app.controller('OffersCtrl', ['$scope', '$rootScope', '$window', '$timeout', OffersCtrl]);

function OffersCtrl($scope, $rootScope, $window, $timeout) {

  $rootScope.activeList = 'offers';
  $scope.loading = false;
  $scope.offers = [];

  $scope.initSocket = function() {
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
      query.find().then(function (offers) {
        offers.forEach(function (offer) {

          console.log(offer);
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
          })
          $scope.$apply();
        });

        $scope.loading = false;

      }).catch(function (error) {
        $scope.loading = false;
        console.log('error');
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
    console.log(id + ' ' + userId + ' ' + projectId + ' ' + content);
    var currentUser = AV.User.current();

    if (currentUser) {
      // AV.Cloud.requestSmsCode({
      //   mobilePhoneNumber: '13818353491',
      //   template: 'newoffer',
      //   sign: 'sign1',
      //   client_phone: '13817991464',
      //   project_title: 'Test title',
      //   offer_amount: '1000'
      // }).then(function () {
      //   console.log('perfect');
      // }).catch(function (err) {
      //   console.log(err)
      // });

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
          console.log('notification ok ok');

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
  }

  $scope.changePending = function () {

  };
}