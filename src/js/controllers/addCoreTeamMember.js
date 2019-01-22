app.controller('AddCoreTeamCtrl', ['$scope', '$rootScope', '$translate', '$state', AddCoreTeamCtrl]);

function AddCoreTeamCtrl($scope, $rootScope, $translate, $state) {

    $scope.arrayMembers = [];
    $rootScope.activeList = 'addCoreTeamMember';

    $scope.coreTeamCharge = "";
    $scope.coreTeamName = "";
    $scope.coreTeamDescription = "";

    $scope.changeValueMainImage = function () {
        readURL($('#coreTeamPicture')[0]);
    };

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
                    $scope.coreTeamCharge = "";
                    $scope.coreTeamName = "";
                    $scope.coreTeamDescription = "";
                    $state.go('coreTeamView');
                }, function (error) {

                });
            } else {
                console.log("empty");
            }
        } else {
            console.log("no file");
        }

    };

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#mainTeamImage').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    };
}