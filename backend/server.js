import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const words = ["APPLE", "TIGER", "HOUSE", "CHECK", "PIZZA"];

let word = [];

let guesses = [];

app.get("/word", async (req, res) => {
  word.length = 0;
  guesses.length = 0;

  const randomWord = words[Math.floor(Math.random() * words.length)];
  word = randomWord.split("");
  guesses.push(Array(word.length).fill("_"));

  console.log(word);

  return res.json({ length: word.length, guesses });
});

app.post("/check", async (req, res) => {
  const { letter } = req.body;
  if (!letter) return res.status(400).json({ error: "invalid input" });

  const upperLetter = letter.toUpperCase();
  const newGuess = [...guesses[guesses.length - 1]];
  const lastGuess =
    guesses.length > 0
      ? guesses[guesses.length - 1]
      : Array(word.length).fill("_");

  let correctGuess = false;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === upperLetter && newGuess[i] === "_") {
      newGuess[i] = upperLetter;
      correctGuess = true;
    }
  }

  if (correctGuess) guesses.push(newGuess);
  else guesses.push([...guesses[guesses.length - 1]]);

  if (!newGuess.includes("_")) return res.json({ message: "You won", guesses });

  if (guesses.length >= 6)
    return res.json({
      message: "game over",
      correctWord: word.join(""),
      guesses,
    });

  return res.json({ guesses, attemptsLeft: 6 - guesses.length });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
