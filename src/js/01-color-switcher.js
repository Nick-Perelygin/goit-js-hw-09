function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener ('click', () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);
});

stopBtn.addEventListener ('click', () => {
    clearInterval(timerId);
});