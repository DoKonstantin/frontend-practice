const btnStandard = document.querySelector('#btn_standard');
const btnHex = document.querySelector('#btn_hex');
const btnChange = document.querySelector('#btn_change');
const indicator = document.querySelector('.nav_indicator');
const container = document.querySelector('.container');
const colorText = document.querySelector('.color');
const copied = document.querySelector('.copied');

//Change color
const color = ['red', 'green', 'grey', 'yellow', 'brown', 'blue', 'orange', 'purple'];
const hexColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];



btnChange.addEventListener('click', throttle(generateColor, 500));

function generateColor() {
  if (currentMode === 'standard') {
    const randomIndex = Math.floor(Math.random() * color.length);
    
    applyColor(color[randomIndex]);
  
  } else if (currentMode === 'hex') {
    let hexColor = '#';

    for(let i = 0; i < 6; i++) {
      hexColor += hexColors[Math.floor(Math.random() * hexColors.length)];
    };

  applyColor(hexColor);
  }
}

// throttle

function throttle(callback, delay) {
  let lastCall = 0;

  return function(...args) {
    const now = Date.now();

    if(now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }

  }
}

// Animation

// mode cwitch
let currentMode = 'standard';

btnStandard.addEventListener('click', () => {
  currentMode = 'standard';

  btnStandard.classList.add('active');
  btnHex.classList.remove('active');
  indicator.style.transform = 'translateX(0%)';
});

btnHex.addEventListener('click', () => {
  currentMode = 'hex';

  btnHex.classList.add('active');
  btnStandard.classList.remove('active');
  indicator.style.transform = 'translateX(100%)';
})


function applyColor(newColor) {

  colorText.classList.add('fade');

  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
    colorText.textContent = newColor;
    colorText.classList.remove('fade');
  }, 300);
}



// Copy color

let isCoping = false;

colorText.addEventListener('click', async () => {
  if(isCoping) return;
  
  isCoping = true;

  try {
    await navigator.clipboard.writeText(colorText.textContent);
    showCopied();
  } catch (err) {
    console.log('Copy failed', err);
  }

  isCoping = false;
});

function showCopied() {
  copied.classList.add('show');

  setTimeout(() => {
    copied.classList.remove('show');
  }, 1000);
}


