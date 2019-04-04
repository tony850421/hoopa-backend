'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$translateProvider', function ($translateProvider) {
    // Adding a translation table for the English language
    $translateProvider.translations('en_US', {
        "TITLE": "Title",
        "PUTITLE": "Title: ",
        "HEADER": "Header",
        "SUBHEADER": "Subheader",
        "NAV": "NAVIGATION",
        "NEWPRODUCT": "Publish a new product",
        "BASICINFO": "Basic information",
        "PTITLE": "Title",
        "PDESC": "Description",
        "PUDESC": "Description: ",
        "PFILE": "Upload image",
        "PPUBLISH": "Publish",
        "CNAME": "Company name",
        "DAMOUNT": "Debt amount",
        "DUAMOUNT": "Debt amount: ",
        "DPRINCIPALI": "Principal and interest of the debt",
        "DUPRINCIPALI": "Principal and interest of the debt: ",
        "ADDRESS": "Address",
        "PUADDRESS": "Address: ",
        "CHIGHL": "Credit Highlights",
        "PUCHIGHL": "Credit Highlights: ",
        "COURT": "Court of acceptance",
        "CFROM": "Come from",
        "CUFROM": "Come from: ",
        "QUOT": "Whether there is a quotation",
        "MANAGERINFO": "Manager information",
        "MANAGERNAME": "Manager name",
        "MANAGERPHONE": "Manager phone number",
        "PUMANAGERNAME": "Manager name: ",
        "PUMANAGERPHONE": "Manager phone number: ",
        "BORROINFO": "Borrower information",
        "BORRONAME": "Name",
        "BORROPDEB": "Principal of debt",
        "BORROINTER": "Interest on creditor's rights",
        "BORROTOT": "Total principal and interest",
        "PHOTOS": "Photos",
        "ASSETS": "Assets",
        "ATITLE": "Assets Name",
        "SPONSORS": "Sponsors",
        "TARRIVAL": "Type of arrival",
        "CAREA": "Construction area",
        "LAREA": "Land area",
        "LAT": "Latitude",
        "LONG": "Longitude",
        "LONGLAT": "Longitude and Latitude(Ex: 120.895509,35.044819 )",
        "GUARA": "Guarantor",
        "STYPE": "Type",
        "GAMOUNT": "Guarantee amount",
        "BPUBLISH": " Publish",
        "BADD": " Add",
        "BDELETE": " Delete",
        "LOGIN": "Login",
        "SIGNUP": "Sign Up",
        "USERNAME": "User Name",
        "PASSWORD": "Password",
        "EMAIL": "Email",
        "LOGOUT": "Logout",
        "PACKAGES": "Packages",
        "MESSAGES": "Messages",
        "NEWPACKAGE": "New package",
        "PROVINCE": "Province",
        "PUPROVINCE": "Province: ",
        "RECOM": "Recommended",
        "FILTERS": "Filters",
        "HOT": "Hot",
        "HOUSE": "House",
        "FACTORY": "Factory",
        "ISDEBT": "Debt",
        "SHOP": "Shop",
        "ALERT1": "Amount must be a number",
        "ALERT2": "Please, complete the sponsor information",
        "ALERT3": "Please, check the input values",
        "ALERT4": "Please, complete the asset information",
        "ALERT5": "Please, select an image file",
        "ALERT6": "Debt must be a number",
        "ALERT7": "Please, complete the borrower information",
        "ALERT8": "Please, check the input values, upload one image at least",
        "ALERT9": "Error on latitude and longitude",
        "DASH": "Dashboard",
        "OFFERS": "Offers",
        "BUPDATE": " Update",
        "BSHOW": " Show",
        "NEWS": 'News',
        "NEWNEWS": 'Add News',
        "CAPTION": 'Image subtitle',
        "SEND": "Send",
        "UNNAMED": 'Unnamed',
        "PENDING": "Pending",
        "READY": "Ready",
        "USERS": "Users",
        "VISITS": "Visits",
        "VISITPROJECTS": "Visits to projects per days",
        "USERDISTRIBUTIONS": "Users Distributions per days",
        "FULLNAME": "Fullname",
        "COMPANY": "Company",
        "PUCOMPANY": "Company: ",
        "PHONE": "Phone",
        "PROJECTNAME": "Project Name",
        "DEBIT": "Debit Amount",
        "OFFERSAMOUNT": "Offer Amount",
        "TITLETPROJECT": "Projects With Offers",
        "OFFICIALSUSERS": "Official Users",
        "BORROWERS": "Borrowers",
        "LONGLATASSETS": "Longitude and Latitude",
        "GALLERY": "Gallery",
        "AMOUNT": "Amount",
        "AREYOUSURE": "Are you sure?",
        "ADDBORROWER": "Add borrower",
        "ADDASSET": "Add asset",
        "ADDSPONSOR": "Add sponsor",
        "FORUM": "Forum",
        "PREVIOUS": "Previous",
        "NEXT": "Next",
        "ALERTLOGIN0": "Login error",
        "ALERTLOGIN1": "Password mismatch",
        "ALERTLOGIN2": "Could not find user",
        "ALERTLOGIN3": "Only admins allowed",
        "NOOFFERS": "There are no offers",
        "NOCOMMENTS": "There are no comments in the forums",
        "NONEWS": "There are no news",
        "NOMESSAGES": "There are no message",
        "NOPROJECTS": "There are no projects",
        "MAKEADMIN": "Add",
        "REMOVEADMIN": "Remove",
        "USERS": "User",
        "ALERTREGISTER": "Successful registered user, please wait for admin approval",
        "ISINDUSTRY": "Industry News",
        "SHOWMANAGERPHONE": "Show Manager Phone",
        "ADVINFO": "Adv Information",
        "SHOWADV": "Show Advertisement",
        "SLIDER": "Choose Sliders",
        "BNAME": "Branch's Name",
        "BADDRESS": "Branch's Address",
        "BPHONE": "Branch's Phone",
        "ADDBRANCHE": " Add Branch",
        "CCHARGE": "Core Team Member Charge",
        "CTNAME": " Core Team Member Name",
        "CPICTURE": "Core Team Member Picture",
        "CDESCRIPTION": "Core Team Member Description",
        "ADDTEAMMEMBER": " Add Team Member",
        "CORETEAM": "Core Team",
        "BRANCHS": "Branchs",
        "HBNAME": "Name:",
        "HBADDRESS": "Address:",
        "HBPHONE": "Phone:",
        "HBLATITUDE": "Latitude:",
        "HBLONGITUDE": "Longitude:",
        "UPDATEMEMBER": "Update Member",
        "CANCEL": "Cancel",
        "ADDCORETEAMMEMBER": "Add member",
        "ADDHOOPABRANCH": "Add branch",
        "UPDATEBRANCHE": "Update branch",
        "CITYNAME": "City Name",
        "CITYPRICE": "Average Price",
        "CITYPICTURE": "City Picture",
        "CITYDESCRIPTION": "City Description",
        "ADDCITY": "Add City",
        "SAVECITY": "Save City",
        "CITIES": "Cities",
        "UPDATECITY": "Update City",
        "CITYINFORMATION": "Only The first eight cities are shown",
        "SHOWCITYTEXT": "Show this city in home page",
        "YES": "Yes",
        "NO": "No",
        "STATE": "State",
        "CLOSEPROJECTBUTTON": "Do you want close this project?",
        "PROJECTCLOSEDESCRIPTION": "Enter the cause by which you want to close that project",
        "CLOSEPROJECT": " Close project",
        "SUBJECT": "Project Management",
        "COMPANY": "Company",
        "GROUPINTRODUCE": "Group Introduce",
        "COMPANYINTRODUCE": "Company Introduce",
        "INTRODUCE": "Introduce",
        "STRUCTURE": "Structure",
        "BUSINESSSYSTEM": "Business System"
    });
    // Adding a translation table for the Chinise language
    $translateProvider.translations('ch_CH', {
        "TITLE": "标题",
        "PUTITLE": "标题: ",
        "HEADER": "头",
        "SUBHEADER": "子标头",
        "NAV": "导航",
        "NEWPRODUCT": "发布一个新商品",
        "BASICINFO": "基本信息",
        "PTITLE": "资产名声",
        "PDESC": "商品描述",
        "PUDESC": "商品描述: ",
        "PFILE": "上传图片",
        "PPUBLISH": "发布",
        "CNAME": "公司名称",
        "DAMOUNT": "债权本金",
        "DUAMOUNT": "债权本金: ",
        "DPRINCIPALI": "债权本息",
        "DUPRINCIPALI": "债权本息: ",
        "ADDRESS": "所在地址",
        "PUADDRESS": "所在地址: ",
        "CHIGHL": "资产亮点",
        "PUCHIGHL": "资产亮点: ",
        "COURT": "受理法院",
        "CFROM": "银行",
        "CUFROM": "银行: ",
        "QUOT": "是否有报价单",
        "MANAGERINFO": "项目经理",
        "BORRONAME": "借款人名字",
        "MANAGERNAME": "项目经理名字",
        "MANAGERPHONE": "项目经理电话号",
        "PUMANAGERNAME": "项目经理名字: ",
        "PUMANAGERPHONE": "项目经理电话号: ",
        "BORROINFO": "借款人信息",
        "BORROPDEB": "债权本金",
        "BORROINTER": "债权利息",
        "BORROTOT": "本息合计",
        "PHOTOS": "照片",
        "ASSETS": "抵押物",
        "ATITLE": "抵押物名称",
        "SPONSORS": "保证人",
        "TARRIVAL": "抵押物类型",
        "CAREA": "建筑面积",
        "LAREA": "土地面积",
        "LAT": "纬度",
        "LONGLAT": "经度和纬度 (120.895509,35.044819)",
        "LONG": "经度",
        "GUARA": "保证人名字",
        "STYPE": "保证人类型",
        "GAMOUNT": "担保金额",
        "BPUBLISH": " 发布",
        "BADD": " 添加",
        "BDELETE": " 删除",
        "LOGIN": "登录",
        "SIGNUP": "注册",
        "USERNAME": "用户",
        "PASSWORD": "密码",
        "EMAIL": "电子邮件",
        "LOGOUT": "注销",
        "PACKAGES": "资产",
        "MESSAGES": "消息",
        "NEWPACKAGE": "添加新资产",
        "PROVINCE": "省",
        "PUPROVINCE": "省: ",
        "RECOM": "推荐",
        "FILTERS": "筛选",
        "HOT": "热门资产",
        "HOUSE": "高性价比住宅",
        "FACTORY": "江浙沪地区优质厂房",
        "ISDEBT": "近期拟处置资产",
        "SHOP": "热推商铺土地全包资产",
        "ALERT1": "必填数字",
        "ALERT2": "请填完保证人信息",
        "ALERT3": "请注意检查输入信息",
        "ALERT4": "请填完抵押物信息",
        "ALERT5": "至少加一个图像",
        "ALERT6": "债权本金必填数字",
        "ALERT7": "请填写借款人信息",
        "ALERT8": "请检查输信息 至少上传一个图片",
        "ALERT9": "纬度和经度错误",
        "DASH": "仪表板",
        "OFFERS": "报价",
        "BUPDATE": " 更新",
        "BSHOW": " 显示",
        "NEWS": '新闻',
        "NEWNEWS": '添加新闻',
        "CAPTION": '图像副标题',
        "SEND": "发送",
        "UNNAMED": '无名',
        "PENDING": "等待",
        "READY": "准备",
        "USERS": "用户",
        "VISITS": "访问",
        "VISITPROJECTS": "每天访问项目",
        "USERDISTRIBUTIONS": "用户每天分配数",
        "FULLNAME": "全名",
        "COMPANY": "公司",
        "PUCOMPANY": "公司: ",
        "PHONE": "电话",
        "PROJECTNAME": "项目名称",
        "DEBIT": "借方金额",
        "OFFERSAMOUNT": "报价金额",
        "TITLETPROJECT": "具有优惠的项目",
        "OFFICIALSUSERS": "官方用户",
        "BORROWERS": "借款",
        "LONGLATASSETS": "经度和纬度",
        "GALLERY": "库",
        "AMOUNT": "量",
        "AREYOUSURE": "是否确定？",
        "ADDBORROWER": "添加借方",
        "ADDASSET": "添加资产",
        "ADDSPONSOR": "添加赞助商",
        "FORUM": "论坛",
        "PREVIOUS": "以前",
        "NEXT": "下",
        "ALERTLOGIN0": "登录错误",
        "ALERTLOGIN1": "密码不匹配",
        "ALERTLOGIN2": "找不到用户",
        "ALERTLOGIN3": "仅允许管理员",
        "NOOFFERS": "没有报价",
        "NOCOMMENTS": "论坛中没有评论",
        "NONEWS": "没有消息",
        "NOMESSAGES": "没有消息",
        "NOPROJECTS": "没有项目",
        "MAKEADMIN": "添加",
        "REMOVEADMIN": "删除",
        "USERS": "用户",
        "ALERTREGISTER": "成功注册用户, 请等待管理员批准",
        "ISINDUSTRY": "行业资讯",
        "SHOWMANAGERPHONE": "显示经理电话",
        "ADVINFO": "广告信息",
        "SHOWADV": "展会广告",
        "SLIDER": "选择滑块",
        "BNAME": "分公司名称",
        "BADDRESS": "分公司地址",
        "BPHONE": "分公司的电话",
        "ADDBRANCHE": " 添加分支",
        "CCHARGE": "核心团队成员收费",
        "CTNAME": "核心团队成员姓名",
        "CPICTURE": "核心团队成员图片",
        "CDESCRIPTION": "核心团队成员说明",
        "ADDTEAMMEMBER": " 添加核心团队成员",
        "CORETEAM": "核心团队",
        "BRANCHS": "添加霍帕分支",
        "HBNAME": "名字：",
        "HBADDRESS": "地址：",
        "HBPHONE": "电话：",
        "HBLATITUDE": "纬度：",
        "HBLONGITUDE": "经度：",
        "UPDATEMEMBER": "更新会员",
        "CANCEL": "取消",
        "ADDCORETEAMMEMBER": "添加会员",
        "ADDHOOPABRANCH": "添加分支",
        "UPDATEBRANCHE": "更新分支",
        "CITYNAME": "城市名称",
        "CITYPRICE": "平均价格",
        "CITYPICTURE": "城市图片",
        "CITYDESCRIPTION": "城市描述",
        "ADDCITY": "城市城市",        
        "SAVECITY": "保存城市",
        "CITIES": "城市",
        "UPDATECITY": "更新城市",
        "CITYINFORMATION": "仅显示前八个城市",
        "SHOWCITYTEXT": "在主页上显示此城市",
        "YES": "是的",
        "NO": "不",
        "STATE": "状态",
        "CLOSEPROJECTBUTTON": "是否要关闭此项目？",
        "PROJECTCLOSEDESCRIPTION": "输入要关闭该项目的原因",
        "CLOSEPROJECT": " 关闭项目",
        "SUBJECT": "项目管理",
        "COMPANY": "公司信息管理",
        "GROUPINTRODUCE": "集团信息管理",
        "COMPANYINTRODUCE": "公司介绍",
        "INTRODUCE": "介绍",
        "STRUCTURE": "结构",
        "BUSINESSSYSTEM": "业务系统"
    });
    $translateProvider.preferredLanguage('ch_CH');
}]);
