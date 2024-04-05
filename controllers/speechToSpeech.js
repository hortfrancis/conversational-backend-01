const { transcribeEnglish, transcribeUkrainian } = require("../services/googleCloud");

async function speechToSpeech(req, res) {
    try {
        const userSpeech = req.file.buffer;

        const englishTranscription = await transcribeEnglish(userSpeech);

        console.log("English transcription:", englishTranscription);

        res.status(200).json({ transcription: englishTranscription });
    } catch (error) {
        console.error("Error transcribing speech:", error);
        res.status(500).json({ error: "Error transcribing speech" });
    }
}

module.exports = speechToSpeech;