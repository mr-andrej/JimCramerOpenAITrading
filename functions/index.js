const functions = require("firebase-functions");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    const gptCompletion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Jim Cramer recommends buying the following five stock tickers: ",
        temperature: 0.7,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    response.send(gptCompletion.data);
});
