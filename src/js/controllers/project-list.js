
/**
 * Login and signup Controller
 */

angular
    .module('RDash')
    .controller('ProjectListCtrl', ['$scope', '$window', '$timeout', ProjectListCtrl]);

function ProjectListCtrl($scope, $window, $timeout) {

    $scope.products = [];

    $scope.listAllProjects = function () {
      var email = 'pp@qq.com';

        var role = new AV.Role();
        role.setName('official'); 
        role.save();

        var currentUser = AV.User.current();
        currentUser.setEmail(email);
        currentUser.save();

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
                  productImageUrl = './../storage.png'
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