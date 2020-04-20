const path = require('path')

module.exports = {
    mode: 'development',
    entry: "./index.tsx",
    // output: {
    //     path: path.resolve(__dirname, "dist"),
    //     filename: "bundle.js"
    // },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
}