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
            const projectVersionDirPath = String(filePath).replace(filename, '');
            const reversionJSON = require(filePath);
            fs.writeFileSync(`${projectVersionDirPath}/reversion.js`, `const reversion = ${JSON.stringify(reversionJSON)}`);
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
    const template = (basePath) => `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" type="text/css" href="/modules/Antd.css" />
        <link rel="stylesheet" type="text/css" href="/modules/katex.min.css" />
        <script type="text/javascript" src="/modules/React.js"></script>
        <script type="text/javascript" src="/modules/ReactDOM.js"></script>
        <script type="text/javascript" src="/modules/Antd.js"></script>
        
        
        <style>
            html,
            body {
                color: #242A31;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                font-size: 15px;
                box-sizing: border-box;
                font-family: "Roboto", sans-serif;
                line-height: 1em;
                font-smoothing: antialiased;
                text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                -webkit-text-size-adjust: 100%;
            }
        </style>
        <title>TigerGraph Documentation</title>
    </head>
    
    <body>
        <div id='root'></div>
        
        <script type="text/javascript" src='${basePath}/reversion.js'></script>
        <script type="text/javascript" src='${basePath}/bundle.js'></script>
    </body>
    
    </html>
    `
    const apps = fs.readdirSync(sourcePath)
    apps.forEach(app => {
        if (!excludeFiles.includes(app)) {
            const destPath = `${sourcePath}/${app}`
            fs.writeFileSync(`${destPath}/index.html`, template(`/source/${app}`))
        }
    })
}

makeAssetsPath()
makeEntry()
makeHtmlTemplate()