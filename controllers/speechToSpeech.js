const { transcribeEnglish, transcribeUkrainian } = require("../services/googleCloud");
const { generateSpeech } = require("../services/elevenlabs");
const { greetProceedChoose, evaluatePronunciation } = require("../lib");


async function speechToSpeech(req, res) {
    try {
        const userSpeech = req.file.buffer;
        console.log('req.body:', req.body);
        const message = JSON.parse(req.body.message);

        // Greet screen 
        if (message.task === 'greet-proceed-choose') {
            // const reply = await greetProceedChoose(await transcribeEnglish(userSpeech));
            // Dev temporarily hardcoding the reply
            const reply = true;
            res.status(200).json({ learn: reply });
        }

        if (message.task === 'say-pryvit') {
            const reply = await evaluatePronunciation(await transcribeUkrainian(userSpeech));
            if (reply.understood) {
                const generatedSpeech = await generateSpeech("Great! You have said ‘hello’ in Ukrainian!");
                res.status(200).json({
                    understood: true,
                    assistantText: "Great! You have said ‘hello’ in Ukrainian!",
                    assistantAudio: generatedSpeech.toString('base64')
                });
            } else {
                const generatedSpeech = await generateSpeech(reply.guidance);
                res.status(200).json({
                    understood: false,
                    assistantText: reply.guidance,
                    assistantAudio: generatedSpeech.toString('base64')
                });
            }
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