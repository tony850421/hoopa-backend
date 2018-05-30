
/**
 * Login and signup Controller
 */

app.controller('ProjectListCtrl', ['$scope', '$window', '$timeout', ProjectListCtrl]);

function ProjectListCtrl($scope, $window, $timeout) {

  $scope.loading = false;
  
  $scope.products = [];

  $scope.listAllProjects = function () {
    $scope.products = [];

    // var point1 = new AV.GeoPoint(30.653973, 119.253013);
    // var point2 = new AV.GeoPoint(32.653973, 121.253013);
    // console.log(point1.kilometersTo(point2));
    // var queryAsset = new AV.Query('Asset');
    // queryAsset.include('location');
    // queryAsset.withinGeoBox('location', point1, point2);
    // queryAsset.find().then(function (assets) {
    //   console.log('Assets--->');
    //   console.log(assets);
    // }).catch(function (error) {
    //   alert(JSON.stringify(error));
    // });


    // var query = new AV.Query('Project');
    // query.include('creator');
    // query.include('image');
    // query.include('address');
    // query.include('projectManager');
    // // query.equalTo('projectManager.name', 'tony');
    // query.descending('createdAt');
    // query.limit(10);
    // query.find().then(function (products) {
    //   console.log('Query--->');
    //   console.log(products);
    // }).catch(function (error) {
    //   alert(JSON.stringify(error));
    // });

    var currentUser = AV.User.current();

    if (currentUser) {

      $scope.loading = true;

      var roleQuery = new AV.Query(AV.Role);
      roleQuery.equalTo('users', AV.User.current());
      roleQuery.find().then(function (results) {
        if (results.length > 0) {
          var role = results[0];
        }
      }).then(function (administratorRole) {
      }).catch(function (error) {
        console.log(error);
      });

      var query = new AV.Query('Project');
      query.include('creator');
      query.include('image');
      query.descending('createdAt');
      query.limit(10);
      query.find().then(function (products) {
        products.forEach(function (product) {
          var productId = product.id;
          var productTitle = product.get('title');
          var productDescription = product.get('description');
          var productDesc = productDescription;
          if (productDescription.length > 170){
            productDesc = ''
            for (var i=0; i<170; i++){
              productDesc += productDescription[i];
            }
            productDesc+="...";
          }
          productDescription = productDesc;
          
          var releaseTime = (product.createdAt.getMonth() + 1) + '/' + product.createdAt.getDate() + '/' + product.createdAt.getFullYear();
          var ownerUsername = product.get('creator').get('username');
          var productImage = product.get('image');
          var productAmount = product.get('debitAmount');
          var productAddress = product.get('plainAddress');
          var productImageUrl;
          if (productImage) {
            productImageUrl = productImage.get('url');
          } else {
            productImageUrl = 'img/LogoHoopa.png'
            console.log('no image');
          }
          // handlebars context
          $scope.products.push({
            id: productId,
            imageUrl: productImageUrl,
            title: productTitle,
            description: productDescription,
            debitAmount: productAmount,
            plainAddress: productAddress,
            ownerUsername: ownerUsername,
            releaseTime: releaseTime
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

  $scope.deleteProduct = function (id) {
    console.log('deleteProduct ' + id);
    var product = AV.Object.createWithoutData('Project', id);
    product.destroy().then(function (prod) {
      console.log('deleted ok->' + prod);
      $scope.listAllProjects();
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  }

  $scope.listAllProjects();
  
}