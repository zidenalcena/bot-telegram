const { Configuration, OpenAIApi } = require("openai");
const TelegramBot = require('node-telegram-bot-api');

// API openAI key
const config = new Configuration({
    apiKey: "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"
})

// API telegram key
const bot = new TelegramBot('6152642215:AAHHqY2zIcHKioN8XMU_bkgcmYUg2x10u8I', {
    polling: true
});

bot.onText(/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hello human!');
});

const openAI = new OpenAIApi(config)
bot.on('message', async (msg) => {
    try {
        const response = await openAI.createCompletion({
            model: "text-davinci-003",
            prompt: msg.text,
            max_tokens: 2048,
            temperature: 1,
        })

        const { choices } = response.data;
        const { text } = choices[0];

        console.log(response.data); //untuk menampilkan data API

        bot.sendMessage(msg.chat.id, text);
    } catch (error) {
        console.error(error);
        bot.sendMessage(msg.chat.id, 'Sorry, something went wrong.');
    }
});
