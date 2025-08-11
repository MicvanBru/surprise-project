const CORRECT_CODE = '123456';
const MAX_ATTEMPTS = 6;
const CODE_LENGTH = 6;

let currentRow = 0;
let currentTile = 0;
let currentGuess = [];
let gameOver = false;
let keyStates = {};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('authenticated') === 'true') {
        if (localStorage.getItem('intro_completed') === 'true') {
            window.location.href = 'builder.html';
        } else {
            window.location.href = 'intro.html';
        }
        return;
    }
    
    initBoard();
    initKeyboard();
    initModal();
    setupEventListeners();
});

function initBoard() {
    const board = document.getElementById('game-board');
    
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const row = document.createElement('div');
        row.className = 'game-row';
        row.setAttribute('data-row', i);
        
        for (let j = 0; j < CODE_LENGTH; j++) {
            const tile = document.createElement('div');
            tile.className = 'game-tile';
            tile.setAttribute('data-row', i);
            tile.setAttribute('data-col', j);
            row.appendChild(tile);
        }
        
        board.appendChild(row);
    }
}

function initKeyboard() {
    const keys = document.querySelectorAll('.key');
    
    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (gameOver) return;
            
            const keyValue = key.getAttribute('data-key');
            handleKeyPress(keyValue);
        });
    });
}

function initModal() {
    const helpBtn = document.getElementById('help-btn');
    const modal = document.getElementById('instructions-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    helpBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
        if (gameOver) return;
        
        if (e.key >= '0' && e.key <= '9') {
            handleKeyPress(e.key);
        } else if (e.key === 'Backspace') {
            handleKeyPress('Backspace');
        } else if (e.key === 'Enter') {
            handleKeyPress('Enter');
        }
    });
    
    const startBuildingBtn = document.getElementById('start-building-btn');
    startBuildingBtn.addEventListener('click', () => {
        window.location.href = 'intro.html';
    });
}

function handleKeyPress(key) {
    if (key === 'Backspace') {
        deleteLetter();
    } else if (key === 'Enter') {
        checkGuess();
    } else if (key >= '0' && key <= '9') {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (currentTile < CODE_LENGTH && currentRow < MAX_ATTEMPTS) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${currentTile}"]`);
        tile.textContent = letter;
        tile.classList.add('filled');
        currentGuess.push(letter);
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${currentTile}"]`);
        tile.textContent = '';
        tile.classList.remove('filled');
        currentGuess.pop();
    }
}

function checkGuess() {
    if (currentGuess.length !== CODE_LENGTH) {
        shakeRow();
        return;
    }
    
    const guess = currentGuess.join('');
    const result = evaluateGuess(guess);
    
    revealResult(result);
    updateKeyboard(result);
    
    if (guess === CORRECT_CODE) {
        gameOver = true;
        showSuccess();
    } else {
        currentRow++;
        currentTile = 0;
        currentGuess = [];
        
        if (currentRow >= MAX_ATTEMPTS) {
            gameOver = true;
            showGameOver();
        } else if (currentRow === 2) {
            showHint();
        }
    }
}

function evaluateGuess(guess) {
    const result = [];
    const codeArray = CORRECT_CODE.split('');
    const guessArray = guess.split('');
    const used = new Array(CODE_LENGTH).fill(false);
    
    for (let i = 0; i < CODE_LENGTH; i++) {
        if (guessArray[i] === codeArray[i]) {
            result[i] = 'correct';
            used[i] = true;
        } else {
            result[i] = null;
        }
    }
    
    for (let i = 0; i < CODE_LENGTH; i++) {
        if (result[i] === null) {
            let found = false;
            for (let j = 0; j < CODE_LENGTH; j++) {
                if (!used[j] && guessArray[i] === codeArray[j]) {
                    result[i] = 'present';
                    used[j] = true;
                    found = true;
                    break;
                }
            }
            if (!found) {
                result[i] = 'absent';
            }
        }
    }
    
    return result.map((state, index) => ({
        letter: guessArray[index],
        state: state
    }));
}

function revealResult(result) {
    const row = document.querySelector(`[data-row="${currentRow}"]`);
    const tiles = row.querySelectorAll('.game-tile');
    
    result.forEach((res, index) => {
        setTimeout(() => {
            tiles[index].classList.add('reveal');
            setTimeout(() => {
                tiles[index].classList.add(res.state);
            }, 250);
        }, index * 100);
    });
}

function updateKeyboard(result) {
    result.forEach(res => {
        const key = document.querySelector(`[data-key="${res.letter}"]`);
        if (!key) return;
        
        const currentState = keyStates[res.letter];
        
        if (!currentState || 
            (currentState === 'absent' && res.state !== 'absent') ||
            (currentState === 'present' && res.state === 'correct')) {
            keyStates[res.letter] = res.state;
            
            key.classList.remove('correct', 'present', 'absent');
            key.classList.add(res.state);
        }
    });
}

function shakeRow() {
    const tiles = document.querySelectorAll(`[data-row="${currentRow}"] .game-tile`);
    tiles.forEach(tile => {
        tile.classList.add('shake');
        setTimeout(() => {
            tile.classList.remove('shake');
        }, 500);
    });
}

function showToast(message, type = 'hint') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Remove all type classes
    toast.classList.remove('error', 'success', 'hint');
    
    // Add the appropriate type class
    if (type === 'error') {
        toast.classList.add('error');
    } else if (type === 'success') {
        toast.classList.add('success');
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function showHint() {
    showToast('💡 Hint: Try a relevant date for us (MMDDYY)', 'hint');
}

function showSuccess() {
    const tiles = document.querySelectorAll(`[data-row="${currentRow}"] .game-tile`);
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('bounce');
        }, index * 100);
    });
    
    localStorage.setItem('authenticated', 'true');
    
    setTimeout(() => {
        // Hide keyboard and show the start building button
        const keyboard = document.getElementById('keyboard');
        const startBuildingBtn = document.getElementById('start-building-btn');
        
        keyboard.style.display = 'none';
        startBuildingBtn.style.display = 'inline-flex';
    }, 1000);
    
    confetti();
}

function showGameOver() {
    showToast(`Game Over! The code was ${CORRECT_CODE}. Refresh to try again.`, 'error');
}

function confetti() {
    const colors = ['#00B2CA', '#90EE90', '#9B59B6', '#F1C40F', '#E74C3C'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = -20 + 'px';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.transition = `all ${Math.random() * 3 + 2}s ease-out`;
        confetti.style.zIndex = '10000';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '100%';
            confetti.style.transform = `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 200 - 100}px)`;
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}