// Varijable

const wordDisplay = document.getElementById("word-display");
const attempts = document.getElementById("attempts");
const messageBox = document.getElementById("message");

const guessButton = document.getElementById("guess-button");
const newGameButton = document.getElementById("new-game");

let word = [];
let guesses = [];
let attemptsLeft = 6;

// Tastatura

const sendLetter = (letter) => {
  const key = document.getElementById(`key-${letter}`);
  key.classList.add("bg-gray-400");
  fetchLetter(letter);
  setTimeout(() => {
    key.classList.remove("bg-gray-400");
  }, 200);
};

window.addEventListener("keydown", (event) => {
  const letter = event.key.toUpperCase();
  if (isLetter(letter)) sendLetter(letter);
});

const isLetter = (str) => {
  return /^[a-zA-Z]$/.test(str);
};

// Logika - Fetch itd...

const startNewGame = async () => {
  const response = await fetch("http://localhost:3000/word");
  const data = await response.json();

  word = data.guesses[0] || [];
  guesses = data.guesses || [];
  attemptsLeft = data.attemptsLeft || 6;

  updateWord();
  updateAttempts();
};

const fetchLetter = async (letter) => {
  const response = await fetch("http://localhost:3000/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ letter }),
  });

  const data = await response.json();

  console.log(data);

  guesses = data.guesses;
  attemptsLeft = data.attemptsLeft;

  updateWord();
  updateAttempts();

  messageBox.innerHTML = data.message;
};

const updateWord = () => {
  wordDisplay.innerHTML = guesses[guesses.length - 1].join(" ");
};

const updateAttempts = () => {
  if (message.innerHTML !== "You won") attempts.innerHTML = attemptsLeft;
  else attempts.innerHTML = 6;
};

newGameButton.addEventListener("click", () => startNewGame());
