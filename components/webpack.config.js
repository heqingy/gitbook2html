const path = require('path')
const entry = require('./build/entry')
const webpack = require('webpack')

module.exports = {
    devtool: 'none',
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, "."),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            STATIC_PATH: JSON.stringify('../..')
        })
    ],
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