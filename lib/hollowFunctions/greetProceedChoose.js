const { promptClaude } = require("../../services/anthropic");

async function greetProceedChoose(englishTranscription) {
    const reply = await promptClaude(
        'claude-3-sonnet-20240229',
        `A user has just been asked: "Would you like to learn some Ukrainian?" \n` +
        `Your task is to determine whether the user would or would not like to learn some Ukrainian. \n` +
        `Please output *only* JSON: \n` +
        `{ 
    "learn": true/false
}`,
        [
            {
                "role": "user",
                "content": englishTranscription
            },
            {
                "role": "assistant",
                "content": "{"
            }
        ]
    );
    return JSON.parse('{ ' + reply.content[0].text).learn;
}

module.exports = greetProceedChoose;