const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randHole(holes);
    }

    lastHole = hole;
    return hole;
}

function peek() {
    const time = randTime(200, 1000);
    const hole = randHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peek();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peek();
    setTimeout(() => (timeUp = true), 10000);
}

function bonk(event) {
    if (!event.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', bonk));
