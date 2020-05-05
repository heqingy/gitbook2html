const path = require('path')
const entry = require('./build/entry')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    mode: 'development',
    entry,
    output: {
        path: path.resolve(__dirname, "."),
        filename: "[name].js"
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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // localIdentName: '[hash:base64:6]'
                        }
                    },
                ],
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
    resolve: {
        alias: {
            '@parts': path.resolve(__dirname, 'parts'),
            '@lib': path.resolve(__dirname, 'lib'),
            '@build': path.resolve(__dirname, 'build'),
        },
        extensions: ['.ts', '.tsx', '.js']
    }
}