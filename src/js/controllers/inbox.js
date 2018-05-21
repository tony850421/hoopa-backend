
angular
    .module('RDash')
    .controller('InboxCtrl', ['$scope', '$window', '$timeout', InboxCtrl]);

function InboxCtrl($scope, $window, $timeout) {

    $scope.inbox = [];
    $scope.send = [];
    $scope.usersAux = [];
    $scope.showInbox = true;

    $scope.init = function () {

        var user = AV.User.current();

        var query = new AV.Query('Message');
        query.include('sender');
        query.include('receiver');
        query.equalTo('sender', user);
        query.find().then(function (messages) {

            messages.forEach(function (message) {
                if(message.get('receiver')) {
                    var fullName = message.get('receiver').get('fullName');
                    var releaseTime = (message.createdAt.getMonth() + 1) + '/' + message.createdAt.getDate() + '/' + message.createdAt.getFullYear();
                    var avatar =  message.get('receiver').get('avatarUrl');
                    var content = message.get('content');
    
                    $scope.send.push({fullName: fullName, releaseTime: releaseTime, avatar: avatar, content: content});
                }
            });

            $scope.$apply();

        }).catch(function (error) {
            alert(JSON.stringify(error));
        });

        var queryInbox = new AV.Query('Message');
        queryInbox.include('sender');
        queryInbox.include('receiver');
        queryInbox.equalTo('receiver', user);
        queryInbox.find().then(function (messages) {
    
            messages.forEach(function (message) {
                if(message.get('sender')) {
                    var fullName = message.get('sender').get('fullName');
                    var releaseTime = (message.createdAt.getMonth() + 1) + '/' + message.createdAt.getDate() + '/' + message.createdAt.getFullYear();
                    var avatar =  message.get('sender').get('avatarUrl');
                    var content = message.get('content');
    
                    $scope.inbox.push({fullName: fullName, releaseTime: releaseTime, avatar: avatar, content: content});
                }
            });

            $scope.$apply();

        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };

    $scope.init();

    $scope.getImageUrl = function (id) {
        
        return '../img/avatar.jpg';
    };

    $scope.changeFolder = function(){
        $scope.showInbox = !$scope.showInbox;
    };
}