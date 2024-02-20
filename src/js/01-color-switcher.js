function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const background = document.body;
let timerId = null;

startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    background.style.backgroundColor = color;
    startButton.disabled = true;
  }, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  startButton.disabled = false;
});
