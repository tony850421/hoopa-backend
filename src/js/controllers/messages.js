
/**
 * Login and signup Controller
 */

app.controller('MessagesCtrl', ['$scope', '$window', '$translate', 'localStorageService', MessagesCtrl]);

function MessagesCtrl($scope, $window, $translate, localStorageService) {

    $scope.Messages = [];
    $scope.width = '';
    $scope.height = '';
    $scope.messageText = '';

    $scope.getSize = function(){
        $scope.width = window.innerWidth;
        $scope.height = window.innerHeight;

        $(window).resize(function(){
            $scope.width = window.innerWidth;
            $scope.height = window.innerHeight;
        
            $scope.$apply(function(){
                $scope.width = window.innerWidth;
                $scope.height = window.innerHeight;
            });
        });
    };

    $scope.getSize();

    $scope.init = function(){
        var userId = localStorageService.cookie.get('sender');

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
        queryOr.find().then(function(messages){
            
            messages.forEach(function(msg){
                
                var fullName, avatar, type = '';
                if (msg.get('sender').get('id') == userId){
                    fullName = msg.get('sender').get('fullName');
                    avatar =  msg.get('sender').get('avatarUrl');
                    type = 'sender';
                } else {
                    fullName = msg.get('receiver').get('fullName');                
                    avatar =  msg.get('receiver').get('avatarUrl');
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

    $scope.init();

    $scope.sendMessage = function(){
        console.log($scope.messageText);
    };

    $scope.keyPress = function(event){
        if (event.keyCode === 13) {
            $scope.sendMessage();
        }
    };
    
}