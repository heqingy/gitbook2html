const path = require('path')
const entry = require('./build/entry')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    devtool: 'none',
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, "."),
        filename: "[name].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            STATIC_PATH: JSON.stringify('../../..')
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                          transpileOnly: true
                        }
                      }
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: ["url-loader"]
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",

    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: false,
                parallel: true,
                sourceMap: false,
            })
        ],
    },
    resolve: {
        alias: {
            '@parts': path.resolve(__dirname, 'parts'),
            '@lib': path.resolve(__dirname, 'lib'),
            '@build': path.resolve(__dirname, 'build'),
        },
        extensions: ['.ts', '.tsx', '.js']
    }
}