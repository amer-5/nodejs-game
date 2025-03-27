const express = require("express");

const app = express();

app.use(express.json());

const words = ["APPLE", "TIGER", "HOUSE", "CHECK", "PIZZA", "AMAR"];

const word = [];
const guess = [];

app.get("/word", async (req, res) => {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  for (let i = 0; i < randomWord.length; i++) {
    guess.push("_");
    word.push(randomWord[i]);
  }
  return res.json({ length: randomWord.length, guess, randomWord, word });
});

app.post("/check", async (req, res) => {
  const letter = req.body;

  if (word.includes(letter)) {
    const indexes = letter
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
