const { ElevenLabsClient } = require("elevenlabs");

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env['ELEVENLABS_API_KEY'],
});

async function generateSpeech(text) {
    try {
        // Returns a passthrough stream
        return await elevenlabs.generate({
            voice: "OpAJAp5k26n0f4nVatQW",
            text: text,
            model_id: "eleven_multilingual_v2",
        });
    } catch (error) {
        console.error("Error generating speech audio:", error);
    }
}

module.exports = { generateSpeech };