
/**
 * Login and signup Controller
 */

angular
    .module('RDash')
    .controller('ProjectListCtrl', ['$scope', '$window', '$timeout', ProjectListCtrl]);

function ProjectListCtrl($scope, $window, $timeout) {

    $scope.products = [];

    $scope.listAllProjects = function () {

        // var query = new AV.Query('_User');
        // query.find().then(function(users){
        //     console.log(users);
        // })

        // var role = new AV.Role();
        // role.setName('official'); 
        // role.save();
        //var point1 = AV.GeoPoint(31.653973,120.253013);
        var point1 = new AV.GeoPoint(30.653973,119.253013);
        var point2 = new AV.GeoPoint(32.653973,121.253013);
        console.log(point1.kilometersTo(point2));
        var queryAsset = new AV.Query('Asset');
        queryAsset.include('location');
        queryAsset.withinGeoBox('location', point1, point2);
        queryAsset.find().then(function (assets) {
          console.log('Assets--->');
          console.log(assets);
        }).catch(function(error) {
          alert(JSON.stringify(error));
        });


        var query = new AV.Query('Project');
        query.include('creator');
        query.include('image');
        query.include('address');
        query.include('projectManager');
        // query.equalTo('projectManager.name', 'tony');
        query.descending('createdAt');
        query.limit(10);
        query.find().then(function (products) {
          console.log('Query--->');
          console.log(products);
        }).catch(function(error) {
          alert(JSON.stringify(error));
        });

        var currentUser = AV.User.current();
        // currentUser.setEmail(email);
        // currentUser.save();

        if (currentUser) {

            var roleQuery = new AV.Query(AV.Role);
            roleQuery.equalTo('users', AV.User.current());
            roleQuery.find().then(function (results) {
                if(results.length > 0) {
                    var role = results[0];
                }
            }).then(function (administratorRole) {
              //此时 administratorRole 已经包含了当前用户
            }).catch(function (error) {
              // 输出错误
              console.log(error);
            });

            var query = new AV.Query('Project');
            query.include('creator');
            query.include('image');
            query.descending('createdAt');
            query.limit(10);
            query.find().then(function (products) {
              products.forEach(function(product) {                
                var productTitle = product.get('title');
                var productDescription = product.get('description');
                var releaseTime = (product.createdAt.getMonth() + 1) + '/' + product.createdAt.getDate() + '/' +  product.createdAt.getFullYear();
                var ownerUsername = product.get('creator').get('username');
                var productImage = product.get('image');
                var productImageUrl;
                if (productImage) {
                  productImageUrl = productImage.get('url');
                } else {
                  // productImageUrl = './../storage.png'
                  console.log('no image');
                }
                // handlebars context
                $scope.products.push({
                  imageUrl: productImageUrl,
                  title: productTitle,
                  description: productDescription,
                  ownerUsername: ownerUsername,
                  releaseTime: releaseTime
                })
                $scope.$apply();
              });

            }).catch(function(error) {
              alert(JSON.stringify(error));
            });

        } else {
            $window.location.href = '#/login';
        }
    };

    $scope.listAllProjects();
}