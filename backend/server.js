const express = require('express');

const app = express();

app.use(express.json());

const words = ["APPLE", "TIGER", "HOUSE", "CHECK", "PIZZA", "AMAR"];

const word = [];

app.get("/word", async (req, res) => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const hiddenWord = [];
    for (let i = 0; i < randomWord.length; i++) {
        hiddenWord.push('_');
        word.push(randomWord[i]);
    }
    return res.json({length: randomWord.length, hiddenWord, randomWord, word});
})

app.post('/check', async (req, res) => {
    const letter = req.body;
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});