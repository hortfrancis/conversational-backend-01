const express = require('express');
const cors = require('cors');

const speechToSpeech = require('./controllers/speechToSpeech');

const app = express();
app.use(cors());

// Generic hello world endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;