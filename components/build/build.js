const fs = require('fs')
const path = require('path')
const deepMapFile = require('./deepMapFile');

const sourcePath = path.join(__dirname, '../source')
const buildPath = path.join(__dirname, '../build')
const modulesPath = path.join(__dirname, '../modules')
const asssetsPath = path.join(__dirname, '../../dist')
const excludeFiles = ['.DS_Store', '.DS_Store']

function makeEntry() {
    const entry = {};
    fs.readdirSync(sourcePath).forEach(app => {
        if (excludeFiles.includes(app)) {
            return;
        }
        const basePath = `./source/${app}`
        entry[`${basePath}/bundle`] = `${basePath}/_appRoute.tsx`
    })
    fs.writeFileSync(`${buildPath}/entry.js`, `
        module.exports = ${JSON.stringify(entry)}
    `);
}

function makeAssetsPath() {
    const pathJson = {};

    deepMapFile(path.join(__dirname, '../source'), (filePath, filename) => {
        if (!filePath || excludeFiles.includes(filename)) {
            return;
        }

        if (filename === 'revision.json') {
            const projectVersionDirPath = String(filePath).replace(filename, '')
            fs.writeFileSync(`${projectVersionDirPath}/reversion.js`, `const reversion = ${JSON.stringify(require(filePath))}`);
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

function makeHtmlTemplate() {
    const apps = fs.readdirSync(sourcePath)
    apps.forEach(app => {
        if (!excludeFiles.includes(app)) {
            const destPath = `${sourcePath}/${app}`
            fs.renameSync(`${destPath}/modules/index.html`, `${destPath}/index.html`);
        }
    })
}

makeAssetsPath()
makeEntry()
makeHtmlTemplate()