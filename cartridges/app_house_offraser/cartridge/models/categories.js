'use strict';

var collections = require('*/cartridge/scripts/util/collections');
var URLUtils = require('dw/web/URLUtils');
var CatalogMgr = require('dw/catalog/CatalogMgr');

/**
 * Get category url
 * @param {dw.catalog.Category} category - Current category
 * @returns {string} - Url of the category
 */
function getCategoryUrl(category) {
    return category.custom && 'alternativeUrl' in category.custom && category.custom.alternativeUrl ?
        (category.custom.alternativeUrl.toString()).replace(/&amp;/g, '&') :
        URLUtils.url('Search-Show', 'cgid', category.getID()).toString();
}

/**
 * Creates object with custom attributes
 * @param {dw.catalog.Category} category - Current category
 * @returns {Object} - object with existing custom attributes
 */
function getCustomAttribute(category) {
    var result = {};

    if ('custom' in category) {
        for (var key in category.custom) {  // eslint-disable-line
            var value = category.custom[key];

            result[key] = value;
        }
    }
    return result;
}
var categoriesNew = [];
// var favorites = [];

/**
 * Converts a given category from dw.catalog.Category to plain object
 * @param {dw.catalog.Category} category - A single category
 * @returns {Object} plain object that represents a category
 */
function categoryToObject(category) {

    if (!category.isTopLevel() && (!category.custom || !category.custom.showInMenu)) {
        return null;
    }

    var result = {
        name: category.getDisplayName(),
        url: getCategoryUrl(category),
        id: category.ID,
        isTopLevel: CatalogMgr.getCategory(category.ID).isTopLevel(),
        custom: getCustomAttribute(category),
        thumbnail: category.getThumbnail() && category.getThumbnail().getURL().toString()
    };

    var subCategories = category.hasOnlineSubCategories() ?
        category.getOnlineSubCategories() : null;

    if (subCategories) {
        collections.forEach(subCategories, function (subcategory) {
            var converted = null;

            if (subcategory.hasOnlineProducts() || subcategory.hasOnlineSubCategories()) {
                converted = categoryToObject(subcategory);
            }
            if (converted) {
                if (!result.subCategories) {
                    result.subCategories = [];
                }

                result.subCategories.push(converted);
                categoriesNew.push(result);
            }
        });
        if (result.subCategories) {
            result.complexSubCategories = result.subCategories.some(function (item) {
                return !!item.subCategories;
            });
        }
    }
    categoriesNew.push(result);
    return result;
}

/**
 * Represents a single category with all of it's children
 * @param {dw.util.ArrayList<dw.catalog.Category>} items - Top level categories
 * @constructor
 */
function categories(items) {
    this.categories = [];
    collections.forEach(items, function (item) {
        if (item.hasOnlineProducts() || item.hasOnlineSubCategories()) {
            this.categories.push(categoryToObject(item));
        }
    }, this);
    this.categoriesNew = categoriesNew;
}

module.exports = categories;
