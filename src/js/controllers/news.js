
/**
 * Login and signup Controller
 */

app.controller('NewsCtrl', ['$scope', '$state', '$rootScope', '$window', '$timeout', 'localStorageService', NewsCtrl]);

function NewsCtrl($scope, $state, $rootScope, $window, $timeout, localStorageService) {

    $scope.news = [];
    $rootScope.activeList = 'news';
    $scope.skip = 0;

    $scope.loading = false;

    $scope.init = function () {
        $scope.loading = true;

        var queryNews = new AV.Query('News');
        queryNews.limit(10);
        queryNews.find().then(function (res) {
            $scope.news = [];
            res.forEach(function (element) {
                var mainImage = element.get('image').thumbnailURL(100, 100);
                var title = element.get('title');
                var content = element.get('content');
                var id = element.id;

                $scope.news.push({
                    id: id,
                    mainImage: mainImage,
                    title: title,
                    content: content
                })
                $scope.$apply();
            });

            $scope.loading = false;
            $scope.$apply();

        }).catch(function (error) {

            $scope.loading = false;
            $scope.$apply();
            alert(JSON.stringify(error));
        });
    };

    $scope.init();

    $scope.next = function () {
        var currentUser = AV.User.current();
        if (currentUser) {
            
            $scope.loading = true;

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
                    var id = element.id;

                    $scope.news.push({
                        id: id,
                        mainImage: mainImage,
                        title: title,
                        content: content
                    })
                    $scope.$apply();
                });

                $scope.loading = false;
                $scope.$apply();

            }).catch(function (error) {

                $scope.loading = false;
                $scope.$apply();
                alert(JSON.stringify(error));
            });
        }
    };

    $scope.previous = function () {
        if ($scope.skip >= 10) {
            var currentUser = AV.User.current();
            if (currentUser) {

                $scope.loading = true;

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
                        var id = element.id;

                        $scope.news.push({
                            id: id,
                            mainImage: mainImage,
                            title: title,
                            content: content
                        })
                        $scope.$apply();
                    });

                    $scope.loading = false;
                    $scope.$apply();

                }).catch(function (error) {

                    $scope.loading = false;
                    $scope.$apply();
                    alert(JSON.stringify(error));
                });
            }
        }
    };

    $scope.goToNews = function (index) {
        localStorageService.cookie.set('newsId', $scope.news[index].id);
        $state.go('newsView');
    };

    $scope.deleteNews = function (id) {
        var news = AV.Object.createWithoutData('News', id);
        news.destroy().then(function (n) {
            $scope.init();
        })
    };
}