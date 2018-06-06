
/**
 * Login and signup Controller
 */

app.controller('ForumCtrl', ['$scope', '$rootScope', '$window', '$timeout', ForumCtrl]);

function ForumCtrl($scope, $rootScope, $window, $timeout) {

    $scope.forumComments = [];
    $rootScope.activeList = 'forum';

    $scope.init = function(){
        var queryComment = new AV.Query('ForumComment');
        queryComment.include('user');
        queryComment.include('project');
        queryComment.descending('createdAt');

        queryComment.find().then( function(res) {
            res.forEach( function(comment) {

                var userFullName = comment.get('user').get('fullName');
                var date = (comment.createdAt.getMonth() + 1) + '/' + comment.createdAt.getDate() + '/' + comment.createdAt.getFullYear();
                var avatar = comment.get('user').get('avatarUrl');
                var content = comment.get('content');
                var userId = comment.get('user').id;
                var projectId = comment.get('project').id;

                $scope.forumComments.push({
                    userFullName: userFullName,
                    userAvatar: mainImage,
                    date: date,
                    content: content,
                    userId: userId,
                    projectId: projectId,
                })
                $scope.$apply();
            });
        })
    };

    $scope.init();
}