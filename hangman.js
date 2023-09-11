
const programming_languages = [
  "python",
  "javascript",
  "mongodb",
  "json",
  "java",
  "html",
  "css",
  "c",
  "csharp",
  "golang",
  "kotlin",
  "php",
  "sql",
  "ruby",
  "typescript",
  "rust",
  "swift",
  "perl",
  "scala",
  "dart",
  "lua",
  "elixir",
  "r",
  "fortran",
];

const frameworks = [
  "react",
  "angular",
  "vue",
  "express",
  "spring",
  "django",
  "flask",
  "laravel",
  "rails",
  "symfony",
  "flutter",
  "ionic",
  "electron",
  "ember",
  "meteor",
];

const databases = [
  "mysql",
  "postgresql",
  "mongodb",
  "sqlite",
  "oracle",
  "couchbase",
  "redis",
  "neo4j",
  "firebase",
  "dynamodb",
];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let gamesWon = 0;
let gamesLost = 0;


function randomWord() {
  // Combine all the lists
  const allWords = [
    ...programming_languages,
    ...frameworks,
    ...databases,
  ];

  // Select a random word from the combined list
  answer = allWords[Math.floor(Math.random() * allWords.length)];

  // Create dashed word
  const dashedWord = "_ ".repeat(answer.length).trim();
  
  // Set the word in the UI
  document.getElementById('wordSpotlight').textContent = dashedWord;
}


function handleInput() {
  const inputField = document.getElementById('userInput');
  const userInput = inputField.value.toLowerCase();

  // Check if the input is a single letter
  if (/^[a-zA-Z]$/.test(userInput)) {
    inputField.value = ''; // Clear the input field
    handleGuess(userInput);
  }
}



function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './img/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('wordSpotlight').innerHTML = 'You Won!!!';
    document.getElementById('userInput').setAttribute('disabled', true);
    gamesWon++; // Increment gamesWon counter
    document.getElementById('gamesWon').innerHTML = gamesWon; // Update the games won on the scoreboard
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('userInput').setAttribute('disabled', true);
    gamesLost++; // Increment gamesLost counter
    document.getElementById('gamesLost').innerHTML = gamesLost; // Update the games lost on the scoreboard
  }
}


function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './img/0.jpg';
  document.getElementById('userInput').removeAttribute('disabled');
  document.getElementById('userInput').value = '';

  randomWord();
  guessedWord();
  updateMistakes();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
guessedWord();
