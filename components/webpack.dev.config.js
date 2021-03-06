const path = require('path')
const entry = require('./build/entry')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
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
        new OpenBrowserPlugin({ url: "http://localhost:8080/source/Gitbook-Document-Example" }),
        new webpack.DefinePlugin({
            STATIC_PATH: "'/source'"
        })
    ],
    devServer: {
        contentBase: [
            __dirname,
            path.resolve(__dirname, '../dist'),
        ],
        historyApiFallback:{
            index:'/source/Gitbook-Document-Example/index.html'
        },
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