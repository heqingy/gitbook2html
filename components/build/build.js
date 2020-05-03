const fs = require('fs')
const path = require('path')

const sourcePath = path.join(__dirname, '../source')
const buildPath = path.join(__dirname, '../build')
const asssetsPath = path.join(__dirname, '../../dist')
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

function makeAssetsPath() {
    const pathJson = {};
    (fs.readdirSync(sourcePath) || []).forEach(f => {
        if (!f.includes('.DS_Store')) {
            (fs.readdirSync(`${sourcePath}/${f}/assets`) || []).map(i => {
                pathJson[i] = {
                    path: `/${f}/assets/${i}`,
                    size: fs.statSync(`${sourcePath}/${f}/assets/${i}`).size
                }
            })
        }
    })

    fs.writeFileSync(`${buildPath}/assets.js`, `
        module.exports = ${JSON.stringify(pathJson)}
    `);
}

getAllTsxFile(sourcePath, () => {
    makeEntry(tsxFilePath)
    makeAssetsPath()
})