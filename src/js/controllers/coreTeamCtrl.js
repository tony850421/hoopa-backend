app.controller('CoreTeamCtrl', ['$scope', '$rootScope', '$translate', CoreTeamCtrl]);

function CoreTeamCtrl($scope, $rootScope, $translate) {

    $scope.arrayMembers = [];
    $rootScope.activeList = 'coreTeam';
    $scope.coreTeamCharge = "";
    $scope.coreTeamName = "";
    $scope.coreTeamDescription = "";

    $scope.changeValueMainImage = function () {
        readURL($('#coreTeamPicture')[0]);
    }

    $scope.init = function () {
        $scope.arrayMembers = [];
        var coreTeam = new AV.Query('CoreTeam');
        coreTeam.find().then(function (res) {
            res.forEach(function (element) {
                var mainImage = element.get('image').thumbnailURL(100, 100);
                var charge = element.get('charge');
                var id = element.id;
                var name = element.get('name');
                var description = element.get('description');

                $scope.arrayMembers.push({
                    id: id,
                    charge: charge,
                    mainImage: mainImage,
                    name: name,
                    description: description
                })
                $scope.$apply();
            });
        });
    }

    $scope.init();

    $scope.addmember = function () {

        var file = $('#coreTeamPicture')[0].files[0];
        if (file) {
            var name = file.name;
            var avFile = new AV.File(name, file);

            if ($scope.coreTeamCharge != "" && $scope.coreTeamDescription != "" && $scope.coreTeamName != "") {

                var Team = AV.Object.extend('CoreTeam');
                var member = new Team();
                member.set('charge', $scope.coreTeamCharge);
                member.set('description', $scope.coreTeamDescription);
                member.set('name', $scope.coreTeamName);
                member.set('image', avFile);
                member.save().then(function (res) {
                    $scope.init();
                    $scope.coreTeamCharge = "";
                    $scope.coreTeamName = "";
                    $scope.coreTeamDescription = "";
                }, function (error) {

                });
            } else {
                console.log("empty");
            }
        } else {
            console.log("no file");
        }

    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#mainTeamImage').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $scope.deleteMember = function(id){
        var team = AV.Object.createWithoutData('CoreTeam', id);
        team.destroy().then(function (n) {
            $scope.init();
        })
    }
}