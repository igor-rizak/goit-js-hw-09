
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.body;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


buttonStart.addEventListener('click', onClickButtonStart);
  
function onClickButtonStart() {
  timerId = setInterval(() => {
    let color = getRandomHexColor();
    body.style.backgroundColor = color;
  }, 1000);
  buttonStart.setAttribute('disabled', 'disabled');
  buttonStop.removeAttribute('disabled');
}

buttonStop.addEventListener('click', onClickbuttonStop);

function onClickbuttonStop() {
  clearInterval(timerId);
  body.style.backgroundColor = 'white';
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', 'disabled');
  console.log(onClickbuttonStop);
}