'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'development',

    entry: path.resolve(__dirname, './test/index.ts'),

    devtool: false,

    output: {
        path: path.resolve(__dirname, './test/dist'),
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.scss', '.less', '.css'],
    },

    devServer: {
        contentBase: path.resolve(__dirname, './test/dist'),
        open: true,
        port: 8080,
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                }],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: path.resolve(__dirname, './dist'),
                    options: {
                        exportType: true,
                    },
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            exportLocalsConvention: 'camelCaseOnly',
                            localIdentName: '[name]__[local]__[hash:base64]',
                        },
                    },
                }, {
                    loader: 'sass-loader',
                }],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: path.resolve(__dirname, './dist'),
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            exportLocalsConvention: 'camelCaseOnly',
                            localIdentName: '[name]__[local]__[hash:base64]',
                        },
                    },
                }, {
                    loader: 'less-loader',
                }],
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: path.resolve(__dirname, './dist'),
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            exportLocalsConvention: 'camelCaseOnly',
                            localIdentName: '[name]__[local]__[hash:base64]',
                        },
                    },
                }],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './test/index.html',
            filename: './index.html',
        }),
    ],
};
