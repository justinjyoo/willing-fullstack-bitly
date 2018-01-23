const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const utils = require('./utils/hashing.js');
const app = express();
const port = process.env.PORT || 8889;
const axios = require('axios');

const PARENT_DIR = path.resolve(__dirname, '..');

app.use(express.static(path.resolve(PARENT_DIR)));


// parse data as JSON
app.use(bodyParser.json());
// log all request in the Apache combined format to STDOUT
// app.use(morgan('combined'));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
   next();
});

app.get('/', (req, res) => {
	res.status(200).sendFile(path.resolve(PARENT_DIR, 'index.html'));
})

app.get('/v1/link', async (req, res) => {
	const longLink = await utils.getURL(req.query.url)
	console.log(req.query.url, 'fdsajkl;fsdjklfdsf;jdask')
	res.status(200).send(longLink)
})

app.post('/v1/links', async (req, res) => {
	console.log('links')
	if(!req.body.url) {
		res.status(400).send('URL is missing from the request.');
		return;
	} 

	try {
		const shortenedURL = await utils.hashURL(req.body.url);
		res.status(201).send(shortenedURL);
		return;
	} catch (e) {
		res.status(502).send('Bad gateway: there is a problem with the server.');
	}
})

app.post('/v1/delete', async (req, res) => {
	if(!req.body.url) {
		res.status(400).send('URL is missing from the request.');
		return;
	} 

	try {
		const allLinks = await utils.destroyURL(req.body.url);
		console.log('allLinks delete', allLinks)
		res.status(201).send(allLinks);
		return;
	} catch (e) {
		res.status(502).send('Bad gateway: there is a problem with the server.');
	}
})

app.get('/v1/allLinks', async (req, res) => {
	console.log('get all links')
	try{
		const allLinks = await utils.checkCurrentCache()
		res.status(200).send(allLinks)
	} catch (e) {
		res.status(502).send('Bad gateway: there is a problem with the server.');
	}
	
})


app.all('*', (req, res) => {
	res.status(404).send('404 Error. Resource not found.');
})

app.listen(port, () => {
	console.log("Listening on port " + port);
})

module.exports = app;