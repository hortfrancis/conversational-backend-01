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
    )
    console.log("reply from Claude:", reply);
    // console.log('reply.content[0].text:', reply.content[0].text);
    console.log('JSON.parse(reply.content[0].text):', JSON.parse('{ ' + reply.content[0].text));

    console.log('learn:', JSON.parse('{ ' + reply.content[0].text).learn);
    // Remove '\n' because this will cause an error in JSON.parse
    // console.log('newline escaped:', ('{ ' + reply.content[0].text.replace('\n', ' ')));
    // const escaped = ('{ ' + reply.content[0].text.replace('\n', ' '));
    // console.log('escaped:', escaped);
    // console.log('JSON.parse(escaped):', JSON.parse(escaped));
    
    // console.log('JSON.parse(reply.content[0].text).learn:', JSON.parse('{ ' + reply.content[0].text).learn);
    return reply;
}

module.exports = greetProceedChoose;