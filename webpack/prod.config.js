/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    mode: 'production',

    entry: {
        'Danmaku.ws': './src/js/danmaku.ws.js'
    },

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].min.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        })
    ]

};
