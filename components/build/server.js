const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000
const sourcePath = path.join(__dirname, '../source')
app.use(express.static('.'));

const apps = fs.readdirSync(sourcePath)
apps.forEach(appName => {
    app.use(`/source/${appName}`, (req, res) => {
        res.sendFile(`${sourcePath}/${appName}/index.html`)
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))