/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');

module.exports = {

    mode: 'development',

    /*devtool: 'cheap-module-source-map',*/

    entry: {
        'Danmaku.ws': './src/js/danmaku.ws.js'
    },

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: []
    }

};
