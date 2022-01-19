//Declared variables//

const qwerty = document.getElementById('qwerty');
let missed = 0;
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const hearts = document.querySelectorAll('.tries img');


// Adding event listener for clicks to start the game//
startButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

//creating random array of 5 phrases that will be used in the game//

const phrases = [
    'let there be life',
    'turn down for watt',
    'snow storm is not letting up',
    'this is taking longer than expected',
    'why is it so hard to focus during quarantine',
    'Better late than never'
];

//This function picks a phrase from the array and returns it split into an aray of characters.//
function getRandomPhraseAsArray (phrases) {
    const randomPhrase = Math.floor(Math.random() * phrases.length);
    return phrases[randomPhrase].split(''); 
}


//Create an addPhraseToDisplay function that loops through an array of characters
function addPhraseToDisplay (phrases) {
    for (let i = 0; i < phrases.length; i++) {
        const phraseItems = document.querySelector('#phrase ul');
        const listItem = document.createElement('li');
        if (phrases[i] !== ' ') {
            listItem.classList.add('letter');
            listItem.textContent = phrases[i];
        } else {
            listItem.classList.add('space');
        }
        phraseItems.appendChild(listItem);
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 


//Creating a function for the letter that is clicked. If it matches the letters in the array, the letter will show up in their spot. 
function checkLetter (guess) {
    const letterChoice = document.querySelectorAll('.letter');
    let correctAnswer = null;
    for (let i = 0; i < letterChoice.length; i++) {
        if (letterChoice[i].textContent.toLowerCase() === guess.textContent.toLowerCase()) {
            letterChoice[i].classList.add ('show');
            correctAnswer = letterChoice[i].textContent;
        } 
    }
    return correctAnswer;
}

//Creating a function to check provide a "win" or "lose" phrase on the players screen once all the letters are guessed or life are spent.//
//const match to identify the length of letter.//
function checkWin() { 
    const match = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    if(match.length === show.length) {
        overlay.classList.add('win');
        startButton.textContent = "You guessed correctly, you win!";
        overlay.style.display = 'flex';
    } 

    if(missed > 4) {
        overlay.classList.add('lose'); 
        startButton.textContent = 'Sorry, please try again.';
        overlay.style.display = 'flex';
    }
} 

//Creating an eventListener to impacts the amount of lifes left in the game.
qwerty.addEventListener('click', (e) => { 
    const clickedButton = e.target;
    if (clickedButton.nodeName === 'BUTTON'){
        clickedButton.classList.add('chosen');
        clickedButton.disabled = 'true';
        let letterFound = checkLetter(clickedButton);
        if (letterFound === null) {
            hearts[missed].src = 'images/lostHeart.png';
            missed += 1;
        }
        
    }
    checkWin();
});


