const { transcribeEnglish, transcribeUkrainian } = require("../services/googleCloud");
const { greetProceedChoose } = require("../lib");


async function speechToSpeech(req, res) {
    try {
        const userSpeech = req.file.buffer;
        console.log('req.body:', req.body);
        const message = JSON.parse(req.body.message);

        if (message.task === 'greet-proceed-choose') {
            const englishTranscription = await transcribeEnglish(userSpeech);
            console.log("English transcription:", englishTranscription);
            const reply = await greetProceedChoose(englishTranscription);
            console.log("reply from greetProceedChoose:", reply);

        }


        // res.status(200).json({ transcription: englishTranscription });
    } catch (error) {
        console.error("Error transcribing speech:", error);
        res.status(500).json({ error: "Error transcribing speech" });
    }
}

module.exports = speechToSpeech;