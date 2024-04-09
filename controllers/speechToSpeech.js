const { transcribeEnglish, transcribeUkrainian } = require("../services/googleCloud");
const { greetProceedChoose } = require("../lib");


async function speechToSpeech(req, res) {
    try {
        const userSpeech = req.file.buffer;
        console.log('req.body:', req.body);
        const message = JSON.parse(req.body.message);

        // Greet screen 
        if (message.task === 'greet-proceed-choose') {
            const reply = await greetProceedChoose(await transcribeEnglish(userSpeech));
            res.status(200).json({ learn: reply });
        }

        // Choose an activity
        if (message.task === 'choose-activity') {
            res.status(200).json({ message: "No other activities supported yet!" });
        }

    } catch (error) {
        console.error("Error transcribing speech:", error);
        res.status(500).json({ error: `Error transcribing speech: ${error}` });
    }
}

module.exports = speechToSpeech;