const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 8889;

// parse data as JSON
app.use(bodyParser.json())
// log all requests in the Apaache combined format to STDOUT
app.use(morgan('combined'))

app.use(express.static(__dirname, 'index.html'));