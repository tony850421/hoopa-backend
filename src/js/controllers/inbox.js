
app.controller('InboxCtrl', ['$scope', '$rootScope', '$state', '$window', '$timeout', 'localStorageService', InboxCtrl]);

function InboxCtrl($scope, $rootScope, $state, $window, $timeout, localStorageService) {

    $scope.inbox = [];
    $rootScope.activeList = 'inbox';
    $scope.usersAux = [];
    $scope.showInbox = true;
    $scope.width = '';
    $scope.height = '';
    $scope.Messages = [];
    $scope.messageText = '';
    $scope.senderId = '';

    $scope.getSize = function () {
        $scope.width = window.innerWidth;
        $scope.height = window.innerHeight;

        $(window).resize(function () {
            $scope.width = window.innerWidth;
            $scope.height = window.innerHeight;

            $scope.$apply(function () {
                $scope.width = window.innerWidth;
                $scope.height = window.innerHeight;
            });
        });
    };

    $scope.getSize();

    $scope.init = function () {

        var user = AV.User.current();

        // var query = new AV.Query('Message');
        // query.include('sender');
        // query.include('receiver');
        // query.equalTo('sender', user);
        // query.descending('createdAt');
        // query.find().then(function (messages) {

        //     messages.forEach(function (message) {
        //         if(message.get('receiver')) {
        //             var fullName = message.get('receiver').get('fullName');
        //             var releaseTime = (message.createdAt.getMonth() + 1) + '/' + message.createdAt.getDate() + '/' + message.createdAt.getFullYear();
        //             var avatar =  message.get('receiver').get('avatarUrl');
        //             var content = message.get('content');

        //             $scope.send.push({fullName: fullName, releaseTime: releaseTime, avatar: avatar, content: content});
        //         }
        //     });

        //     $scope.$apply();

        // }).catch(function (error) {
        //     alert(JSON.stringify(error));
        // });

        var queryInbox = new AV.Query('Message');
        queryInbox.include('sender');
        queryInbox.include('receiver');
        queryInbox.equalTo('receiver', user);
        queryInbox.descending('createdAt');
        queryInbox.find().then(function (messages) {

            messages.forEach(function (message) {
                if (message.get('sender')) {
                    var fullName = message.get('sender').get('fullName');
                    var releaseTime = (message.createdAt.getMonth() + 1) + '/' + message.createdAt.getDate() + '/' + message.createdAt.getFullYear();
                    var avatar = message.get('sender').get('avatarUrl');
                    var content = message.get('content');
                    var id = message.get('sender').get('id');

                    var flagMessage = false;
                    $scope.inbox.forEach(function (msg) {
                        if (msg.senderId == message.get('sender').get('id')) {
                            flagMessage = true;
                        }
                    })

                    if (!flagMessage) {
                        $scope.inbox.push({ fullName: fullName, releaseTime: releaseTime, avatar: avatar, content: content, senderId: id });
                    }
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

    $scope.changeFolder = function () {
        $scope.showInbox = !$scope.showInbox;
    };

    $scope.goToConversation = function (message) {
        // localStorageService.cookie.set('sender', message.senderId);
        // $state.go('messages');

        var userId = message.senderId;
        $scope.senderId = message.senderId;

        var user = AV.User.current();
        var otherUser = AV.Object.createWithoutData('_User', userId);

        var queryInbox = new AV.Query('Message');
        queryInbox.equalTo('receiver', user);
        queryInbox.equalTo('sender', otherUser);

        var queryInbox1 = new AV.Query('Message');
        queryInbox1.equalTo('sender', user);
        queryInbox1.equalTo('receiver', otherUser);

        var queryOr = AV.Query.or(queryInbox, queryInbox1);
        queryOr.ascending('createdAt');
        queryOr.include('sender');
        queryOr.include('receiver');
        queryOr.find().then(function (messages) {

            $scope.Messages = [];

            messages.forEach(function (msg) {

                var fullName, avatar, type = '';
                if (msg.get('sender').get('id') == userId) {
                    fullName = msg.get('sender').get('fullName');
                    avatar = msg.get('sender').get('avatarUrl');
                    type = 'sender';
                } else {
                    fullName = msg.get('receiver').get('fullName');
                    avatar = msg.get('receiver').get('avatarUrl');
                    type = 'receiver';
                }

                var releaseTime = (msg.createdAt.getMonth() + 1) + '/' + msg.createdAt.getDate() + '/' + msg.createdAt.getFullYear();
                var content = msg.get('content');
                var readed = msg.get('readed');

                $scope.Messages.push({
                    fullName: fullName,
                    releaseTime: releaseTime,
                    avatar: avatar,
                    content: content,
                    readed: readed,
                    type: type
                });
            });

            $scope.$apply();
        })
    };

    $scope.sendMessage = function(){
        console.log($scope.messageText);
    };

    $scope.keyPress = function(event){
        if (event.keyCode === 13) {
            $scope.sendMessage();
        }
    };
}