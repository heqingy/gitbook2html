const path = require('path')
const entry = require('./build/entry')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        minimize: false
    },
    resolve: {
        alias: {
            '@parts': path.resolve(__dirname, 'parts'),
            '@lib': path.resolve(__dirname, 'lib'),
            '@build': path.resolve(__dirname, 'build'),
            '@styles': path.resolve(__dirname, 'styles'),
        },
        extensions: ['.ts', '.tsx', '.js', '.css', '.json']
    }
}