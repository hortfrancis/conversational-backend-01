const express = require('express');
const cors = require('cors');
const multer = require('multer');

const speechToSpeech = require('./controllers/speechToSpeech');

const app = express();
app.use(cors());

// Multer configuration: receive audio files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Generic hello world endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/speech-to-speech', upload.single('audio'), speechToSpeech);

module.exports = app;