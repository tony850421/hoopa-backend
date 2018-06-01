
/**
 * Login and signup Controller
 */

app.controller('NewsCtrl', ['$scope', '$rootScope', '$window', '$timeout', NewsCtrl]);

function NewsCtrl($scope, $rootScope, $window, $timeout) {

    $scope.news = [];
    $rootScope.activeList = 'news';

    $scope.init = function(){
        var queryNews = new AV.Query('News');
        queryNews.find().then( function(res){
            res.forEach( function(element) {
                var mainImage = element.get('image').thumbnailURL(100, 100);
                var title = element.get('title');
                var content = element.get('content');

                $scope.news.push({
                    mainImage: mainImage,
                    title: title,
                    content: content
                })
                $scope.$apply();
            });
        })
    };

    $scope.init();
}