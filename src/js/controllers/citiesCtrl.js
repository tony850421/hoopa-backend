app.controller('CitiesCtrl', ['$scope', '$rootScope', '$translate', CitiesCtrl]);

function CitiesCtrl($scope, $rootScope, $translate) {

    $scope.arrayCities = [];
    $rootScope.activeList = 'cities';

    $scope.cityPrice = "";
    $scope.cityName = "";
    $scope.cityDescription = "";

    $scope.priceUpdate = "";
    $scope.nameUpdate = "";
    $scope.descriptionUpdate = "";
    $scope.imageUpdate = "";

    $scope.memberUpdateId = -1;

    $scope.changeValueMainImage = function () {
        readURL($('#coreTeamPicture')[0]);
    };

    $scope.init = function () {
        $("#updateMemberBox").addClass("ng-hide");

        $scope.arrayCities = [];
        var cities = new AV.Query('Cities');
        cities.find().then(function (res) {
            res.forEach(function (element) {
                var mainImage = element.get('image').thumbnailURL(240, 240);
                var price = element.get('price');
                var id = element.id;
                var name = element.get('name');
                var description = element.get('description');

                $scope.arrayCities.push({
                    id: id,
                    price: price,
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
                $scope.imageUpdate = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    };

    $scope.deleteMember = function (id) {
        $("#updateMemberBox").addClass("ng-hide");
        var member = AV.Object.createWithoutData('Cities', id);
        member.destroy().then(function (n) {
            $scope.init();
        })
    };

    $scope.updateMember = function (id) {
        window.scrollTo(0,document.body.scrollHeight);
        $("#updateMemberBox").removeClass("ng-hide");

        for (var i = 0; i < $scope.arrayCities.length; i++) {
            if ($scope.arrayCities[i].id == id) {
                $scope.priceUpdate = $scope.arrayCities[i].price;
                $scope.nameUpdate = $scope.arrayCities[i].name;
                $scope.descriptionUpdate = $scope.arrayCities[i].description;
                $scope.imageUpdate = $scope.arrayCities[i].mainImage;
                $scope.coreTeamIdUpdate = id;
                $scope.$apply();
                break;
            }
        }
    };

    $scope.saveMember = function () {
        $("#updateMemberBox").addClass("ng-hide");
        var member = AV.Object.createWithoutData('Cities', $scope.coreTeamIdUpdate);
        member.set('name', $scope.nameUpdate);
        member.set('price', $scope.priceUpdate);
        member.set('description', $scope.descriptionUpdate);

        var pos = -1;
        for (var i = 0; i < $scope.arrayCities.length; i++) {
            if ($scope.arrayCities[i].id == $scope.coreTeamIdUpdate) {
                $scope.arrayCities[i].name = $scope.nameUpdate;
                $scope.arrayCities[i].price = $scope.priceUpdate;
                $scope.arrayCities[i].description = $scope.descriptionUpdate;
                pos = i;
                break;
            }
        }

        var file = $('#coreTeamPicture')[0].files[0];
        if (file) {
            var name = file.name;
            var avFile = new AV.File(name, file);
            member.set('image', avFile);
            
            $scope.arrayCities[pos].mainImage = $scope.imageUpdate;
        }

        member.save();
    };
}