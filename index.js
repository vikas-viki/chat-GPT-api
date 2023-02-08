const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    // organization: process.env.ORGANIZATION,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json())

app.post('/', async (req, res) => {
    try {

        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: req.body.message,
            max_tokens: 2000,
            temperature: 0.1
        });



        res.json({
            message: response.data
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


