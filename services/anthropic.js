const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
});

async function promptClaude(model, systemMessage, messages) {
    if (!model || !systemMessage || !messages) {
        throw new Error("Missing required parameters to generate text completion.");
    }

    console.log("model:", model);
    console.log("systemMessage:", systemMessage);
    console.log("messages:", messages);

    try {
        return await anthropic.messages.create({
            model: model,
            max_tokens: 500,
            temperature: 0.5,
            system: systemMessage,
            messages: messages
        });
    } catch (error) {
        console.error("Error generating chat completion:", error);
    }
}

module.exports = { promptClaude };