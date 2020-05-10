const fs = require('fs')
const path = require('path')
const deepMapFile = require('./deepMapFile');

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
    const excludeFiles = ['.DS_Store', '.DS_Store']
    deepMapFile(path.join(__dirname, '../source'), (filePath, filename) => {
        if (!filePath || excludeFiles.includes(filename)) {
            return;
        }

        if (filename === 'revision.json') {
            const projectVersionDirPath = String(filePath).replace(filename, 'versions')
            const versionDirs = fs.readdirSync(projectVersionDirPath)
            versionDirs.forEach(versionDirName => {
                const versionPath = `${projectVersionDirPath}/${versionDirName}`
                if (!excludeFiles.includes(versionDirName)) {
                    // write version info to version dir
                    fs.writeFileSync(`${versionPath}/reversion.js`, `const reversion = ${JSON.stringify(require(filePath))}`);
                }
            });
        }

        const fp = String(filePath).replace(path.join(__dirname, '../source'), "")
        const parentDir = ['/assets/']
        const isTargetDir = !!parentDir.find(dirname => !!fp.includes(dirname))
        if (isTargetDir) {
            const fileName = fp.split('/').slice(-1).join('')
            pathJson[fileName] = {
                path: fp,
                size: fs.statSync(filePath).size
            }
        }
    }, () => {
        fs.writeFileSync(`${buildPath}/assets.js`, `module.exports = ${JSON.stringify(pathJson)}`);
    });
}

getAllTsxFile(sourcePath, () => {
    makeEntry(tsxFilePath)
    makeAssetsPath()
})