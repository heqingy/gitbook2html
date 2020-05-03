const fs = require('fs');
const path = require('path');
const deepMapFile = require('./deepMapFile');

const filePath = path.join(__dirname, '../source');
const parentDir = ['/assets/', '/versions/']
const targetFileSuffix = ['.tsx', '.json']

deepMapFile(filePath, (filePath) => {
    if (!filePath) {
        return;
    }
    if (filePath.includes('__MACOSX')) {
        fs.unlinkSync(filePath)
    }
    const fp = String(filePath)
    const isTargetFile = !!targetFileSuffix.find(suffix => !!fp.endsWith(suffix))
    const isTargetDir = !!parentDir.find(dirname => !!fp.includes(dirname))
    if (isTargetFile && isTargetDir) {
        fs.unlinkSync(filePath)
    }
});

