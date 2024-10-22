let secretWord = '';
let currentWord = '';
let attemptsLeft = 6;
let guessedLetters = [];
let selectedCategory = '';

const categories = {
    Fruits: ['apple', 'banana', 'cherry', 'grape', 'kiwi'],
    Animals: ['tiger', 'elephant', 'giraffe', 'dolphin', 'kangaroo'],
    Countries: ['japan', 'brazil', 'canada', 'france', 'germany']
};

// Start game with selected category
function startGame(category) {
    selectedCategory = category;
    secretWord = getRandomWord(category);
    currentWord = '_ '.repeat(secretWord.length).trim();
    attemptsLeft = 6;
    guessedLetters = [];

    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('categoryName').innerText = `Category: ${category}`;
    document.getElementById('wordDisplay').innerText = currentWord;
    document.getElementById('hangmanImage').src = `images/hangman0.png`;
    document.getElementById('guessedLetters').innerText = 'Guessed Letters: ';
    document.getElementById('message').innerText = '';
    document.getElementById('resetBtn').style.display = 'none';
}

// Get random word from category
function getRandomWord(category) {
    const words = categories[category];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Make a guess
function makeGuess() {
    const guess = document.getElementById('guessInput').value.toLowerCase();
    document.getElementById('guessInput').value = ''; // Clear input field

    if (!guess || guessedLetters.includes(guess)) {
        document.getElementById('message').innerText = 'Invalid or repeated guess!';
        return;
    }

    guessedLetters.push(guess);
    document.getElementById('guessedLetters').innerText = 'Guessed Letters: ' + guessedLetters.join(', ');

    if (secretWord.includes(guess)) {
        let updatedWord = '';
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === guess) {
                updatedWord += guess + ' ';
            } else {
                updatedWord += currentWord[i * 2] + ' ';
            }
        }
        currentWord = updatedWord.trim();
        document.getElementById('wordDisplay').innerText = currentWord;

        if (currentWord.replace(/\s+/g, '') === secretWord) {
            document.getElementById('message').innerText = 'Congratulations! You won!';
            endGame();
        }
    } else {
        attemptsLeft--;
        document.getElementById('hangmanImage').src = `images/hangman${6 - attemptsLeft}.png`;
        if (attemptsLeft === 0) {
            document.getElementById('message').innerText = `You lost! The word was: ${secretWord}`;
            endGame();
        }
    }
}

// End game and show reset button
function endGame() {
    document.getElementById('resetBtn').style.display = 'block';
}

// Reset game
function resetGame() {
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
}
