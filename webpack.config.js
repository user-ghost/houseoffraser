'use strict';

var path = require('path');
var webpack = require('sgmf-scripts').webpack;
var ExtractTextPlugin = require('sgmf-scripts')['extract-text-webpack-plugin'];
var jsFiles = require('sgmf-scripts').createJsPath();
var scssFiles = require('sgmf-scripts').createScssPath();
const optionator = require('optionator')(require('./node_modules/sgmf-scripts/lib/utils/options'));

var bootstrapPackages = {
    Alert: 'exports-loader?Alert!bootstrap/js/src/alert',
    // Button: 'exports-loader?Button!bootstrap/js/src/button',
    Carousel: 'exports-loader?Carousel!bootstrap/js/src/carousel',
    Collapse: 'exports-loader?Collapse!bootstrap/js/src/collapse',
    // Dropdown: 'exports-loader?Dropdown!bootstrap/js/src/dropdown',
    Modal: 'exports-loader?Modal!bootstrap/js/src/modal',
    // Popover: 'exports-loader?Popover!bootstrap/js/src/popover',
    Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/src/scrollspy',
    Tab: 'exports-loader?Tab!bootstrap/js/src/tab',
    // Tooltip: 'exports-loader?Tooltip!bootstrap/js/src/tooltip',
    Util: 'exports-loader?Util!bootstrap/js/src/util'
};

// Defaults
const cwd = process.cwd();
const packageJson = require(path.join(cwd, './package.json'));
let packageName = packageJson.packageName || packageJson.name;
const options = optionator.parse(process.argv);
if (options.cartridgeName) {
    packageName = options.cartridgeName;
}

module.exports = [{
    mode: 'development',
    name: 'js',
    entry: jsFiles,
    output: {
        path: path.resolve(
            './cartridges/' + packageName + '/cartridge/static'
        ),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            base: path.resolve(__dirname, 'cartridges/app_storefront_base/cartridge/client/default/js')
        }
    },
    module: {
        rules: [
            {
                test: /bootstrap(.)*\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [new webpack.ProvidePlugin(bootstrapPackages)]

}, {
    mode: 'none',
    name: 'scss',
    entry: scssFiles,
    devtool: 'source-map',
    output: {
        path: path.resolve(
                './cartridges/' + packageName + '/cartridge/static'
            ),
        filename: '[name].css'
    },
    resolve: {
        alias: {
            base: path.resolve(cwd, "./cartridges/app_storefront_base/cartridge/client/default/scss/")
        },
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')()
                        ],
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve('node_modules'),
                            path.resolve('node_modules/flag-icon-css/sass')
                        ],
                        sourceMap: true
                    }
                }]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' })
    ]
}];
