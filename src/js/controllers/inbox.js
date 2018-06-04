
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
                    var aux = content;
                    var unreaded = message.get('readedAdmin');
                    var unreadedCount= 0;
                    if (!unreaded){
                        unreadedCount = 1;
                    }

                    if (content.length > 15){
                        var aux = '';
                        for (var t=0; t<15; t++){
                            aux += content[t];
                        }
                        aux+= '...';
                    }
                    content = aux;
                    var id = message.get('sender').id;

                    var flagMessage = false;
                    $scope.inbox.forEach(function (msg) {
                        if (msg.senderId == message.get('sender').id) {
                            flagMessage = true;
                            if (!unreaded){
                                msg.unreadedCount +=1;                                
                            }
                        }
                    })

                    if (!flagMessage) {
                        $scope.inbox.push({ fullName: fullName, releaseTime: releaseTime, avatar: avatar, content: content, senderId: id, unreadedCount: unreadedCount });
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

        $scope.inbox.forEach(function(mess){
            if (mess.senderId == $scope.senderId){
                mess.unreadedCount = 0;
            }
        })

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
                if (msg.get('sender').id == userId) {
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
                var id = msg.id;

                $scope.Messages.push({
                    fullName: fullName,
                    releaseTime: releaseTime,
                    avatar: avatar,
                    content: content,
                    readed: readed,
                    type: type,
                    id: id
                });

                msg.set('readedAdmin', true);
                msg.save();
            });

            $scope.$apply();

            var objDiv = document.getElementById('messagesCamp');
            objDiv.scrollTop = objDiv.scrollHeight;
        })
    };

    $scope.sendMessage = function () {

        if ($scope.messageText != '') {

            var newMessage = new AV.Object('Message');
            newMessage.set('sender', AV.User.current());
            var receiver = AV.Object.createWithoutData('_User', $scope.senderId);
            newMessage.set('receiver', receiver);
            newMessage.set('content', $scope.messageText);
            newMessage.set('readed', false);
            newMessage.set('readedAdmin', true);

            var acl = new AV.ACL();
            acl.setPublicReadAccess(true);
            acl.setWriteAccess(AV.User.current(), true);
            acl.setWriteAccess(receiver, true);
            newMessage.setACL(acl);

            newMessage.save().then(function (msg) {
                $scope.messageText = '';

                var fullName, avatar, type = '';
                if (msg.get('sender').id == $scope.senderId) {
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

                $scope.$apply();

                var objDiv = document.getElementById('messagesCamp');
                objDiv.scrollTop = objDiv.scrollHeight;
            })
        }
    };

    $scope.keyPress = function (event) {
        if (event.keyCode === 13) {
            $scope.sendMessage();
        }
    };
}