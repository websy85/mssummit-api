const express = require('express')
const app = express()

app.use('/', express.static(`${__dirname}/dist`))
app.use('/resources', express.static(`${__dirname}/node_modules`))

app.get('/', (req, res) => {
	express.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(8000)