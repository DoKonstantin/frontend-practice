const passwordArea = document.getElementById('password');
const copyBtn = document.getElementById('copy_pass');
const generate = document.getElementById('generate');
const slider = document.getElementById('slider');
const lengthValue = document.getElementById('length-value');

const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');


// changing the slider value

slider.addEventListener('input', () => {
  lengthValue.textContent = slider.value;
});

// generate password

const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+';

function generatePassword() {
  let chars = '';
  let guaranteed = [];

  if(upper.checked) {
    chars += upperChars;
    guaranteed.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
  };

  if (lower.checked) {
    chars += lowerChars;
    guaranteed.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);

  };

  if (numbers.checked) {
    chars += numberChars;
    guaranteed.push(numberChars[Math.floor(Math.random() * numberChars.length)]);

  };

  if (symbols.checked) {
    chars += symbolChars;
    guaranteed.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);

  };

  if(!chars) return 'ERROR';


  let result = [...guaranteed];

  for(let i = result.length; i < Number(slider.value); i++) {
    result.push(chars[Math.floor(Math.random() * chars.length)]);
  };

  return shuffle(result).join('');
}

function shuffle(array) {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


generate.addEventListener('click', () => {
  const password = generatePassword();

  passwordArea.value = password;

  if(password !== 'ERROR') {
    updateStrength(password);
  }
});



// Copy

copyBtn.addEventListener('click', async () => {
  const password = passwordArea.value;

  if(!password || password === 'ERROR') return;

  try {
    await navigator.clipboard.writeText(password);

    copyBtn.textContent = 'Copied!!!';
    copyBtn.classList.add('copied');

  } catch (err) {
    console.log('Copy failed', err);
  }

  setTimeout(() => {
    copyBtn.textContent = 'Copy';
    copyBtn.classList.remove('copied');
  }, 1200)
});

// checking password complexity

function updateStrength(password) {
  const strengthFill = document.getElementById('strength-fill');

  let strength = 0;

  if(password.length >= 8) strength++;
  if(/[A-Z]/.test(password)) strength++;
  if(/[0-9]/.test(password)) strength++;
  if(/[^A-Za-z0-9]/.test(password)) strength++;

  if(strength === 1) {
    strengthFill.style.width = '25%';
    strengthFill.style.background = 'red';
  }
  if(strength === 2) {
    strengthFill.style.width = '50%';
    strengthFill.style.background = 'orange';
  }
  if(strength === 3) {
    strengthFill.style.width = '75%';
    strengthFill.style.background = 'yellowgreen';
  }
  if(strength === 4) {
    strengthFill.style.width = '100%';
    strengthFill.style.background = 'green';
  }

}