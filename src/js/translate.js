'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$translateProvider', function ($translateProvider) {
    // Adding a translation table for the English language
    $translateProvider.translations('en_US', {
        "TITLE": "Title",
        "HEADER": "Header",
        "SUBHEADER": "Subheader",
        "NAV": "NAVIGATION",
        "NEWPRODUCT": "Publish a new product",
        "BASICINFO": "Basic information",
        "PTITLE": "Title",
        "PDESC": "Description",
        "PFILE": "Upload image",
        "PPUBLISH": "Publish",
        "CNAME": "Company name",
        "DAMOUNT": "Debt amount",
        "DPRINCIPALI": "Principal and interest of the debt",
        "ADDRESS": "Address",
        "CHIGHL": "Credit Highlights",
        "COURT": "Court of acceptance",
        "CFROM": "Come from",
        "QUOT": "Whether there is a quotation",
        "MANAGERINFO": "Manager information",
        "MANAGERNAME": "Manager name",
        "MANAGERPHONE": "Manager phone number",
        "BORROINFO": "Borrower information",
        "BORROPDEB": "Principal of debt",
        "BORROINTER": "Interest on creditor's rights",
        "BORROTOT": "Total principal and interest",
        "PHOTOS": "Photos",
        "ASSETS": "Assets",
        "SPONSORS": "Sponsors",
        "TARRIVAL": "Type of arrival",
        "CAREA": "Construction area",
        "LAREA": "Land area",
        "LAT": "Latitude",
        "LONG": "Longitude",
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
        "RECOM": "Recommended project",
    });
    // Adding a translation table for the Chinise language
    $translateProvider.translations('ch_CH', {
        "TITLE": "Title",
        "HEADER": "Header",
        "SUBHEADER": "Subheader",
        "NAV": "导航",
        "NEWPRODUCT": "发布一个新商品",
        "BASICINFO": "基本信息",
        "PTITLE": "商品名称",
        "PDESC": "商品描述",
        "PFILE": "上传图片",
        "PPUBLISH": "发布",
        "CNAME": "公司名称",
        "DAMOUNT": "债务金额",
        "DPRINCIPALI": "债务的本金和利息",
        "ADDRESS": "地址",
        "CHIGHL": "信用亮点",
        "COURT": "受理法院",
        "CFROM": "来自",
        "QUOT": "是否有报价单",
        "MANAGERINFO": "经理信息",
        "MANAGERNAME": "管理器名称",
        "MANAGERPHONE": "经理电话号码",
        "BORROINFO": "借款人信息",
        "BORROPDEB": "债务本金",
        "BORROINTER": "债权权益",
        "BORROTOT": "本金和利息共计",
        "PHOTOS": "照片",
        "ASSETS": "资产",
        "SPONSORS": "赞助商",
        "TARRIVAL": "到达类型",
        "CAREA": "建筑面积",
        "LAREA": "土地面积",
        "LAT": "纬度",
        "LONG": "经度",
        "GUARA": "担保人",
        "STYPE": "类型",
        "GAMOUNT": "保证金额",
        "BPUBLISH": " 发布",
        "BADD": " 添加",
        "BDELETE": " 删除",
        "LOGIN": "登录",
        "SIGNUP": "登记",
        "USERNAME": "用户",
        "PASSWORD": "密码",
        "EMAIL": "电子邮件",
        "LOGOUT": "注销",
        "PACKAGES": "项目",
        "MESSAGES": "消息",
        "NEWPACKAGE": "发布新包",
        "PROVINCE": "省",
        "RECOM": "推荐项目",
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en_US ');
    // Tell the module to store the language in the cookies
    // $translateProvider.useCookieStorage();
    // // Tell the module to use a key 'lang' in the storage instead of default key
    // $translateProvider.storageKey('lang');
}]);
