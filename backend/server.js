const express = require("express");

const app = express();

app.use(express.json());

const words = ["APPLE", "TIGER", "HOUSE", "CHECK", "PIZZA", "AMAR"];

const word = [];
const guess = [];

app.get("/word", async (req, res) => {
  word.splice(0, word.length);
  guess.splice(0, guess.length);
  const randomWord = words[Math.floor(Math.random() * words.length)];
  for (let i = 0; i < randomWord.length; i++) {
    guess.push("_");
    word.push(randomWord[i]);
  }
  console.log(word);
  return res.json({ length: randomWord.length, guess, randomWord, word });
});

app.post("/check", async (req, res) => {
  const { letter } = req.body;
  const indexes = [];

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) indexes.push(i);
  }

  indexes.forEach((i) => {
    guess[i] = letter;
  });

  console.log(guess);
  return res.json({guess, word, indexes, letter})
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
