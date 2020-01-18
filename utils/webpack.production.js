const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = () => ({
    config: {
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
            new CspHtmlWebpackPlugin(
                {
                    'base-uri': "'self'",
                    'object-src': "'none'",
                    'script-src': ["'self'"],
                    'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
                },
                {
                    enabled: true,
                    hashingMethod: 'sha256',
                    hashEnabled: {
                        'script-src': true,
                        'style-src': false
                    },
                    nonceEnabled: {
                        'script-src': false,
                        'style-src': false
                    }
                }
            ),
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
    },
    htmlWebpackPluginOptions: {
        cspPlugin: {
            enabled: true,
            policy: {
                'base-uri': "'self'",
                'object-src': "'none'",
                'script-src': ["'self'"],
                'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
            },
            hashEnabled: {
                'script-src': true,
                'style-src': false
            },
            nonceEnabled: {
                'script-src': false,
                'style-src': false
            }
        }
    }
});
