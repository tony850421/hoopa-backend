app.controller('CoreTeamCtrl', ['$scope', '$rootScope', '$translate', CoreTeamCtrl]);

function CoreTeamCtrl($scope, $rootScope, $translate) {

    $scope.arrayMembers = [];
    $rootScope.activeList = 'coreTeam';

    $scope.coreTeamCharge = "";
    $scope.coreTeamName = "";
    $scope.coreTeamDescription = "";

    $scope.coreTeamChargeUpdate = "";
    $scope.coreTeamNameUpdate = "";
    $scope.coreTeamDescriptionUpdate = "";
    $scope.coreTeamImageUpdate = "";

    $scope.memberUpdateId = -1;

    $scope.changeValueMainImage = function () {
        readURL($('#coreTeamPicture')[0]);
    };

    $scope.init = function () {
        $("#updateMemberBox").addClass("ng-hide");

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
    };

    $scope.init();

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#mainTeamImage').attr('src', e.target.result);
                $scope.coreTeamImageUpdate = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    };

    $scope.deleteMember = function (id) {
        $("#updateMemberBox").addClass("ng-hide");
        var member = AV.Object.createWithoutData('CoreTeam', id);
        member.destroy().then(function (n) {
            $scope.init();
        })
    };

    $scope.updateMember = function (id) {
        window.scrollTo(0,document.body.scrollHeight);
        $("#updateMemberBox").removeClass("ng-hide");

        for (var i = 0; i < $scope.arrayMembers.length; i++) {
            if ($scope.arrayMembers[i].id == id) {
                $scope.coreTeamChargeUpdate = $scope.arrayMembers[i].charge;
                $scope.coreTeamNameUpdate = $scope.arrayMembers[i].name;
                $scope.coreTeamDescriptionUpdate = $scope.arrayMembers[i].description;
                $scope.coreTeamImageUpdate = $scope.arrayMembers[i].mainImage;
                $scope.coreTeamIdUpdate = id;
                $scope.$apply();
                break;
            }
        }
    };

    $scope.saveMember = function () {
        $("#updateMemberBox").addClass("ng-hide");
        var member = AV.Object.createWithoutData('CoreTeam', $scope.coreTeamIdUpdate);
        member.set('name', $scope.coreTeamNameUpdate);
        member.set('charge', $scope.coreTeamChargeUpdate);
        member.set('description', $scope.coreTeamDescriptionUpdate);

        var pos = -1;
        for (var i = 0; i < $scope.arrayMembers.length; i++) {
            if ($scope.arrayMembers[i].id == $scope.coreTeamIdUpdate) {
                $scope.arrayMembers[i].name = $scope.coreTeamNameUpdate;
                $scope.arrayMembers[i].charge = $scope.coreTeamChargeUpdate;
                $scope.arrayMembers[i].description = $scope.coreTeamDescriptionUpdate;
                pos = i;
                break;
            }
        }

        var file = $('#coreTeamPicture')[0].files[0];
        if (file) {
            var name = file.name;
            var avFile = new AV.File(name, file);
            member.set('image', avFile);
            
            $scope.arrayMembers[pos].mainImage = $scope.coreTeamImageUpdate;
        }

        member.save();
    };
}