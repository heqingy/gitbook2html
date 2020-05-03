const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../source');
const parentDir = ['/assets/', '/versions/']
const targetFileSuffix = ['.tsx', '.json']

fileDisplay(filePath, (filePath) => {
    if (!filePath) {
        return;
    }
    const fp = String(filePath)
    const isTargetFile = !!targetFileSuffix.find(suffix => !!fp.endsWith(suffix))
    const isTargetDir = !!parentDir.find(dirname => !!fp.includes(dirname))
    if (isTargetFile && isTargetDir) {
        fs.unlinkSync(filePath)
    }
});

function fileDisplay(filePath, cb) {
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            files.forEach(function (filename) {
                const filedir = path.join(filePath, filename);
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        const isFile = stats.isFile();
                        const isDir = stats.isDirectory();
                        if (isFile) {
                            cb && cb(filedir)
                        }
                        if (isDir) {
                            fileDisplay(filedir, cb);
                        }
                    }
                })
            });
        }
    });
}