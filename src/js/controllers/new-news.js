
/**
 * Login and signup Controller
 */

app.controller('NewNewsCtrl', ['$scope', '$window', '$timeout', NewNewsCtrl]);

function NewNewsCtrl($scope, $window, $timeout) {

    $scope.newsMedias = [];

    $scope.title = '';
    $scope.newsContent = '';
    $scope.caption = '';
    $scope.content = '';

    $scope.fileModal = '';

    $scope.news = {};

    $scope.initNews = function() {
        var News = AV.Object.extend('News');
       $scope.news = new News();
    }
    $scope.initNews();

    $scope.addNewsMedia = function () {

        var file = $('#inputFile')[0].files[0];

        if(file || $scope.caption != '' || $scope.content != '') {

            var NewsMedia = AV.Object.extend('NewsMedia');
            var media = new NewsMedia();

            if (file) {
                var name = file.name;
                var avFile = new AV.File(name, file);
                media.set('image', avFile);
            }

            media.set('caption', $scope.caption);
            media.set('content', $scope.content);
            media.set('news', $scope.news);

            $scope.newsMedias.push(media);

            $('#inputFile').val(null);
            $scope.content = $scope.caption = '';

        } else {
            console.log('bad news...');
            // var alert = $translate.instant('ALERT5');
            // // alert(alert);
            // $scope.alerts.push({type: 'danger', msg: alert});
        }
    }

    $scope.deleteNewsMedia = function (index) {
        $scope.newsMedias.splice(index, 1);
    }

    $scope.publishNews = function() {

        if($scope.title != '' && $scope.newsContent != '') {
            var currentUser = AV.User.current();
            if (currentUser) {

                $scope.news.set('title', $scope.title);
                $scope.news.set('creator', currentUser);

                var file = $('#newsFile')[0].files[0];
                if (file) {
                    var name = file.name;
                    var avFile = new AV.File(name, file);
                    $scope.news.set('image', avFile);
                }

                $scope.news.set('content', $scope.newsContent);


                $scope.news.save().then(function (news) {

                    $scope.recursiveMediaSave($scope.newsMedias, 0);

                    console.log('news inserted ok');
                    // $scope.loading = false;
                    // $window.location.href = '#/project-list';

                }, function (error) {
                    // $scope.loading = false;
                    alert(JSON.stringify(error));
                });
    
            } else {
                $window.location.href = '#/login';
            }
        } else {
            console.log('insert news title');
        }
    }

    $scope.recursiveMediaSave = function (arrayObj, index) {
        console.log('recursiveMediaSave:' + arrayObj.length + ' ' + index);
        if (index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveMediaSave(arrayObj, index + 1);
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    }
}