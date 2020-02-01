var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');
var aylien = require("aylien_textapi");
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

