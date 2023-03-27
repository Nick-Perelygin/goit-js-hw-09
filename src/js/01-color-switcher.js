function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
const startBtn = document.querySelector(`[data-start]`);
const stoptBtn = document.querySelector(`[data-stop]`);
const body = document.querySelector(`body`)
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {body.style.backgroundColor = getRandomHexColor()
}, 1000);
});

stoptBtn.addEventListener(`click`, () => {
     clearInterval(timerId);
})

