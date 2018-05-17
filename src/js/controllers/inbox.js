
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
        query.find().then(function (messageSend) {
            $scope.send = messageSend;

            for (var i = 0; i < messageSend.length; i++) {
                console.log( messageSend[i].get('sender').get('nickName'));
                console.log( messageSend[i].get('receiver').get('nickName'));
                var flag = false;
                for (var x = 0; x < $scope.usersAux.length; x++) {
                    if (messageSend[i].attributes.receiver.id == $scope.usersAux[x]) {
                        flag = true;
                    }
                }
                if (!flag) {

                    // console.log(messageSend[i].attributes.receiver.id);
                    // query.get(messageSend[i].attributes.receiver.id).then(function(user) {
                    //     console.log(user);
                    // }).catch(function (error) {
                    //     alert(JSON.stringify(error));
                    // })
                }
            }
            $scope.$apply();

        }).catch(function (error) {
            alert(JSON.stringify(error));
        });

        var queryInbox = new AV.Query('Message');
        queryInbox.include('sender');
        queryInbox.include('receiver');
        queryInbox.equalTo('receiver', user);
        queryInbox.find().then(function (messageInbox) {

            for (var i = 0; i < messageInbox.length; i++) {
                console.log( messageInbox[i].get('receiver').get('nickName'));
                console.log( messageInbox[i].get('sender').get('nickName'));
                $scope.inbox = messageInbox;

                var flag = false;
                for (var x = 0; x < $scope.usersAux.length; x++) {
                    if (messageInbox[i].attributes.sender.id == $scope.usersAux[x]) {
                        flag = true;
                    }
                }
                if (!flag) {
                    // var query = new AV.Query('_User');
                    // console.log(messageInbox[i].attributes.sender.id);
                    // query.get(messageInbox[i].attributes.sender.id).then(function(user) {
                    //     console.log(user);
                    // }).catch(function (error) {
                    //     alert(JSON.stringify(error));
                    // })
                    // $scope.usersAux.push();
                }
            }

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