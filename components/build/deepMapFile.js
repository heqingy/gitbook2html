const fs = require('fs');
const path = require('path');

module.exports = function deepMapFile(filePath, cb, end) {
    const files = fs.readdirSync(filePath);
    let isEnd = false
    files.forEach(function (filename) {
        if (!!files[files.length - 1] && files[files.length - 1].includes(filename)) {
            isEnd = true
        }
        const filedir = path.join(filePath, filename);
        const stats = fs.statSync(filedir)
        const isFile = stats.isFile();
        const isDir = stats.isDirectory();
        if (isFile) {
            cb && cb(filedir, filename)
        }
        if (isDir) {
            deepMapFile(filedir, cb);
        }
    });
    if (isEnd) {
        !!end && end()
    }
}
