const { promptClaude } = require("../../services/anthropic");

async function evaluatePronunciation(ukrainianTranscription) {

    console.log('ukrainianTranscription:', ukrainianTranscription);

    const reply = await promptClaude(
        'claude-3-sonnet-20240229',
        `A user is practising their Ukrainian pronunciation. \n` +
        `Your task is to determine whether the user pronounced 'привіт' correctly. \n` +
        `The user's speech has been transcribed with a speech-to-text model, that is constrained specifically to Ukrainian. \n` +
        `This means the user text you receive will be the Ukrainian text (text in Ukrainian characters) that represent the closest Ukrainian words the speech-to-model recognised in the user's speech. \n` +
        `If the user did not pronounce 'привіт' correctly, you should provide guidance on what was wrong with their pronunciation, given the content of the transcribed output. \n` +
        `Note: Please use Ukrainian characters (e.g. 'привіт') for any Ukrainian words. \n` +
        `Please output *only* JSON: \n` +
        `{
    "understood": true/false, 
    "guidance": "It sounds like you said '...' instead of 'привіт'. Try ... (e.g. pronouncing the 'r' sound more clearly)." OR ""
}`,
        [
            {
                "role": "user",
                "content": ukrainianTranscription
            },
            {
                "role": "assistant",
                "content": "{"
            }
        ]
    );
    try {
        const parsed = JSON.parse('{ ' + reply.content[0].text);
        if (parsed.understood !== undefined || parsed.guidance !== undefined) return parsed;
    } catch (error) {
        throw new Error("Language model did not return the expected JSON format.");
    }
}

module.exports = evaluatePronunciation;