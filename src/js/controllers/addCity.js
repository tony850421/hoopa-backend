app.controller('AddCityCtrl', ['$scope', '$rootScope', '$translate', '$state', AddCityCtrl]);

function AddCityCtrl($scope, $rootScope, $translate, $state) {

    $rootScope.activeList = 'addCity';

    $scope.cityName = "";
    $scope.cityPrice = "";
    $scope.cityDescription = "";

    $scope.changeValueMainImage = function () {
        readURL($('#cityPicture')[0]);
    };

    $scope.addCity = function () {

        var file = $('#cityPicture')[0].files[0];
        if (file) {
            var name = file.name;
            var avFile = new AV.File(name, file);

            if ($scope.cityName != "" && $scope.cityPrice != "" && $scope.cityDescription != "") {

                var City = AV.Object.extend('Cities');
                var city = new City();
                city.set('name', $scope.cityName);
                city.set('description', $scope.cityDescription);
                city.set('price', $scope.cityPrice);
                city.set('image', avFile);
                city.save().then(function (res) {
                    $scope.cityName = "";
                    $scope.cityPrice = "";
                    $scope.cityDescription = "";
                    $state.go('cities');
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
                $('#cityImage').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    };
}