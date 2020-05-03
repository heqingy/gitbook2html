const path = require('path')
const entry = require('./build/entry')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    devtool: 'none',
    mode: 'development',
    entry,
    output: {
        path: path.resolve(__dirname, "."),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new OpenBrowserPlugin({ url: "http://localhost:8080/test/index.html" }),
        new webpack.DefinePlugin({
            STATIC_PATH: "''"
        })
    ],
    devServer: {
        contentBase: [
            __dirname,
            path.resolve(__dirname, '../dist'),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].min.[ext]",
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: "fonts/",
                            outputPath: "fonts/"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@parts': path.resolve(__dirname, 'parts'),
            '@lib': path.resolve(__dirname, 'lib'),
            '@build': path.resolve(__dirname, 'build'),
        }
    }
}