/* eslint-disable no-param-reassign */
'use strict';

var server = require('server');

// var cache = require('*/cartridge/scripts/middleware/cache');
// var wallaCustomerAPI = require('*/cartridge/scripts/middleware/wallaCustomerAPI');
// var preferences = require('*/cartridge/config/preferences');

server.extend(module.superModule);

/*
server.append('IncludeHeaderMenu', function (req, res, next) {
    var Site = require('dw/system/Site');
    var viewData = res.getViewData();
    var isMenuMoreEnabled = Site.current.getCustomPreferenceValue('menuMoreEnabled');

    var categoriesMenuMore = isMenuMoreEnabled ?
        viewData.categories.filter(function (category) {
            return category.custom.showInMenuMore;
        }) :
        null;

    res.setViewData({
        categoriesMenuMore: categoriesMenuMore,
        isMenuMoreEnabled: isMenuMoreEnabled,
        isFavoriteDynamicContent: Site.current.getCustomPreferenceValue('favoriteDynamicContent'),
        isFavoriteCategoryFilter: Site.current.getCustomPreferenceValue('favoriteCategoryFilter'),
        isBrandsDynamicContent: Site.current.getCustomPreferenceValue('brandsDynamicContent'),
        isEnabledMobileMenuLinkDeal: preferences.isEnabledMobileMenuLinkDeal,
        isEnabledMobileMenuLinkDailyDeal: preferences.isEnabledMobileMenuLinkDailyDeal,
        isEnabledMobileMenuLinkWallaPlus: preferences.isEnabledMobileMenuLinkWallaPlus,
        isEnabledMobileMenuLinkDownloadApp: preferences.isEnabledMobileMenuLinkDownloadApp
    });
    next();
});

server.get('IncludeCustomerMenuMobile', wallaCustomerAPI.getWallaCustomerOrdersCount, function (req, res, next) {

    res.render('components/header/menuCustomerMobile', {
        isMembersClubEnabled: preferences.membersClubEnabled,
        orderTrackEnabled: preferences.showOrderTrack,
        showMessagesMenuItem: preferences.showMessagesMenuItem
    });

    next();
});

server.get('IncludeHeaderAddressSuggestion', function (req, res, next) {
    res.render('components/header/addressSuggestion');

    next();
});

server.append('Show', function (req, res, next) {
    if (req.querystring.cid) {
        switch (req.querystring.cid) {
            case 'error-page':
                res.setViewData({
                    isErrorPage: true
                });
                break;
            case 'error-page-not-found':
                res.setViewData({
                    isErrorPage: true
                });
                break;
            case 'CustomerServicePage':
                res.setViewData({
                    mobileFloatMenuItem: 'help'
                });
                break;
        }
    }

    next();
});

// Endpoint for additional caching of Content Slots
// Usage: <isinclude url="${URLUtils.url('Page-IncludeDynamic', 'sid', '<Content Slot ID / template from content/contentSlots')}" />
// TODO: Remove once perfomance issues are resolved (together with folder tempaltes/content/contentSlots), or uncomment if there is a need to use it
server.get(
    'IncludeDynamic',
    cache.applyPromotionSensitiveCache,
    function (req, res, next) {
        var sid = req.querystring.sid;

        if (sid) {
            res.render('content/contentSlots/' + sid);
        } else {
            res.render('default/common/empty');
        }
        next();
    }
);
*/

module.exports = server.exports();
