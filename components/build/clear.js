const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../source');
const apps = fs.readdirSync(filePath)
apps.forEach(app => {
    if (app.includes('__MACOSX')) {
        fs.unlinkSync(filePath)
    }
    
    const path = `./source/${app}/versions`
    fs.existsSync(path) && fs.unlinkSync(path)
})
