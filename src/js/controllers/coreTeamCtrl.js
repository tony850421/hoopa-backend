
app.controller('CoreTeamCtrl', ['$scope', '$rootScope', CoreTeamCtrl]);

function CoreTeamCtrl($scope, $rootScope) {

    $scope.arrayMembers = [];

    $scope.coreTeamCharge = "";
    $scope.coreTeamName = "";
    $scope.coreTeamDescription = "";

    $scope.changeValueMainImage = function () {
        readURL($('#coreTeamPicture')[0]);
    }

    $scope.addmember = function () {

        var file = $('#coreTeamPicture')[0].files[0];
        if (file) {
            var name = file.name;
            var avFile = new AV.File(name, file);
            // $scope.news.set('image', avFile);
            // console.log(avFile);

            $scope.member = [];

            if ($scope.coreTeamCharge != "" && $scope.coreTeamDescription != "" && $scope.coreTeamName != "") {
                $scope.member[0] = $scope.coreTeamCharge;
                $scope.member[1] = $scope.coreTeamDescription;
                $scope.member[2] = $scope.coreTeamName;
                $scope.member[3] = avFile;
                $scope.arrayMembers.push($scope.member);
                console.log($scope.arrayMembers);
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
}