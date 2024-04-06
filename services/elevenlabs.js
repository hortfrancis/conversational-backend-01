const { ElevenLabsClient } = require("elevenlabs");

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env['ELEVENLABS_API_KEY'],
});

async function generateSpeech(text) {
    try {
        // Returns a passthrough stream
        return await elevenlabs.generate({
            voice: "K277DjAonl0Zo3QsPGhe",
            text: text,
            model_id: "eleven_multilingual_v2",
        });
    } catch (error) {
        console.error("Error generating speech audio:", error);
    }
}

module.exports = { generateSpeech };