const express = require('express')
const app = express()
const ws = require('ws')
const enigma = require('enigma.js')
const halyard = require('halyard.js')
const enigmaMixin = require('halyard.js/dist/halyard-enigma-mixin.js')
const schema = require('enigma.js/schemas/12.170.2.json')
const bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({limit: '1mb'}))

app.use('/', express.static(`${__dirname}/dist`))
app.use('/resources', express.static(`${__dirname}/node_modules`))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/dist/index.html`)
})

app.get('/createApp/:name', (req, res) => {		
	const session = enigma.create(
		{
			url: 'ws://100.115.92.201:19076/app/engineData',
			schema,	
			mixins: enigmaMixin,
			createSocket: url => {
				return new ws(url)
			}
		}
	)
	session.open().then(global => {
		console.log(global);	
		const h = new halyard()
		h.addTable('/data/ramen-ratings.csv', 'Ratings')
		global.createAppUsingHalyard(req.params.name, h).then(result => {
			console.log(result);
			result.getScript().then(script => {
				console.log(script);
				
			})
			session.close()
		})
	}, err => {
		console.log(err);
		
	})
})

app.get('/*', (req, res) => {
	res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(8000)
