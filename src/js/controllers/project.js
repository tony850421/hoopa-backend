
/**
 * Login and signup Controller
 */

angular
    .module('RDash')
    .controller('ProjectCtrl', ['$scope', '$window', ProjectCtrl]);

function ProjectCtrl($scope, $window) {

    $scope.package = {
        title : '',
        description : '',
        companyName : '',
        debitAmount : '',
        debitPricipalInterest : '',
        plainAddress : '',
        creditHighlights : '',
        court : '',
        comefrom : '',
        quotation : true,
        managerName : '',
        managerPhone : '',
        borrowerPrincipalDebit : '',
        borrowerInterestCreditor : '',
        borrowerTotalInterest : '',
    };

    $scope.asset = {
        typeArrival : '',
        constructionArea : '',
        landArea : '',
        plainAddress : '',
        latitude : '',
        longitude : '',
    };
    $scope.assets = [];

    $scope.typeArrivalArray = [{type: 'first', value: '1'}, {type: 'second', value: '2'},];
    $scope.typeSponsorArray = ['Personal', 'Enterprise',];

    $scope.sponsors = [];
    $scope.sponsor = {
        name : '',
        type : '',
        amount : '',
    };

    $scope.addSponsor = function(){
        if($scope.sponsor.name != '' && $scope.sponsor.type != '' && $scope.sponsor.amount != '' ) {

            $scope.sponsors.push({name: $scope.sponsor.name, type:$scope.sponsor.type, amount: $scope.sponsor.amount});
            $scope.sponsor.name = $scope.sponsor.type = $scope.sponsor.amount = '' ;
        } else {
            alert('Please, complete the sponsor information');
        }
    };

    $scope.addAsset = function(){
        if($scope.asset.typeArrival != '' && $scope.asset.constructionArea != '' && $scope.asset.landArea != ''  
            && $scope.asset.plainAddress != ''  && $scope.asset.latitude != '' && $scope.asset.longitude != '' ) {

            $scope.assets.push({typeArrival: $scope.asset.typeArrival, constructionArea: $scope.asset.constructionArea, landArea: $scope.asset.landArea, 
                               plainAddress: $scope.asset.plainAddress, latitude: $scope.asset.latitude, longitude: $scope.asset.longitude});
            $scope.asset.typeArrival=$scope.asset.constructionArea=$scope.asset.landArea=$scope.asset.plainAddress=$scope.asset.latitude=$scope.asset.longitude = '';
        } else {
            alert('Please, complete the asset information');
        }      
    };

    $scope.deleteAsset = function(index){
        $scope.assets.splice(index, 1);
    }

    $scope.deleteSponsor = function(index){
        $scope.sponsors.splice(index, 1);
    }

    $scope.releaseNewProject = function () {
        console.log('releaseNewProject');

        console.log('package.title:' + $scope.package.title);
        console.log('package.description:' + $scope.package.description);
        console.log('package.companyName:' + $scope.package.companyName);
        console.log('package.debitAmount:' + $scope.package.debitAmount);
        console.log('package.debitPricipalInterest:' + $scope.package.debitPricipalInterest);
        console.log('package.plainAddress:' + $scope.package.plainAddress);
        console.log('package.creditHighlights:' + $scope.package.creditHighlights);
        console.log('package.comefrom:' + $scope.package.comefrom);
        console.log('package.quotation:' + $scope.package.quotation);
        console.log('package.managerName:' + $scope.package.managerName);
        console.log('package.managerPhone:' + $scope.package.managerPhone);
        console.log('package.borrowerPrincipalDebit:' + $scope.package.borrowerPrincipalDebit);
        console.log('package.borrowerInterestCreditor:' + $scope.package.borrowerInterestCreditor);
        console.log('package.borrowerTotalInterest:' + $scope.package.borrowerTotalInterest);


        var currentUser = AV.User.current();
        if (currentUser) {
            console.log('ok: ' + currentUser.getUsername());

            var Project = AV.Object.extend('Project');

            var project = new Project();
            project.set('title', $scope.package.title);
            project.set('description', $scope.package.description);
            project.set('creator', AV.User.current());

            project.set('companyName', $scope.package.companyName);
            project.set('debitAmount', $scope.package.debitAmount);
            project.set('debitPricipalInterest', $scope.package.debitPricipalInterest);
            project.set('plainAddress', $scope.package.plainAddress);

            project.set('creditHighlights', $scope.package.creditHighlights);
            project.set('court', $scope.package.court);
            project.set('comefrom', $scope.package.companyName);
            project.set('quotation', $scope.package.quotation | false);
            
            var Manager = AV.Object.extend('ProjectManager');
            var manager = new Manager();
            manager.set('name', $scope.package.managerName);
            manager.set('phone', $scope.package.managerPhone);

            project.set('projectManager', manager);

            project.set('borrowerPrincipalDebit', $scope.package.borrowerPrincipalDebit);
            project.set('borrowerInterestCreditor', $scope.package.borrowerInterestCreditor);
            project.set('borrowerTotalInterest', $scope.package.borrowerTotalInterest);


            var file = $('#inputFile')[0].files[0];
            if(file) {
                var name = file.name;
                var avFile = new AV.File(name, file);
                project.set('image', avFile);
            }

            project.save().then(function (project) {

                //begin sponsor
                var Sponsor = AV.Object.extend('Sponsorship');
                var sponsorsArray = [];
                $scope.sponsors.forEach(function(obj) {
                    var sponsor = new Sponsor();
                    sponsor.set('name', obj.name);
                    sponsor.set('type', obj.type);
                    sponsor.set('amount', obj.amount);
                    sponsor.set('project', project);
                    // sponsor.save();
                    sponsorsArray.push(sponsor);
                });
                $scope.recursiveSponsorSave(sponsorsArray, 0);
                //end sponsor

                //begin asset
                var Asset = AV.Object.extend('Asset');
                var Address = AV.Object.extend('Address');
                var assetsArray = [];

                $scope.assets.forEach(function(obj) {
                    var asset = new Asset();
                    asset.set('typeArrival', obj.typeArrival.value);
                    asset.set('constructionArea', obj.constructionArea);
                    asset.set('landArea', obj.landArea);

                    var address = new Address();
                    address.set('plain', obj.plainAddress);
    
                    var location = new AV.GeoPoint(obj.latitude, obj.longitude);
                    address.set('location', location);
        
                    asset.set('address', address);
                    asset.set('project', project);
                    // asset.save();
                    assetsArray.push(asset);
                });
                $scope.recursiveAssetSave(assetsArray, 0);
                //end asset

                console.log('project inserted ok');
                $window.location.href = '#/project-list';
            }, function (error) {
                alert(JSON.stringify(error));
            });

        } else {
            console.log('ups');
            $window.location.href = '#/login';
        }
    };

    $scope.recursiveSponsorSave = function(arrayObj, index) {
        console.log('recursiveSponsorSave:' + arrayObj.length + ' ' + index);
        if(index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveSponsorSave(arrayObj, index + 1);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        }
    }

    $scope.recursiveAssetSave = function(arrayObj, index) {
        console.log('recursiveAssetSave:' + arrayObj.length + ' ' + index);
        if(index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveAssetSave(arrayObj, index + 1);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        }
    }
}