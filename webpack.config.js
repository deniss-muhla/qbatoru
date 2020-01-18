const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const env = {
    mode: process.env.NODE_ENV
};

const config = require(`./utils/webpack.${env.mode}.js`)(env);

module.exports = () => {
    const { mode } = env;
    return webpackMerge.smart(
        {
            entry: './src/index.tsx',
            mode,
            module: {
                rules: [
                    {
                        test: /\.svg$/,
                        loader: 'svg-inline-loader',
                        sideEffects: true
                    }
                ]
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js']
            },
            plugins: [
                new webpack.ProgressPlugin(),
                new HtmlWebpackPlugin({
                    favicon: './src/favicon.ico',
                    title: 'qbatoru',
                    template: './src/index.html',
                    meta: {
                        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                        'theme-color': '#4285f4'
                    }
                }),
                new WebpackPwaManifest({
                    name: 'qbatoru',
                    short_name: 'qbatoru',
                    description: 'qbatoru',
                    background_color: '#4285f4',
                    crossorigin: 'anonymous',
                    theme_color: '#4285f4',
                    'theme-color': '#4285f4',
                    icons: [
                        {
                            src: 'src/logo.png',
                            sizes: [96, 128, 192, 256, 384, 512]
                        },
                        {
                            src: 'src/logo.png',
                            size: '1024x1024'
                        }
                    ]
                })
            ],
            output: {
                path: path.resolve(__dirname, 'dist')
            }
        },
        config
    );
};
