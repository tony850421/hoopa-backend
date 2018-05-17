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
        "BPUBLISH": "Publish",
        "BADD": "Add",
        "BDELETE": "DELETE",
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
        "BPUBLISH": "Publish",
        "BADD": "Add",
        "BDELETE": "DELETE",
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en_US ');
    // Tell the module to store the language in the cookies
    // $translateProvider.useCookieStorage();
    // // Tell the module to use a key 'lang' in the storage instead of default key
    // $translateProvider.storageKey('lang');
}]);
