console.log("Welcome to the Tic Tac Toe");
let move = new Audio('move-opponent.mp3');
let gameoverSound = new Audio('notify.mp3');
let on = new Audio('castle.mp3');
let turn = 'X'; // X always starts first
let gameover = false; // Added gameover as a boolean

// To change turn
const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X';
}

// Check if a player wins
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].textContent === boxtext[e[1]].textContent) &&
            (boxtext[e[2]].textContent === boxtext[e[1]].textContent) &&
            (boxtext[e[0]].textContent !== "")) {
            document.querySelector('.info').innerText = "Player " + boxtext[e[0]].textContent + " wins!";
            gameoverSound.play();
            gameover = true; // Set gameover to true when someone wins
        }
    });
}

// Check if it's a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let isFull = true;
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].textContent === '') {
            isFull = false; // If any box is empty, it's not a draw
            break;
        }
    }
    if (isFull && !gameover) { // Only trigger draw if no one has won
        document.querySelector('.info').innerText = "It's a draw!";
        gameoverSound.play();
        gameover = true; // Set gameover to true when the game ends in a draw
    }
}

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', (e) => {
        if (boxtext.innerText === '' && !gameover) {  // Check for empty box and if game isn't over
            boxtext.innerText = turn;
            move.play();
            checkWin();  // Call the win checker
            checkDraw(); // Call the draw checker
            if (!gameover) {
                turn = changeTurn(); // Change the turn after a valid move
                document.querySelector('.turn').innerText = "Turn for " + turn; // Update turn info
            }
                document.querySelector('.turn').innerText = ""; // Clear the turn message if game over
        }
    });
});

// Reset the game
let reset = document.getElementById('reset');
reset.addEventListener('click', (e) => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(box => {
        box.innerText = ''; // Clear all boxes
    });
    turn = 'X'; // Reset the turn to 'X'
    gameover = false; // Reset the gameover status
    document.querySelector('.info').innerText = ""; // Clear the win/draw message
    document.querySelector('.turn').innerText = "Turn for " + turn; // Reset the turn display
});
