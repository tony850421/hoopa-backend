app.controller('ViewProjectCtrl', ['$scope', '$state', '$rootScope', '$window', '$translate', 'localStorageService', ViewProjectCtrl])

function ViewProjectCtrl ($scope, $state, $rootScope, $window, $translate, localStorageService) {
  $scope.getUser = function () {
    var currentUser = AV.User.current()
    if (!currentUser) {
      $state.go('login')
    }
  }

  $scope.getUser()
  
  $scope.typeArrivalArray = ['住宅', '商铺', '写字楼', '厂房', '在建工程', '机械设备，存货，原材料', '土地（无厂房',
    '林权', '海城使用权', '商住', '无抵押', '其他'
  ]

  $scope.typeSponsorArray = ['个人', '企业']

  $scope.provinces = ['安徽省', '北京市', '重庆市', '福建省', '广东省', '甘肃省', '广西壮族自治区', '贵州省', '河南省', '湖北省', '河北省',
    '海南省', '香港特别行政区', '黑龙江省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省', '澳门特别行政区', '內蒙古自治区',
    '宁夏回族自治区', '青海省', '四川省', '山东省', '上海市', '陕西省', '山西省', '天津市', '台湾省', '新疆维吾尔自治区',
    '西藏自治区', '云南省', '浙江省'
  ]

  $scope.project = {}
  $scope.sponsorsList = []
  $scope.assetsList = []
  $scope.borrowerList = []
  $scope.imageList = []
  $scope.imageOpenModal = 0
  $scope.countVisit = 0
  $scope.countOffers = 0
  $scope.countShopCar = 0
  $rootScope.activeList = 'projects'

  $scope.showBorrowerAdd = false
  $scope.showAssetsAdd = false
  $scope.showSponsorsAdd = false

  $scope.projectTagsEdited = false

  $scope.projectTitle = ''
  $scope.projectTitleEdited = false

  $scope.projectCompany = ''
  $scope.projectCompanyEdited = false

  $scope.projectDescription = ''
  $scope.projectDescriptionEdited = false

  $scope.projectDebitAmount = ''
  $scope.projectDebitAmountEdited = false

  $scope.projectPrincipal = ''
  $scope.projectPrincipalEdited = false

  $scope.projectComeFrom = ''
  $scope.projectComeFromEdited = false

  $scope.projectProvince = ''
  $scope.projectProvinceEdited = false

  $scope.projectAddress = ''
  $scope.projectAddressEdited = false

  $scope.projectCredits = ''
  $scope.projectCreditsEdited = false

  $scope.projectManagerId = ''
  $scope.projectManagerName = ''
  $scope.projectManagerNameEdited = false

  $scope.projectManagerPhone = ''
  $scope.projectManagerPhoneEdited = false

  $scope.projectHot = false
  $scope.projectHouse = false
  $scope.projectRecommended = false
  $scope.projectFactory = false
  $scope.projectDebt = false
  $scope.projectShop = false
  $scope.showManagerPhone = true

  $scope.projectFinished = ''
  $scope.projectFinishedDescription = ''

  $scope.init = function () {
    var id = localStorageService.cookie.get('projectId')

    var query = new AV.Query('Project')
    query.include('projectManager')
    query.get(id).then(function (p) {
      $scope.project = p

      $scope.projectTitle = p.get('title')
      $scope.projectCompany = p.get('companyName')
      $scope.projectDescription = p.get('description')
      $scope.projectDebitAmount = p.get('debitAmount')
      $scope.projectPrincipal = parseInt(p.get('debitPricipalInterest'))
      $scope.projectComeFrom = p.get('comefrom')
      $scope.projectProvince = p.get('province')
      $scope.projectAddress = p.get('plainAddress')
      $scope.projectCredits = p.get('creditHighlights')
      $scope.projectManagerId = p.get('projectManager').id
      $scope.projectManagerName = p.get('projectManager').get('name')
      if ($scope.projectManagerName == '') {
        $scope.projectManagerName = '输入项目经理的名称'
      }
      $scope.projectManagerPhone = p.get('projectManager').get('phone')
      if ($scope.projectManagerPhone == '') {
        $scope.projectManagerPhone = '输入项目经理编号'
      }

      $scope.projectHot = p.get('isHot')
      $scope.projectHouse = p.get('isHouse')
      $scope.projectRecommended = p.get('isRecommended')
      $scope.projectFactory = p.get('isFactory')
      $scope.projectDebt = p.get('isDebt')
      $scope.projectShop = p.get('isShop')

      $scope.projectFinished = p.get('finished')
      $scope.projectFinishedDescription = p.get('finishedDescription')

      var query1 = new AV.Query('Sponsorship')
      query1.equalTo('project', p)
      query1.find().then(function (sponsors) {
        $scope.sponsorsList = sponsors
        $scope.$apply()
      })

      var query2 = new AV.Query('Asset')
      query2.equalTo('project', p)
      query2.find().then(function (assets) {
        $scope.assetsList = assets
        $scope.$apply()
      })

      var query3 = new AV.Query('Borrower')
      query3.equalTo('project', p)
      query3.find().then(function (borrowers) {
        for (var i = 0; i < borrowers.length; i++) {
          borrowers[i].set('totalInterest', parseFloat(borrowers[i].get('principalDebit')) + parseFloat(borrowers[i].get('interestCreditor')))
        }
        $scope.borrowerList = borrowers
        $scope.$apply()
      })

      var query4 = new AV.Query('ProjectMedia')
      query4.equalTo('project', p)
      query4.find().then(function (images) {
        for (var i = 0; i < images.length; i++) {
          images[i].set('imageUrl', images[i].get('image').thumbnailURL(200, 150))
          images[i].set('url', images[i].get('image').thumbnailURL(1280, 720))
        }

        $scope.imageList = images
        $scope.$apply()
      })

      var query5 = new AV.Query('ProjectVisit')
      query5.equalTo('project', p)
      query5.count().then(function (count) {
        $scope.countVisit = count
        $scope.$apply()
      })

      var query6 = new AV.Query('ShopCar')
      query6.equalTo('project', p)
      query6.count().then(function (count) {
        $scope.countShopCar = count
        $scope.$apply()
      })

      var query7 = new AV.Query('Offert')
      query7.equalTo('project', p)
      query7.count().then(function (count) {
        $scope.countOffers = count
        $scope.$apply()
      })
    })
  }

  $scope.init()

  $scope.OpenImage = function (num) {
    $scope.imageOpenModal = num
    $('#openImage').modal('show')
  }

  $scope.closeImage = function (num) {
    $('#openImage').modal('hide')
  }

  $scope.prevImageModal = function () {
    $scope.imageOpenModal--
    $scope.$apply()
  }

  $scope.nextImageModal = function () {
    $scope.imageOpenModal++
    $scope.$apply()
  }

  $scope.editProjectTitle = function () {
    if ($scope.projectTitleEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('title', $scope.projectTitle)
      project.save()
    }
    $scope.projectTitleEdited = !$scope.projectTitleEdited
  }

  $scope.editProjectCompany = function () {
    if ($scope.projectCompanyEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('companyName', $scope.projectCompany)
      project.save()
    }
    $scope.projectCompanyEdited = !$scope.projectCompanyEdited
  }

  $scope.editProjectDescription = function () {
    if ($scope.projectDescriptionEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('description', $scope.projectDescription)
      project.save()
    }
    $scope.projectDescriptionEdited = !$scope.projectDescriptionEdited
  }

  $scope.editProjectDebitAmount = function () {
    if ($scope.projectDebitAmountEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('debitAmount', parseFloat($scope.projectDebitAmount))
      project.save()
    }
    $scope.projectDebitAmountEdited = !$scope.projectDebitAmountEdited
  }

  $scope.editProjectPrincipal = function () {
    if ($scope.projectPrincipalEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('debitPricipalInterest', $scope.projectPrincipal)
      project.save()
    }
    $scope.projectPrincipalEdited = !$scope.projectPrincipalEdited
  }

  $scope.editProjectComeFrom = function () {
    if ($scope.projectComeFromEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('comefrom', $scope.projectComeFrom)
      project.save()
    }
    $scope.projectComeFromEdited = !$scope.projectComeFromEdited
  }

  $scope.editProjectProvince = function () {
    if ($scope.projectProvinceEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('province', $scope.projectProvince)
      project.save()
    }
    $scope.projectProvinceEdited = !$scope.projectProvinceEdited
  }

  $scope.editProjectAddress = function () {
    if ($scope.projectAddressEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('plainAddress', $scope.projectAddress)
      project.save()
    }
    $scope.projectAddressEdited = !$scope.projectAddressEdited
  }

  $scope.editProjectCredits = function () {
    if ($scope.projectCreditsEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('creditHighlights', $scope.projectCredits)
      project.save()
    }
    $scope.projectCreditsEdited = !$scope.projectCreditsEdited
  }

  $scope.editProjectManagerName = function () {
    if ($scope.projectManagerNameEdited) {
      var projectManager = AV.Object.createWithoutData('ProjectManager', $scope.projectManagerId)
      projectManager.set('name', $scope.projectManagerName)
      projectManager.save()
    }
    $scope.projectManagerNameEdited = !$scope.projectManagerNameEdited
  }

  $scope.editProjectManagePhone = function () {
    if ($scope.projectManagerPhoneEdited) {
      var projectManager = AV.Object.createWithoutData('ProjectManager', $scope.projectManagerId)
      projectManager.set('phone', $scope.projectManagerPhone)
      projectManager.save()
    }
    $scope.projectManagerPhoneEdited = !$scope.projectManagerPhoneEdited
  }

  $scope.editProjectTags = function () {
    if ($scope.projectTagsEdited) {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('isHot', $scope.projectHot)
      project.set('isHouse', $scope.projectHouse)
      project.set('isDebt', $scope.projectDebt)
      project.set('isFactory', $scope.projectFactory)
      project.set('isRecommended', $scope.projectRecommended)
      project.set('isShop', $scope.projectShop)
      project.save()
    }
    $scope.projectTagsEdited = !$scope.projectTagsEdited
  }

  $scope.ButtonShowFunction = function () {
    $('.buttonEdit').hide()
  }

  $scope.ButtonShowFunction()

  $(document).on('mouseenter', '.buttonEditHiddenTitle', function () {
    $('#buttonEditTitle').show()
  }).on('mouseleave', '.buttonEditHiddenTitle', function () {
    $('#buttonEditTitle').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenCompany', function () {
    $('#buttonEditCompany').show()
  }).on('mouseleave', '.buttonEditHiddenCompany', function () {
    $('#buttonEditCompany').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenDescription', function () {
    $('#buttonEditDescription').show()
  }).on('mouseleave', '.buttonEditHiddenDescription', function () {
    $('#buttonEditDescription').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenDebitAmount', function () {
    $('#buttonEditDebitAmount').show()
  }).on('mouseleave', '.buttonEditHiddenDebitAmount', function () {
    $('#buttonEditDebitAmount').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenPrincipal', function () {
    $('#buttonEditPrincipal').show()
  }).on('mouseleave', '.buttonEditHiddenPrincipal', function () {
    $('#buttonEditPrincipal').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenComeFrom', function () {
    $('#buttonEditComeFrom').show()
  }).on('mouseleave', '.buttonEditHiddenComeFrom', function () {
    $('#buttonEditComeFrom').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenProvince', function () {
    $('#buttonEditProvince').show()
  }).on('mouseleave', '.buttonEditHiddenProvince', function () {
    $('#buttonEditProvince').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenAddress', function () {
    $('#buttonEditAddress').show()
  }).on('mouseleave', '.buttonEditHiddenAddress', function () {
    $('#buttonEditAddress').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenCredits', function () {
    $('#buttonEditCredits').show()
  }).on('mouseleave', '.buttonEditHiddenCredits', function () {
    $('#buttonEditCredits').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenManagerName', function () {
    $('#buttonEditManagerName').show()
  }).on('mouseleave', '.buttonEditHiddenManagerName', function () {
    $('#buttonEditManagerName').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenManagerPhone', function () {
    $('#buttonEditManagerPhone').show()
  }).on('mouseleave', '.buttonEditHiddenManagerPhone', function () {
    $('#buttonEditManagerPhone').hide()
  })

  $(document).on('mouseenter', '.buttonEditHiddenTags', function () {
    $('#buttonEditTags').show()
  }).on('mouseleave', '.buttonEditHiddenTags', function () {
    $('#buttonEditTags').hide()
  })

  $scope.deleteImage = function (index) {
    var imgQuery = AV.Object.createWithoutData('ProjectMedia', $scope.imageList[index].id)
    imgQuery.destroy().then(function (images) {
      $scope.init()
    }).catch(function (error) {
      alert(JSON.stringify(error))
    })
  }

  $scope.mouseEnter = function (i) {
    $('#img' + i).show()
  }

  $scope.mouseLeave = function (i) {
    $('#img' + i).hide()
  }

  $scope.deleteBorrower = function (index) {
    var query = AV.Object.createWithoutData('Borrower', $scope.borrowerList[index].id)
    query.destroy().then(function (b) {
      $scope.init()
    }).catch(function (error) {
      alert(JSON.stringify(error))
    })
  }

  $scope.deleteAsset = function (index) {
    var query = AV.Object.createWithoutData('Asset', $scope.assetsList[index].id)
    query.destroy().then(function (a) {
      $scope.init()
    }).catch(function (error) {
      alert(JSON.stringify(error))
    })
  }

  $scope.deleteSponsor = function (index) {
    var query = AV.Object.createWithoutData('Sponsorship', $scope.sponsorsList[index].id)
    query.destroy().then(function (b) {
      $scope.init()
    }).catch(function (error) {
      alert(JSON.stringify(error))
    })
  }

  $scope.addImage = function () {
    var file = $('#inputImage')[0].files[0]
    if (file) {
      var name = file.name
      var avFile = new AV.File(name, file)
      var ProjectMedia = AV.Object.extend('ProjectMedia')
      var media = new ProjectMedia()
      media.set('image', avFile)
      media.set('project', $scope.project)
      media.save().then(function (i) {
        $('#inputImage').val(null)
        $scope.init()
      })
    } else {
    }
  }

  $scope.showAddBorrower = function () {
    $scope.showBorrowerAdd = !$scope.showBorrowerAdd
  }

  $scope.showAddAsset = function () {
    $scope.showAssetsAdd = !$scope.showAssetsAdd
  }

  $scope.showAddSponsors = function () {
    $scope.showSponsorsAdd = !$scope.showSponsorsAdd
  }

  $scope.newBorrowerName = ''
  $scope.newBorrowerPrincipalDebit = ''
  $scope.newBorrowerInterestCreditor = ''
  $scope.isNaN = false
  $scope.isName = false
  $scope.isInterest = false

  $scope.addBorrower = function () {
    if ($scope.newBorrowerName != '' && $scope.newBorrowerPrincipalDebit != '' && $scope.newBorrowerInterestCreditor != '') {
      if (!isNaN($scope.newBorrowerPrincipalDebit)) {
        var BorrowerObject = AV.Object.extend('Borrower')
        var borrower = new BorrowerObject()
        borrower.set('project', $scope.project)
        borrower.set('name', $scope.newBorrowerName)
        borrower.set('principalDebit', $scope.newBorrowerPrincipalDebit)
        borrower.set('interestCreditor', $scope.newBorrowerInterestCreditor)
        borrower.save().then(function (i) {
          $scope.newBorrowerName = ''
          $scope.newBorrowerPrincipalDebit = ''
          $scope.newBorrowerInterestCreditor = ''
          $scope.isNaN = false
          $scope.isName = false
          $scope.isInterest = false
          $scope.init()
        })
      } else {
        $scope.isNaN = true
        $scope.$apply()
      }
    } else {
      if ($scope.newBorrowerName == '') {
        $scope.isName = true
      } else {
        $scope.isName = false
      }

      if ($scope.newBorrowerPrincipalDebit == '') {
        $scope.isNaN = true
      } else {
        $scope.isNaN = false
      }

      if ($scope.newBorrowerInterestCreditor == '') {
        $scope.isInterest = true
      } else {
        $scope.isInterest = false
      }

      $scope.$apply()
    }
  }

  $scope.assetTitle = ''
  $scope.assetTypeArrival = ''
  $scope.assetConstructionArea = ''
  $scope.assetLandArea = ''
  $scope.assetPlainAddress = ''
  $scope.assetProvince = ''
  $scope.newBorrowerName = ''
  $scope.assetStringLocation = ''
  $scope.isConstruction = false
  $scope.isLand = false
  $scope.isLL = false
  $scope.isProvince = false
  $scope.isAddress = false
  $scope.isTypeA = false
  $scope.isTitle = false

  $scope.addAsset = function () {
    if ($scope.assetTitle != '' && $scope.assetTypeArrival != '' && $scope.assetPlainAddress != '' &&
      $scope.assetStringLocation != '' && $scope.assetProvince != '') {
      if (!isNaN($scope.assetConstructionArea)) {
        if (!isNaN($scope.assetLandArea)) {
          var ltarray = $scope.assetStringLocation.split(',')
          if (ltarray.length == 2) {
            var latitude = ltarray[1]
            var longitude = ltarray[0]

            if (!isNaN(latitude) && !isNaN(longitude)) {
              var AssetsObject = AV.Object.extend('Asset')
              var asset = new AssetsObject()
              asset.set('project', $scope.project)
              asset.set('title', $scope.assetTitle)
              asset.set('typeArrival', $scope.assetTypeArrival)
              asset.set('constructionArea', $scope.assetConstructionArea)
              asset.set('landArea', $scope.assetLandArea)
              asset.set('plainAddress', $scope.assetPlainAddress)
              asset.set('province', $scope.assetProvince)
              var location = new AV.GeoPoint(parseFloat(latitude), parseFloat(longitude))
              asset.set('location', location)
              asset.save().then(function (i) {
                $scope.assetTitle = ''
                $scope.assetTypeArrival = ''
                $scope.assetConstructionArea = ''
                $scope.assetLandArea = ''
                $scope.assetPlainAddress = ''
                $scope.assetProvince = ''
                $scope.newBorrowerName = ''
                $scope.assetStringLocation = ''
                $scope.isConstruction = false
                $scope.isLand = false
                $scope.isLL = false
                $scope.isProvince = false
                $scope.isAddress = false
                $scope.isTypeA = false
                $scope.isTitle = false
                $scope.init()
              })
            } else {
              $scope.isConstruction = false
              $scope.isLL = true
              $scope.isLand = false
              $scope.$apply()
            }
          } else {
            $scope.isConstruction = false
            $scope.isLand = false
            $scope.isLL = true
            $scope.$apply()
          }
        } else {
          $scope.isConstruction = false
          $scope.isLL = false
          $scope.isLand = true
          $scope.$apply()
        }
      } else {
        $scope.isConstruction = true
        $scope.isLL = false
        $scope.isLand = false
        $scope.$apply()
      }
    } else {
      if ($scope.assetTitle == '') {
        $scope.isTitle = true
      } else {
        $scope.isTitle = false
      }

      if ($scope.assetTypeArrival == '') {
        $scope.isTypeA = true
      } else {
        $scope.isTypeA = false
      }

      if ($scope.assetPlainAddress == '') {
        $scope.isAddress = true
      } else {
        $scope.isAddress = false
      }

      if ($scope.assetProvince == '') {
        $scope.isProvince = true
      } else {
        $scope.isProvince = false
      }

      if ($scope.assetStringLocation == '') {
        $scope.isLL = true
      } else {
        $scope.isLL = false
      }

      if ($scope.assetConstructionArea == '') {
        $scope.isConstruction = true
      } else {
        $scope.isConstruction = false
      }

      if ($scope.assetLandArea == '') {
        $scope.isLand = true
      } else {
        $scope.isLand = false
      }

      $scope.$apply()
    }
  }

  $scope.sponsorName = ''
  $scope.sponsorType = ''
  $scope.sponsorAmount = ''
  $scope.isSponsorName = false
  $scope.isSponsorType = false
  $scope.isSponsorAmount = false

  $scope.addSponsor = function () {
    if ($scope.sponsorName != '' && $scope.sponsorType != '' && $scope.sponsorAmount != '') {
      if (!isNaN($scope.sponsorAmount)) {
        var SponsorObject = AV.Object.extend('Sponsorship')
        var sponsor = new SponsorObject()
        sponsor.set('name', $scope.sponsorName)
        sponsor.set('type', $scope.sponsorType)
        sponsor.set('amount', $scope.sponsorAmount)
        sponsor.set('project', $scope.project)
        sponsor.save().then(function (s) {
          $scope.sponsorName = ''
          $scope.sponsorType = ''
          $scope.sponsorAmount = ''
          $scope.isSponsorName = false
          $scope.isSponsorType = false
          $scope.isSponsorAmount = false
          $scope.init()
        })
      } else {
        $scope.isSponsorAmount = true
        $scope.isSponsorName = false
        $scope.isSponsorType = false
        $scope.$apply()
      }
    } else {
      if ($scope.sponsorName == '') {
        $scope.isSponsorName = true
      } else {
        $scope.isSponsorName = false
      }

      if ($scope.sponsorType == '') {
        $scope.isSponsorType = true
      } else {
        $scope.isSponsorType = false
      }

      if ($scope.sponsorAmount == '') {
        $scope.isSponsorAmount = true
      } else {
        $scope.isSponsorAmount = false
      }

      $scope.$apply()
    }
  }

  $scope.showManagerPhoneFunction = function () {
    var id = localStorageService.cookie.get('projectId')
    var project = AV.Object.createWithoutData('Project', id)
    project.set('showManagerPhone', $scope.showManagerPhone)
    project.save()
  }

  $scope.changeStateProject = function () {
    if ($scope.projectFinishedDescription != '') {
      var id = localStorageService.cookie.get('projectId')
      var project = AV.Object.createWithoutData('Project', id)
      project.set('finished', '关闭')
      project.set('finishedDescription', $scope.projectFinishedDescription)
      project.save()
      $scope.projectFinished = '关闭'
      $(window).scrollTop(0)
    }
  }
}
