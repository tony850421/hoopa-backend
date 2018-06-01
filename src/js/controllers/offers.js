app.controller('OffersCtrl', ['$scope', '$rootScope', '$window', '$timeout', OffersCtrl]);

function OffersCtrl($scope, $rootScope, $window, $timeout) {

  $rootScope.activeList = 'offers';
  $scope.loading = false;

  $scope.offers = [];

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

          // handlebars context
          $scope.offers.push({
            offerId: offerId,
            amount: amount,
            userFullName: userFullName,
            date: date,
            avatar: avatar,
            content: content,
            open: open,
            pending: pending
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

  // $scope.deleteProduct = function (id) {
  //   console.log('deleteProduct ' + id);
  //   var product = AV.Object.createWithoutData('Project', id);
  //   product.destroy().then(function (prod) {
  //     console.log('deleted ok->' + prod);
  //     $scope.listAllProjects();
  //   }).catch(function (error) {
  //     alert(JSON.stringify(error));
  //   });
  // }

  $scope.listAllOffers();

  // $scope.notificationTest = function() {
  //   console.log('notificationTest...');
  //   var currentUser = AV.User.current();
  //   if (currentUser) {
  //     var toUser = AV.Object.createWithoutData('_User', '5b0535442f301e0038f55987');
  //     var toProject = AV.Object.createWithoutData('Project', '5b04badb44d9040068e19776');
  //     var notification = new AV.Object('OfferNotification');
  //     notification.set('user', toUser);
  //     notification.set('project', toProject);
  //     notification.set('content', 'test test test hola mundo cruel');
  //     notification.set('readed', false);
  //     notification.save();
  //   }
  // }
  // $scope.notificationTest();

  $scope.openOfferFunction = function (id) {
    $scope.offers.forEach(function (offer) {
      if (offer.offerId == id) {
        offer.open = !offer.open;
      } else {
        offer.open = false;
      }
    })
  };

  $scope.changePending = function () {

  };
}