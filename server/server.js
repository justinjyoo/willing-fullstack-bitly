const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const utils = require('./utils/hashing.js')
const app = express();
const port = process.env.PORT || 8889;

const PARENT_DIR = path.resolve(__dirname, '..')

app.use(express.static(path.resolve(PARENT_DIR)))


// parse data as JSON
app.use(bodyParser.json())
// log all request in the Apache combined format to STDOUT
app.use(morgan('combined'))

app.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve(PARENT_DIR, 'index.html'));
})

app.post('/v1/links', async (req, res) => {
	try {
		const shortenedURL = await utils.hashURL(req.body.url);
		res.status(201).send(shortenedURL);
	} catch (e) {
		res.status(502).send('Bad gateway: there is a problem with the server.');
	}
})

app.listen(port, () => {
	console.log("Listening on port " + port)
})