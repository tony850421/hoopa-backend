
/**
 * Login and signup Controller
 */

app.controller('ProjectCtrl', ['$scope', '$rootScope', '$window', '$translate', ProjectCtrl]);

function ProjectCtrl($scope, $rootScope, $window, $translate) {

    $scope.loading = false;
    $rootScope.activeList = 'newprojects';
    $scope.project = {};

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
        quotation: false,
        managerName: '',
        managerPhone: '',
        typeArrivalString: '',
        provinceString: '',
        isRecommended: false,
        isHot: false,
        isHouse: false,
        isFactory: false,
        isDebt: false,
        isShop: false,
    };

    $scope.asset = {
        title: '',
        province: '',
        typeArrival: '',
        constructionArea: '0',
        landArea: '0',
        plainAddress: '',
        latitude: '',
        longitude: '',
        stringLocation: ''
    };
    $scope.assets = [];

    // $scope.typeArrivalArray = ['动产', '项目信息', '金融账户', '股权信息', '应收账款', '承租权', '特许经营权', '知识产权',
    //     '土地+房产', '商业', '住宅', '林地', '停车场', '宅基地', '在建工程', '厂房', '预售房产', '矿产',
    //     '住宅用地', '仓储用地', '商业服务业用地', '旅游业用地', '金融服务业用地', '市政公用设施用地', '绿代用地',
    //     '公共建筑用地', '文/体/娱用地', '机关/宣传用地', '科研设计用地', '教育用地', '医卫用地', '交通用地',
    //     '铁路用地', '民用机场用地', '港口码头用地', '其他交通用地', '写字楼', '仓储', '商铺', '商业住宅', '住宅', '车位'
    // ]; 

    $scope.typeArrivalArray = ['住宅', '商铺', '写字楼', '厂房', '在建工程', '机械设备，存货，原材料', '土地（无厂房', 
                                '林权', '海城使用权', '商住', '无抵押', '其他'
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
        amount: '0',
    };

    $scope.borrowers = [];
    $scope.borrower = {
        name: '',
        principalDebit: '0',
        interestCreditor: '0',
        // totalInterest: '',
    };

    $scope.files = [];

    $scope.initProject = function() {
        console.log('initProject');
        var Project = AV.Object.extend('Project');
        $scope.project = new Project();
    };

    $scope.initProject();

    $scope.alerts = [
        // {
        //     type: 'success',
        //     msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
        // }, {
        //     type: 'danger',
        //     msg: 'Found a bug? Create an issue with as many details as you can.'
        // }
    ];
    $scope.alertsAsset = [];
    $scope.alertsBorrower = [];
    $scope.alertsSponsor = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.closeAlertBorrower = function(index) {
        $scope.alertsBorrower.splice(index, 1);
    };

    $scope.closeAlertAsset = function(index) {
        $scope.alertsAsset.splice(index, 1);
    };

    $scope.closeAlertSponsor = function(index) {
        $scope.alertsSponsor.splice(index, 1);
    };

    $scope.addSponsor = function () {
        $scope.alertsSponsor = [];

        if ($scope.sponsor.name != '' && $scope.sponsor.type != '' && $scope.sponsor.amount != '') {

            if (!isNaN($scope.sponsor.amount)) {
                $scope.sponsors.push({ name: $scope.sponsor.name, type: $scope.sponsor.type, amount: $scope.sponsor.amount });
                $scope.sponsor.name = $scope.sponsor.type = '';
                $scope.sponsor.amount = '0';
            } else {
                var alert = $translate.instant('ALERT1');
                // alert(alert);
                $scope.alertsSponsor.push({type: 'danger', msg: alert});
            }

        } else {
            var alert = $translate.instant('ALERT2');
            // alert(alert);
            $scope.alertsSponsor.push({type: 'danger', msg: alert});
        }
    };

    $scope.addAsset = function () {
        $scope.alertsAsset = [];

        if ($scope.asset.title != '' &&  $scope.asset.typeArrival != '' && $scope.asset.plainAddress != '' && $scope.asset.stringLocation != '' && $scope.asset.province != '') {

            if (!isNaN($scope.asset.constructionArea) && !isNaN($scope.asset.landArea)) {

                var ltarray = $scope.asset.stringLocation.split(',');
                if(ltarray.length == 2){
                    var latitude = ltarray[1];
                    var longitude = ltarray[0];

                    if (!isNaN(latitude) && !isNaN(longitude)) {
                        $scope.assets.push({ title: $scope.asset.title, province: $scope.asset.province,
                            typeArrival: $scope.asset.typeArrival, constructionArea: $scope.asset.constructionArea, landArea: $scope.asset.landArea,
                            plainAddress: $scope.asset.plainAddress, latitude: latitude, longitude: longitude
                        });
                        $scope.asset.typeArrival = $scope.asset.plainAddress = $scope.asset.stringLocation = '';
                        $scope.asset.landArea = $scope.asset.constructionArea = '0';
    
                    } else {
                        var alert = $translate.instant('ALERT9');
                        // alert(alert);
                        $scope.alertsAsset.push({type: 'danger', msg: alert});
                    }    
                } else {
                    var alert = $translate.instant('ALERT9');
                    // alert(alert);
                    $scope.alertsAsset.push({type: 'danger', msg: alert});
                }

            } else {
                var alert = $translate.instant('ALERT3');
                // alert(alert);
                $scope.alertsAsset.push({type: 'danger', msg: alert});
            }

        } else {
            var alert = $translate.instant('ALERT4');
            // alert(alert);
            $scope.alertsAsset.push({type: 'danger', msg: alert});
        }
    };

    $scope.addFile = function () {
        var file = $('#inputFile')[0].files[0];
        if (file) {
            var name = file.name;
            var avFile = new AV.File(name, file);
            var ProjectMedia = AV.Object.extend('ProjectMedia');
            var media = new ProjectMedia();
            media.set('image', avFile);
            media.set('project', $scope.project);
            $scope.files.push(media);
        } else {
            var alert = $translate.instant('ALERT5');
            // alert(alert);
            $scope.alerts.push({type: 'danger', msg: alert});
        }
    }

    $scope.addBorrower = function () {
        $scope.alertsBorrower = [];

        if ($scope.borrower.name != '' && $scope.borrower.principalDebit != '' && $scope.borrower.interestCreditor != '') {

            if (!isNaN($scope.borrower.principalDebit)) {
                $scope.borrowers.push({ name: $scope.borrower.name, principalDebit: $scope.borrower.principalDebit, 
                                        interestCreditor: $scope.borrower.interestCreditor});
                $scope.borrower.principalDebit = $scope.borrower.interestCreditor = '0'
                $scope.borrower.name = '';
            } else {
                var alert = $translate.instant('ALERT6');
                // alert(alert);
                $scope.alertsBorrower.push({type: 'danger', msg: alert});
            }

        } else {
            var alert = $translate.instant('ALERT7');
            // alert(alert);
            $scope.alertsBorrower.push({type: 'danger', msg: alert});
        }
    };
    
    $scope.deleteBorrower = function (index) {
        $scope.borrowers.splice(index, 1);
    }

    $scope.deleteFile = function (index) {
        $scope.files.splice(index, 1);
    }

    $scope.deleteAsset = function (index) {
        $scope.assets.splice(index, 1);
    }

    $scope.deleteSponsor = function (index) {
        $scope.sponsors.splice(index, 1);
    }

    $scope.releaseNewProject = function () {

        $scope.alerts = [];
        //valitations
        if (!isNaN($scope.package.debitAmount != '') && ($scope.package.title != '')  && ($scope.files.length > 0) ) {

            var currentUser = AV.User.current();
            if (currentUser) {

                $scope.loading = true;
                console.log('ok: ' + currentUser.getUsername());

                $scope.project.set('title', $scope.package.title);
                $scope.project.set('description', $scope.package.description);
                $scope.project.set('creator', AV.User.current());

                $scope.project.set('companyName', $scope.package.companyName);
                $scope.project.set('debitAmount', parseInt($scope.package.debitAmount));
                $scope.project.set('debitPricipalInterest', $scope.package.debitPricipalInterest);
                $scope.project.set('plainAddress', $scope.package.plainAddress);
                $scope.project.set('province', $scope.package.province);

                $scope.project.set('creditHighlights', $scope.package.creditHighlights);
                $scope.project.set('court', $scope.package.court);
                $scope.project.set('comefrom', $scope.package.companyName);
                $scope.project.set('quotation', $scope.package.quotation);

                var Manager = AV.Object.extend('ProjectManager');
                var manager = new Manager();
                manager.set('name', $scope.package.managerName);
                manager.set('phone', $scope.package.managerPhone);

                $scope.project.set('projectManager', manager);

                $scope.project.set('isRecommended', $scope.package.isRecommended);
                $scope.project.set('isHot', $scope.package.isHot);
                $scope.project.set('isHouse', $scope.package.isHouse);
                $scope.project.set('isFactory', $scope.package.isFactory);
                $scope.project.set('isDebt', $scope.package.isDebt);
                $scope.project.set('isShop', $scope.package.isShop);

                var Asset = AV.Object.extend('Asset');
                var assetsArray = [];
                $scope.assets.forEach(function (obj) {

                    $scope.package.typeArrivalString += ('+' + obj.typeArrival);
                    $scope.package.provinceString += ('-' + obj.province);

                    var asset = new Asset();
                    asset.set('title', obj.title);
                    asset.set('typeArrival', obj.typeArrival);
                    asset.set('constructionArea', obj.constructionArea);
                    asset.set('landArea', obj.landArea);
                    asset.set('plainAddress', obj.plainAddress);
                    asset.set('province', obj.province);

                    var location = new AV.GeoPoint(parseFloat(obj.latitude), parseFloat(obj.longitude));
                    asset.set('location', location);
                    asset.set('project', $scope.project);

                    assetsArray.push(asset);
                });

                var Sponsor = AV.Object.extend('Sponsorship');
                var sponsorsArray = [];
                $scope.sponsors.forEach(function (obj) {
                    var sponsor = new Sponsor();
                    sponsor.set('name', obj.name);
                    sponsor.set('type', obj.type);
                    sponsor.set('amount', obj.amount);
                    sponsor.set('project', $scope.project);

                    sponsorsArray.push(sponsor);
                });

                var Borrower = AV.Object.extend('Borrower');
                var borrowerArray = [];
                $scope.borrowers.forEach(function (obj) {
                    var borrower = new Borrower();
                    borrower.set('name', obj.name);
                    borrower.set('principalDebit', obj.principalDebit);
                    borrower.set('interestCreditor', obj.interestCreditor);
                    // borrower.set('totalInterest',obj.totalInterest);
                    borrower.set('project', $scope.project);

                    borrowerArray.push(borrower);
                });

                //for filter
                $scope.project.set('typeArrivalString', $scope.package.typeArrivalString);
                $scope.project.set('provinceString', $scope.package.provinceString);

                if($scope.files.length > 0){
                    $scope.project.set('image', $scope.files[0].get('image'));
                }

                $scope.project.save().then(function (project) {

                    $scope.recursiveSponsorSave(sponsorsArray, 0);
                    $scope.recursiveAssetSave(assetsArray, 0);
                    $scope.recursiveMediaSave($scope.files, 0);
                    $scope.recursiveBorrowerSave(borrowerArray, 0);

                    console.log('project inserted ok');
                    $scope.loading = false;
                    
                    $window.location.href = '#/project-list';
                }, function (error) {
                    $scope.loading = false;
                    alert(JSON.stringify(error));
                });

            } else {
                $window.location.href = '#/login';
            }
        } else {
            console.log();
            var alert = $translate.instant('ALERT8');
            // alert(alert);
            $scope.alerts.push({type: 'danger', msg: alert});
        }
    };

    $scope.recursiveSponsorSave = function (arrayObj, index) {
        console.log('recursiveSponsorSave:' + arrayObj.length + ' ' + index);
        if (index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveSponsorSave(arrayObj, index + 1);
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    }

    $scope.recursiveAssetSave = function (arrayObj, index) {
        console.log('recursiveAssetSave:' + arrayObj.length + ' ' + index);
        if (index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveAssetSave(arrayObj, index + 1);
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    }

    $scope.recursiveMediaSave = function (arrayObj, index) {
        console.log('recursiveMediaSave:' + arrayObj.length + ' ' + index);
        if (index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveMediaSave(arrayObj, index + 1);
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    }

    $scope.recursiveBorrowerSave = function (arrayObj, index) {
        console.log('recursiveMediaSave:' + arrayObj.length + ' ' + index);
        if (index < arrayObj.length) {
            arrayObj[index].save().then(function (obj) {
                $scope.recursiveBorrowerSave(arrayObj, index + 1);
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    }
}