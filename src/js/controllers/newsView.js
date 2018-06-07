app.controller('NewsViewCtrl', ['$scope', '$rootScope', '$window', '$timeout', 'localStorageService', NewsViewCtrl]);

function NewsViewCtrl($scope, $rootScope, $window, $timeout, localStorageService) {

    $scope.new = {};

    $scope.init = function(){
        var id = localStorageService.cookie.get('newsId');
        
        var query = new AV.Query("News")
        query.get(id).then(function(n){
            $scope.new = n;
            $scope.$apply();
        })
    };

    $scope.init();
}