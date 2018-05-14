
/**
 * Login and signup Controller
 */

angular
    .module('RDash')
    .controller('ProjectCtrl', ['$scope', '$window', ProjectCtrl]);

function ProjectCtrl($scope, $window) {

    $scope.title = '';
    $scope.price = '';
    $scope.description = '';

    $scope.releaseNewProject = function () {
        console.log('releaseNewProject: ' + $scope.title + ' ' + $scope.price + ' ' + $scope.description);

        var currentUser = AV.User.current();
        if (currentUser) {
            console.log('ok: ' + currentUser.getUsername());

            var Project = AV.Object.extend('Project');

            var project = new Project();
            project.set('title', $scope.title);
            project.set('price', $scope.price);
            project.set('description', $scope.description);
            project.set('creator', AV.User.current());

            var file = $('#inputFile')[0].files[0];
            if(file) {
                var name = file.name;
                var avFile = new AV.File(name, file);
                project.set('image', avFile);
            }

            project.save().then(function () {
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
}