
/**
 * Login and signup Controller
 */

app.controller('NewsCtrl', ['$scope', '$rootScope', '$window', '$timeout', NewsCtrl]);

function NewsCtrl($scope, $rootScope, $window, $timeout) {

    $scope.news = [];
    $rootScope.activeList = 'news';
    $scope.skip = 0;

    $scope.init = function () {
        var queryNews = new AV.Query('News');
        queryNews.limit(10);
        queryNews.find().then(function (res) {
            res.forEach(function (element) {
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

    $scope.next = function () {
        var currentUser = AV.User.current();
        if (currentUser) {
            $scope.skip += 10;
            var queryNews = new AV.Query('News');
            queryNews.limit(10);
            queryNews.skip($scope.skip);
            queryNews.find().then(function (res) {
                $scope.news = [];
                res.forEach(function (element) {
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
        }
    };

    $scope.previous = function () {
        if ($scope.skip >= 10) {
            var currentUser = AV.User.current();
            if (currentUser) {
                $scope.skip -= 10;
                var queryNews = new AV.Query('News');
                queryNews.limit(10);
                queryNews.skip($scope.skip);
                queryNews.find().then(function (res) {
                    $scope.news = [];
                    res.forEach(function (element) {
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
            }
        }
    };
}