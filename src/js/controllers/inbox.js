
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
        query.equalTo('sender', user);
        query.find().then(function (messageSend) {
            $scope.send = messageSend;
            $scope.$apply();

            for (var i = 0; i < messageSend.length; i++) {
                var flag = false;
                for (var x = 0; x < $scope.usersAux.length; x++) {
                    if (messageSend[i].attributes.receiver.id == $scope.usersAux[x]) {
                        flag = true;
                    }
                }
                if (!flag) {
                    $scope.usersAux.push(messageSend[i].attributes.receiver.id);
                }
            }

        }).catch(function (error) {
            alert(JSON.stringify(error));
        });

        var queryInbox = new AV.Query('Message');
        queryInbox.equalTo('receiver', user);
        queryInbox.find().then(function (messageInbox) {
            $scope.inbox = messageInbox;
            $scope.$apply();

            for (var i = 0; i < messageInbox.length; i++) {
                var flag = false;
                for (var x = 0; x < $scope.usersAux.length; x++) {
                    if (messageInbox[i].attributes.sender.id == $scope.usersAux[x]) {
                        flag = true;
                    }
                }
                if (!flag) {
                    $scope.usersAux.push(messageInbox[i].attributes.sender.id);
                }
            }


        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };

    $scope.init();

    $scope.getImageUrl = function (id) {
        var query = new AV.Query('_User');
        query.get(id).then(function(user) {
            console.log(user);
        })
        return '../img/avatar.jpg';
    };

    $scope.changeFolder = function(){
        $scope.showInbox = !$scope.showInbox;
    };
}