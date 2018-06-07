
/**
 * Login and signup Controller
 */

app.controller('ForumCtrl', ['$scope', '$rootScope', '$window', '$timeout', ForumCtrl]);

function ForumCtrl($scope, $rootScope, $window, $timeout) {

    $scope.forumComments = [];
    $rootScope.activeList = 'forum';
    $scope.skip = 0;

    $scope.init = function () {

        var currentUser = AV.User.current();
        if (currentUser) {
            var queryComment = new AV.Query('ForumComment');
            queryComment.include('user');
            queryComment.include('project');
            queryComment.descending('createdAt');
            queryComment.limit(10);
            queryComment.find().then(function (res) {
                $scope.forumComments = [];
                res.forEach(function (comment) {

                    var userFullName = comment.get('user').get('fullName');
                    var date = (comment.createdAt.getMonth() + 1) + '/' + comment.createdAt.getDate() + '/' + comment.createdAt.getFullYear();
                    var avatar = comment.get('user').get('avatarUrl');
                    var content = comment.get('content');
                    var userId = comment.get('user').id;
                    var projectId = comment.get('project').id;
                    var commentId = comment.id;
                    var productImage = comment.get('project').get('image');

                    var productImageUrl;
                    if (productImage) {
                        productImageUrl = productImage.thumbnailURL(60, 60);
                    } else {
                        productImageUrl = 'img/LogoHoopa.png';
                    }

                    $scope.forumComments.push({
                        userFullName: userFullName,
                        userAvatar: avatar,
                        date: date,
                        content: content,
                        userId: userId,
                        projectId: projectId,
                        id: commentId,
                        productImageUrl: productImageUrl,
                    })

                    $scope.$apply();
                });
            })
        }
    };

    $scope.init();

    $scope.deleteComment = function (id) {
        var comment = AV.Object.createWithoutData('ForumComment', id);
        comment.destroy().then(function (comment) {
            $scope.init();
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };

    $scope.next = function () {
        var currentUser = AV.User.current();
        if (currentUser) {

            $scope.skip += 10;
            var queryComment = new AV.Query('ForumComment');
            queryComment.include('user');
            queryComment.include('project');
            queryComment.descending('createdAt');
            queryComment.limit(10);
            queryComment.skip($scope.skip);
            queryComment.find().then(function (res) {
                $scope.forumComments = [];
                res.forEach(function (comment) {
                    var userFullName = comment.get('user').get('fullName');
                    var date = (comment.createdAt.getMonth() + 1) + '/' + comment.createdAt.getDate() + '/' + comment.createdAt.getFullYear();
                    var avatar = comment.get('user').get('avatarUrl');
                    var content = comment.get('content');
                    var userId = comment.get('user').id;
                    var projectId = comment.get('project').id;
                    var commentId = comment.id;
                    var productImage = comment.get('project').get('image');

                    var productImageUrl;
                    if (productImage) {
                        productImageUrl = productImage.thumbnailURL(60, 60);
                    } else {
                        productImageUrl = 'img/LogoHoopa.png';
                    }

                    $scope.forumComments.push({
                        userFullName: userFullName,
                        userAvatar: avatar,
                        date: date,
                        content: content,
                        userId: userId,
                        projectId: projectId,
                        id: commentId,
                        productImageUrl: productImageUrl,
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
                var queryComment = new AV.Query('ForumComment');
                queryComment.include('user');
                queryComment.include('project');
                queryComment.descending('createdAt');
                queryComment.limit(10);
                queryComment.skip($scope.skip);
                queryComment.find().then(function (res) {
                    $scope.forumComments = [];
                    res.forEach(function (comment) {
                        var userFullName = comment.get('user').get('fullName');
                        var date = (comment.createdAt.getMonth() + 1) + '/' + comment.createdAt.getDate() + '/' + comment.createdAt.getFullYear();
                        var avatar = comment.get('user').get('avatarUrl');
                        var content = comment.get('content');
                        var userId = comment.get('user').id;
                        var projectId = comment.get('project').id;
                        var commentId = comment.id;
                        var productImage = comment.get('project').get('image');

                        var productImageUrl;
                        if (productImage) {
                            productImageUrl = productImage.thumbnailURL(60, 60);
                        } else {
                            productImageUrl = 'img/LogoHoopa.png';
                        }

                        $scope.forumComments.push({
                            userFullName: userFullName,
                            userAvatar: avatar,
                            date: date,
                            content: content,
                            userId: userId,
                            projectId: projectId,
                            id: commentId,
                            productImageUrl: productImageUrl,
                        })

                        $scope.$apply();
                    });
                })
            }
        }
    };
}