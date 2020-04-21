const fs = require('fs')
const entry = require('./entry')
const path = require('path')

Object.keys(entry).forEach(tsxPath => fs.unlinkSync(path.join(__dirname, '../' + entry[tsxPath])))