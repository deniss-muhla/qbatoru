const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]'
                },
                sideEffects: true
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha384']
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    output: {
        crossOriginLoading: 'anonymous',
        filename: '[name].[contenthash].bundle.js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
});
