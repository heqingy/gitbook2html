const path = require('path')
const entry = require('./build/entry')

module.exports = {
    mode: 'development',
    entry,
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
    resolve: {
        alias: {
            '@parts': path.resolve(__dirname, 'parts')
        }
    }
}