const board = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
let moves = 0;

// Cartas do jogo (pares)
const cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const deck = [...cards, ...cards];

// Embaralha as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Gera o tabuleiro
function generateBoard() {
    const shuffledDeck = shuffle(deck);
    shuffledDeck.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        board.appendChild(card);
    });
}

// Lógica do jogo
let firstCard, secondCard;
let lockBoard = false;

function handleCardClick(e) {
    const clickedCard = e.target;

    if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains('matched')) return;

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.symbol;

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
    moves++;
    movesCounter.textContent = moves;
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetTurn();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.classList.remove('flipped');
        secondCard.textContent = '';
        resetTurn();
    }, 700);
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Inicializa o jogo
generateBoard();
board.addEventListener('click', handleCardClick);
