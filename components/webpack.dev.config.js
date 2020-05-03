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
        ],
    },
    resolve: {
        alias: {
            '@parts': path.resolve(__dirname, 'parts'),
            '@lib': path.resolve(__dirname, 'lib'),
            '@build': path.resolve(__dirname, 'build'),
        }
    }
}