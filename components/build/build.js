const fs = require('fs')
const path = require('path')

const sourcePath = path.join(__dirname, '../source')
const buildPath = path.join(__dirname, '../build')
const tsxFilePath = []

function getAllTsxFile(dirPath, callback) {
    fs.readdir(dirPath, function (err, files) {
        var count = 0
        var checkEnd = function () {
            ++count == files.length && callback()
        }
        files.forEach(filename => {
            var fullPath = `${dirPath}/${filename}`
            fs.stat(fullPath, (_, stats) => {
                if (stats.isDirectory()) {
                    return getAllTsxFile(fullPath, checkEnd)
                } else {
                    if (fullPath.endsWith('.tsx')) {
                        const __dir = __dirname.split('/')
                        tsxFilePath.push(fullPath.replace(__dir.slice(0, __dir.length - 1).join("/"), "."))
                    }
                    checkEnd()
                }
            })

        })
        //为空时直接回调
        files.length === 0 && callback()
    })

}

function makeEntry(tsxFilePath) {
    const entry = {};
    (tsxFilePath || []).forEach(path => {
        entry[path.replace(".tsx", "")] = path
    })

    fs.writeFileSync(`${buildPath}/entry.js`, `
        module.exports = ${JSON.stringify(entry)}
    `);
}

getAllTsxFile(sourcePath, () => makeEntry(tsxFilePath))