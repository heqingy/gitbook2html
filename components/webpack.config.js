const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        './index': "./index.tsx",
        './index2': "./index2.tsx",
        './a/b/index3':'./a/b/index3.tsx'
    },
    output: {
        path: path.resolve(__dirname, "."),
        filename: "[name].js"
    },
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
}