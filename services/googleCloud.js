const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient({
    keyFilename: "./key.json",
});

async function speechToText(audioData, languageCode) {
    try {
        const audioBytes = Buffer.from(audioData, "base64");

        const audio = {
            content: audioBytes,
        };
        const config = {
            languageCode: languageCode,
        };
        const request = {
            audio: audio,
            config: config,
        };
        const [response] = await client.recognize(request);

        if (response.results.length === 0) {
            throw new Error("No speech detected.");
        }

        const transcripts = response.results.map(
            (result) => result.alternatives[0].transcript
        )[0];
        return transcripts;
    } catch (error) {
        console.error("ERROR:", error);
        throw error;
    }
}

function transcribeEnglish(audioData) {
    return speechToText(audioData, "en-GB");
}

function transcribeUkrainian(audioData) {
    return speechToText(audioData, "uk-UA");
}

module.exports = {
    transcribeEnglish,
    transcribeUkrainian,
};