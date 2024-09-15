let flashcards = [];
let currentCard = 0;
let flipped = false;
let upl = [
    0, 1, 2, 4, 5, 6, 7, 8,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
];


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
        if (currentCard == 57) {
            const isToggleActive = document.getElementById("toggle").checked;
            if (isToggleActive) {
                currentCard = 58;
            } else {
                currentCard = 72;
            }
        }
        else if  (currentCard == 89) {
            const isToggleActive = document.getElementById("toggle").checked;
            if (isToggleActive) {
                currentCard = 90;
            } else {
                currentCard = 104;
            }
        } else {
            currentCard++;
        }
    } else {
        currentCard = 0; // Loop back to the first card
    }
    updateCard();
});
document.getElementById("Back").addEventListener("click", () => {
    if (currentCard > 0) {if (currentCard == 72) {
        const isToggleActive = document.getElementById("toggle").checked;
        if (isToggleActive) {
            currentCard = 71;
        } else {
            currentCard = 57;
        }
    }
    else if  (currentCard == 104) {
        const isToggleActive = document.getElementById("toggle").checked;
        if (isToggleActive) {
            currentCard = 103;
        } else {
            currentCard = 89;
        }
    } else {
        currentCard--;}
    } else {
        currentCard =flashcards.length - 1 ; // Loop back to the first card
    }
    updateCard();
});
document.getElementById("Up").addEventListener("click", () => {
    if (currentCard >= 0 && !upl.includes(currentCard)) {
        if(currentCard==3){
            currentCard =0;
        }
        else if(currentCard<=21){
            currentCard=currentCard-8;
        }
        else if(currentCard<=58){
            currentCard=currentCard-18;
        }
        else {
            currentCard=currentCard-32;
        }}

     else {
        alert(' No element above in the table');
    }
    updateCard();
});
document.getElementById("Down").addEventListener("click", () => {
    if (currentCard <= 86) {
        if(currentCard== 0 ){
            currentCard+=3;
        }
        else if(currentCard<= 12){
            currentCard= currentCard+8;
        }
        else if(currentCard<=39){
            currentCard+=18;
        }
        else {
            currentCard+=32;
        }}

     else {
        alert(' No element below in the table');
    }
    updateCard();
});

document.getElementById("random").addEventListener("click", () => {
    currentCard = Math.floor(Math.random() * 120) + 1;
    updateCard();
});
updateCard();

