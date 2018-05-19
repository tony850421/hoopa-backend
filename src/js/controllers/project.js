
/**
 * Login and signup Controller
 */

angular
    .module('RDash')
    .controller('ProjectCtrl', ['$scope', '$window', ProjectCtrl]);

function ProjectCtrl($scope, $window) {

    $scope.package = {
        title: '',
        description: '',
        companyName: '',
        debitAmount: '',
        debitPricipalInterest: '',
        plainAddress: '',
        province: '',
        creditHighlights: '',
        court: '',
        comefrom: '',
        quotation: true,
        managerName: '',
        managerPhone: '',
        borrowerPrincipalDebit: '',
        borrowerInterestCreditor: '',
        borrowerTotalInterest: '',
        typeArrivalString: '',
    };

    $scope.asset = {
        typeArrival: '',
        constructionArea: '',
        landArea: '',
        plainAddress: '',
        latitude: '',
        longitude: '',
    };
    $scope.assets = [];

    $scope.typeArrivalArray = ['动产', '项目信息', '金融账户', '股权信息', '应收账款', '承租权', '特许经营权', '知识产权',
        '土地+房产', '商业', '住宅', '林地', '停车场', '宅基地', '在建工程', '厂房', '预售房产', '矿产',
        '住宅用地', '仓储用地', '商业服务业用地', '旅游业用地', '金融服务业用地', '市政公用设施用地', '绿代用地',
        '公共建筑用地', '文/体/娱用地', '机关/宣传用地', '科研设计用地', '教育用地', '医卫用地', '交通用地',
        '铁路用地', '民用机场用地', '港口码头用地', '其他交通用地', '写字楼', '仓储', '商铺', '商业住宅', '住宅', '车位'
    ];

    $scope.typeSponsorArray = ['个人', '企业'];

    $scope.provinces = ['安徽省', '北京市', '重庆市', '福建省', '广东省', '甘肃省', '广西壮族自治区', '贵州省', '河南省', '湖北省', '河北省',
        '海南省', '香港特别行政区', '黑龙江省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省', '澳门特别行政区', '內蒙古自治区',
        '宁夏回族自治区', '青海省', '四川省', '山东省', '上海市', '陕西省', '山西省', '天津市', '台湾省', '新疆维吾尔自治区',
        '西藏自治区', '云南省', '浙江省'
    ];

    $scope.sponsors = [];
    $scope.sponsor = {
        name: '',
        type: '',
        amount: '',
    };

    $scope.addSponsor = function () {
        if ($scope.sponsor.name != '' && $scope.sponsor.type != '' && $scope.sponsor.amount != '') {

            if (!isNaN($scope.sponsor.amount)) {
                $scope.sponsors.push({ name: $scope.sponsor.name, type: $scope.sponsor.type, amount: $scope.sponsor.amount });
                $scope.sponsor.name = $scope.sponsor.type = $scope.sponsor.amount = '';
            } else {
                alert('Amount must be a number');
            }

        } else {
            alert('Please, complete the sponsor information');
        }
    };

    $scope.addAsset = function () {
        if ($scope.asset.typeArrival != '' && $scope.asset.constructionArea != '' && $scope.asset.landArea != ''
            && $scope.asset.plainAddress != '' && $scope.asset.latitude != '' && $scope.asset.longitude != '') {

            if (!isNaN($scope.asset.constructionArea) && !isNaN($scope.asset.landArea) && !isNaN($scope.asset.latitude) && !isNaN($scope.asset.longitude)) {
                $scope.assets.push({
                    typeArrival: $scope.asset.typeArrival, constructionArea: $scope.asset.constructionArea, landArea: $scope.asset.landArea,
                    plainAddress: $scope.asset.plainAddress, latitude: $scope.asset.latitude, longitude: $scope.asset.longitude
                });
                $scope.asset.typeArrival = $scope.asset.constructionArea = $scope.asset.landArea = $scope.asset.plainAddress = $scope.asset.latitude = $scope.asset.longitude = '';
            } else {
                alert('Please, cheack the input values');
            }

        } else {
            alert('Please, complete the asset information');
        }
    };

    $scope.deleteAsset = function (index) {
        $scope.assets.splice(index, 1);
    }

    $scope.deleteSponsor = function (index) {
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

        //valitations
        if (!isNaN($scope.package.debitAmount) && ($scope.package.title != '')) {
            var currentUser = AV.User.current();
            if (currentUser) {
                console.log('ok: ' + currentUser.getUsername());

                var Project = AV.Object.extend('Project');

                var project = new Project();
                project.set('title', $scope.package.title);
                project.set('description', $scope.package.description);
                project.set('creator', AV.User.current());

                project.set('companyName', $scope.package.companyName);
                project.set('debitAmount', parseInt($scope.package.debitAmount));
                project.set('debitPricipalInterest', $scope.package.debitPricipalInterest);
                project.set('plainAddress', $scope.package.plainAddress);
                project.set('province', $scope.package.province);

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
                if (file) {
                    var name = file.name;
                    var avFile = new AV.File(name, file);
                    project.set('image', avFile);
                }

                var Asset = AV.Object.extend('Asset');
                // var Address = AV.Object.extend('Address');
                var assetsArray = [];

                //begin asset
                $scope.assets.forEach(function (obj) {

                    $scope.package.typeArrivalString += ('+' + obj.typeArrival);

                    var asset = new Asset();
                    asset.set('typeArrival', obj.typeArrival);
                    asset.set('constructionArea', obj.constructionArea);
                    asset.set('landArea', obj.landArea);
                    asset.set('plainAddress', obj.plainAddress);

                    var location = new AV.GeoPoint(parseFloat(obj.latitude), parseFloat(obj.longitude));
                    asset.set('location', location);

                    asset.set('project', project);
                    // asset.save();
                    assetsArray.push(asset);
                });
                //end asset

                //for filter
                project.set('typeArrivalString', $scope.package.typeArrivalString);

                project.save().then(function (project) {

                    //begin sponsor
                    var Sponsor = AV.Object.extend('Sponsorship');
                    var sponsorsArray = [];
                    $scope.sponsors.forEach(function (obj) {
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
        } else {
            alert('Please, cheack the input values');
        }



    };

    $scope.recursiveSponsorSave = function (arrayObj, index) {
        console.log('recursiveSponsorSave:' + arrayObj.length + ' ' + index);
        if (index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveSponsorSave(arrayObj, index + 1);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        }
    }

    $scope.recursiveAssetSave = function (arrayObj, index) {
        console.log('recursiveAssetSave:' + arrayObj.length + ' ' + index);
        if (index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveAssetSave(arrayObj, index + 1);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        }
    }
}