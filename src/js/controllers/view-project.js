app.controller('ViewProjectCtrl', ['$scope', '$state', '$rootScope', '$window', '$translate', 'localStorageService', ViewProjectCtrl]);

function ViewProjectCtrl($scope, $state, $rootScope, $window, $translate, localStorageService) {

    $scope.project = {};
    $scope.sponsorsList = [];
    $scope.assetsList = [];
    $scope.borrowerList = [];
    $scope.imageList = [];
    $scope.imageOpenModal = 0;

    $scope.projectTitle = '';
    $scope.projectTitleEdited = false;

    $scope.projectCompany = '';
    $scope.projectCompanyEdited =  false;

    $scope.projectDescription = '';
    $scope.projectDescriptionEdited =  false;

    $scope.projectDebitAmount = '';
    $scope.projectDebitAmountEdited =  false;

    $scope.projectPrincipal = '';
    $scope.projectPrincipalEdited = false;

    $scope.projectComeFrom = '';
    $scope.projectComeFromEdited = false;

    $scope.projectProvince = '';
    $scope.projectProvinceEdited = false;

    $scope.projectAddress = '';
    $scope.projectAddressEdited = false;

    $scope.projectCredits = '';
    $scope.projectCreditsEdited = false;

    $scope.init = function () {
        var id = localStorageService.cookie.get('projectId');

        var query = new AV.Query("Project")
        query.include('projectManager')
        query.get(id).then(function (p) {

            $scope.project = p;
            $scope.$apply();
            $scope.projectTitle = p.get('title');
            $scope.projectCompany = p.get('companyName');
            $scope.projectDescription = p.get('description');
            $scope.projectDebitAmount = p.get('debitAmount');
            $scope.projectPrincipal = p.get('debitPricipalInterest');
            $scope.projectComeFrom = p.get('comefrom');
            $scope.projectProvince = p.get('province');
            $scope.projectAddress = p.get('plainAddress');
            $scope.projectCredits = p.get('creditHighlights');
            

            var query1 = new AV.Query("Sponsorship")
            query1.equalTo('project', p)
            query1.find().then(function (sponsors) {
                $scope.sponsorsList = sponsors;
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

    $scope.OpenImage = function (num) {
        $scope.imageOpenModal = num;
        $('#openImage').modal('show');
    };

    $scope.closeImage = function (num) {
        $('#openImage').modal('hide');
    };

    $scope.prevImageModal = function () {
        $scope.imageOpenModal--;
        $scope.$apply();
    };

    $scope.nextImageModal = function () {
        $scope.imageOpenModal++;
        $scope.$apply();
    };

    $scope.editProjectTitle = function () {
        if ($scope.projectTitleEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('title', $scope.projectTitle);
            project.save();
        }
        $scope.projectTitleEdited = !$scope.projectTitleEdited;
    };

    $scope.editProjectCompany = function(){
        if ($scope.projectCompanyEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('companyName', $scope.projectCompany);
            project.save();
        }
        $scope.projectCompanyEdited = !$scope.projectCompanyEdited;
    };

    $scope.editProjectDescription = function(){
        if ($scope.projectDescriptionEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('description', $scope.projectDescription);
            project.save();
        }
        $scope.projectDescriptionEdited = !$scope.projectDescriptionEdited;
    };

    $scope.editProjectDebitAmount = function(){
        if ($scope.projectDebitAmountEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('debitAmount', parseFloat($scope.projectDebitAmount));
            project.save();
        }
        $scope.projectDebitAmountEdited = !$scope.projectDebitAmountEdited;
    };

    $scope.editProjectPrincipal = function(){
        if ($scope.projectPrincipalEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('debitPricipalInterest', $scope.projectPrincipal);
            project.save();
        }
        $scope.projectPrincipalEdited = !$scope.projectPrincipalEdited;
    };

    $scope.editProjectComeFrom = function(){
        if ($scope.projectComeFromEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('comefrom', $scope.projectComeFrom);
            project.save();
        }
        $scope.projectComeFromEdited = !$scope.projectComeFromEdited;
    };

    $scope.editProjectProvince = function(){
        if ($scope.projectProvinceEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('province', $scope.projectProvince);
            project.save();
        }
        $scope.projectProvinceEdited = !$scope.projectProvinceEdited;
    };

    $scope.editProjectAddress = function(){
        if ($scope.projectAddressEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('plainAddress', $scope.projectAddress);
            project.save();
        }
        $scope.projectAddressEdited = !$scope.projectAddressEdited;
    };

    $scope.editProjectCredits = function(){
        if ($scope.projectCreditsEdited) {
            var id = localStorageService.cookie.get('projectId');
            var project = AV.Object.createWithoutData('Project', id);
            project.set('creditHighlights', $scope.projectCredits);
            project.save();
        }
        $scope.projectCreditsEdited = !$scope.projectCreditsEdited;
    };

}