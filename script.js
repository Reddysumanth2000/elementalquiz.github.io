let flashcards = [];
let currentCard = 0;
let flipped = false;

function loadFlashcards() {
    fetch('flashcards.json')
    .then(response => response.json())
    .then(data => {
        flashcards = data;
        updateCard(); // Initialize the first card
    })
    .catch(error => console.error("Could not load flashcards:", error));
}

loadFlashcards();


const flashcardElement = document.getElementById("flashcard");
const questionElement = flashcardElement.querySelector(".front");
const answerElement = flashcardElement.querySelector(".back");

function updateCard() {
    const card = flashcards[currentCard];
    questionElement.style.backgroundImage = `url('${card.front}')`;
    answerElement.style.backgroundImage = `url('${card.back}')`;
    flipCard(false); // Ensure the card is reset to its front side
}

function flipCard(shouldFlip) {
    if (shouldFlip) {
        flashcardElement.style.transform = "rotateY(180deg)";
    } else {
        flashcardElement.style.transform = "rotateY(0deg)";
    }
    flipped = shouldFlip;
}
document.getElementById('keyButton').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

document.getElementById("flip").addEventListener("click", () => flipCard(!flipped));
document.getElementById("next").addEventListener("click", () => {
    if (currentCard < flashcards.length - 1) {
        currentCard++;
    } else {
        currentCard = 0; // Loop back to the first card
    }
    updateCard();
});
document.getElementById("Back").addEventListener("click", () => {
    if (currentCard > 0) {
        currentCard--;
    } else {
        currentCard =flashcards.length - 1 ; // Loop back to the first card
    }
    updateCard();
});
document.getElementById("random").addEventListener("click", () => {
    currentCard = Math.floor(Math.random() * 120) + 1;
    updateCard();
});
updateCard();

