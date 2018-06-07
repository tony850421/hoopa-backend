
/**
 * Login and signup Controller
 */

app.controller('ForumCtrl', ['$scope', '$rootScope', '$window', '$timeout', ForumCtrl]);

function ForumCtrl($scope, $rootScope, $window, $timeout) {

    $scope.forumComments = [];
    $rootScope.activeList = 'forum';

    $scope.init = function(){
        $scope.forumComments = [];

        var queryComment = new AV.Query('ForumComment');
        queryComment.include('user');
        queryComment.include('project');
        queryComment.descending('createdAt');

        queryComment.find().then( function(res) {

            console.log('Comments:');
            console.log(res);

            res.forEach( function(comment) {

                var userFullName = comment.get('user').get('fullName');
                var date = (comment.createdAt.getMonth() + 1) + '/' + comment.createdAt.getDate() + '/' + comment.createdAt.getFullYear();
                var avatar = comment.get('user').get('avatarUrl');
                var content = comment.get('content');
                var userId = comment.get('user').id;
                var projectId = comment.get('project').id;
                var commentId = comment.id;
                var productImage = comment.get('project').get('image');

                console.log(userFullName);
                console.log(date);
                console.log(avatar);
                console.log(content);
                console.log(userId);
                console.log(projectId);

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

                console.log($scope.forumComments);

                $scope.$apply();
            });
        })
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
}