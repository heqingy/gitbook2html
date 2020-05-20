const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../source');
const apps = fs.readdirSync(filePath)
const excludeFiles = ['.DS_Store', '.DS_Store']

function rmdir(filePath, callback) {
    fs.stat(filePath, function (err, stat) {
        if (err) return console.log(err)
        if (stat.isFile()) {
            fs.unlink(filePath, callback)
        } else {
            fs.readdir(filePath, function (err, data) {
                if (err) return console.log(err)
                let dirs = data.map(dir => path.join(filePath, dir))
                let index = 0
                !(function next() {
                    if (index === dirs.length) {
                        fs.rmdir(filePath, callback)
                    } else {
                        rmdir(dirs[index++], next)
                    }
                })()
            })
        }
    })
}


apps.forEach(app => {
    if (excludeFiles.includes(app)) {
        fs.unlinkSync(`${filePath}/${app}`)
        return;
    }

    const versionPath = `${filePath}/${app}/versions`

    fs.existsSync(versionPath) && rmdir(versionPath, () => { })
})
