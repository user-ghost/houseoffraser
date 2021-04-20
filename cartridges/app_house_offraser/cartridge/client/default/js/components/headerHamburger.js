'use strict';

/**
 * Enable/Disable scroll on page
 *
 * @param {boolean} state - true or false
 */
function disableScroll(state) {
    var offset = 0;

    var $body = $('body');

    if (state) {
        offset = $(window).scrollTop();

        $body.css('top', `${-offset}px`).addClass('h-disable-scroll');
    } else {
        $body.removeClass('h-disable-scroll').css('top', 0);
        window.scrollTo(0, offset);
    }
}

const
    SELECTORS = {
        body: 'body',
        openMenuButton: '.js-open-menu',
        closeMenuButton: '.js-close-menu, .js-menu-overlay',
        menuWrapper: '.js-menu-wrapper',
        menuContainer: '.js-menu-container',
        openNextLevel: '.js-open-next-list',
        openPrevLevel: '.js-open-prev-list',
        categoriesMenuItem: '.js-categories-list',
        topLevelCategory: '.js-top-level-category'
    };

var
    enabledMobileMenu = false,
    openedMobileMenu = false

var
    $menuWrapper = $(SELECTORS.menuWrapper),
    $menuContainer = $(SELECTORS.menuContainer),
    $openNextLevel = $(SELECTORS.openNextLevel),
    $openPrevLevel = $(SELECTORS.openPrevLevel),
    $openMenuButton = $(SELECTORS.openMenuButton),
    $closeMenuButton = $(SELECTORS.closeMenuButton),
    $topLevelCategory = $(SELECTORS.topLevelCategory);

/**
 * Show next menu/submenu
 *
 * @param {Object} el - DOM element, usually the .js-open-prev-list element
 */
function pullRight(el) {
    if ($(el).parent().parent().parent('ul').length) {
        $(el).parent().parent().parent('ul').css('right', '-100%');
    }
}

/**
 * Show prev menu/submenu
 *
 * @param {Object} el - DOM element, usually the .js-open-next-list element
 */
function pullLeft(el) {
    if ($(el).next('ul').length) {
        event.preventDefault();

        $(el).next('ul').css('right', 0);
    }
}

/**
 * Hide mobile menu depends on window width
 */
function checkHeaderHamburger() {
    let windowWidth = $(window).innerWidth();

    if (openedMobileMenu && windowWidth > 1024) {
        $menuWrapper.removeClass('h-show-menu');
        $menuContainer.find('ul').removeAttr('style');

        openedMobileMenu = false;
        enabledMobileMenu = false;
        disableScroll(false);
    }
}

module.exports = function () {
    $(window).on('resize', function () {
        checkHeaderHamburger();
    });

    $openMenuButton.click(function () {
        $menuWrapper.addClass('h-show-menu');

        openedMobileMenu = true;
        enabledMobileMenu = true;
        disableScroll(true);
    });

    $closeMenuButton.click(function () {
        $menuWrapper.removeClass('h-show-menu');
        $menuContainer.find('ul').removeAttr('style');

        openedMobileMenu = false;
        enabledMobileMenu = false;
        disableScroll(false);
    });

    $openNextLevel.click(function () {
        if (enabledMobileMenu) {
            pullLeft(this);
        }
    });

    $openPrevLevel.click(function () {
        if (enabledMobileMenu) {
            pullRight(this);
        }
    });


    $topLevelCategory.on('mouseover', function () {
        $topLevelCategory.removeClass("is-show");
        $(this).addClass("is-show");
    });

    $topLevelCategory.on('mouseout', function () {
        $topLevelCategory.removeClass("is-show");
    });
};
