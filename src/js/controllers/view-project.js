app.controller('ViewProjectCtrl', ['$scope', '$state', '$rootScope', '$window', '$translate', 'localStorageService', ViewProjectCtrl]);

function ViewProjectCtrl($scope, $state, $rootScope, $window, $translate, localStorageService) {

    $scope.project = {};
    $scope.sponsorsList = [];
    $scope.assetsList = [];
    $scope.borrowerList = [];
    $scope.imageList = [];
    $scope.imageOpenModal = 0;

    $scope.init = function () {
        var id = localStorageService.cookie.get('projectId');

        var query = new AV.Query("Project")
        query.include('projectManager')
        query.get(id).then(function (p) {

            $scope.project = p;
            $scope.$apply();

            var query1 = new AV.Query("Sponsorship")
            query1.equalTo('project', p)
            query1.find().then(function (sponsors) {
                $scope.sponsorsList = sponsors;
                console.log($scope.sponsorsList);
                $scope.$apply();
            })

            var query2 = new AV.Query("Asset")
            query2.equalTo('project', p)
            query2.find().then(function (assets) {
                $scope.assetsList = assets;
                $scope.$apply();
            })

            var query3 = new AV.Query("Borrower")
            query3.equalTo('project', p)
            query3.find().then(function (borrowers) {
                for (var i = 0; i < borrowers.length; i++) {
                    borrowers[i].set('totalInterest', parseFloat(borrowers[i].get('principalDebit')) + parseFloat(borrowers[i].get('interestCreditor')));
                }
                $scope.borrowerList = borrowers;
                $scope.$apply();
            })

            var query4 = new AV.Query("ProjectMedia")
            query4.equalTo('project', p)
            query4.find().then(function (images) {
                
                for (var i = 0; i < images.length; i++) {
                    images[i].set('imageUrl', images[i].get('image').thumbnailURL(200, 150));
                    images[i].set('url', images[i].get('image').thumbnailURL(1280, 720));
                }

                $scope.imageList = images;
                $scope.$apply();
            })
        })
    };

    $scope.init();

    $scope.OpenImage = function(num) {
        $scope.imageOpenModal = num;
        $('#openImage').modal('show');
    };

    $scope.closeImage = function(num) {
        $('#openImage').modal('hide');
    };

    $scope.prevImageModal = function() {
        $scope.imageOpenModal--;
        $scope.$apply();
    };

    $scope.nextImageModal = function() {
        $scope.imageOpenModal++;
        $scope.$apply();
    };

}