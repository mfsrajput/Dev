"use strict";
const body = document.body;
// Create the calculator container
const calculatorContainer = document.createElement('div');
calculatorContainer.className = 'calculator-container';
// Create and configure the mode button
const modeButton = document.createElement('button');
modeButton.className = 'mode-button';
modeButton.innerText = 'Dark Mode';
modeButton.onclick = () => {
    body.classList.toggle('dark-mode');
    const modeButtonText = modeButton.innerText === 'Dark Mode' ? 'Light Mode' : 'Dark Mode';
    modeButton.innerText = modeButtonText;
    changeTheme(modeButtonText);
};
// Append the mode button to the calculator container
calculatorContainer.appendChild(modeButton);
// Create and configure the display
const display = document.createElement('div');
display.id = 'display';
display.innerHTML = `
  <span id="previous-input"></span>
  <span id="operator"></span>
  <span id="current-input">0</span>
`;
calculatorContainer.appendChild(display);
// Create and configure the calculator buttons
const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '%', 'C', '+',
    '=', '.', 'DEL'
];
buttons.forEach(value => {
    const button = document.createElement('button');
    button.className = 'button';
    button.setAttribute('data-value', value);
    button.innerText = value;
    // Make the '=' button span two columns
    if (value === '=') {
        button.classList.add('equals');
    }
    calculatorContainer.appendChild(button);
});
// Append the calculator container to the body
body.appendChild(calculatorContainer);
// Add CSS styles
const style = document.createElement('style');
style.textContent = `
  body {
    transition: background-color 0.3s ease;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .calculator-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 300px;
    margin: auto;
    gap: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  .mode-button {
    grid-column: span 4;
    margin-bottom: 10px;
    font-size: 1em;
    padding: 10px;
    cursor: pointer;
  }
  #display {
    grid-column: span 4;
    padding: 20px;
    font-size: 2em;
    text-align: right;
    border: 1px solid #ccc;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .button {
    padding: 20px;
    font-size: 1.5em;
    background: #e0e0e0;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }
  .button:hover {
    background: #d0d0d0;
  }
  .equals {
    grid-column: span 2;
  }
  .dark-mode {
    background-color: #333;
    color: #fff;
  }
  /* Light Mode */
  .light-mode .button {
    background: #d0d0d0;
    border: 1px solid #ccc;
    color: #000;
  }
  .light-mode .button:hover {
    background: #d0d0d0;
  }
  .light-mode #display {
    border: 1px solid #ccc;
    background: #ffffff;
    color: #000;
  }
  /* Dark Mode */
  .dark-mode .button {
    background: #444;
    border: 1px solid #666;
    color: #fff;
  }
  .dark-mode .button:hover {
    background: #333;
  }
  .dark-mode #display {
    border: 1px solid #666;
    background: #222;
    color: #fff;
  }
`;
document.head.appendChild(style);
// Calculator logic
let currentInput = '';
let previousInput = '';
let operator = '';
function updateDisplay() {
    const displayPreviousInput = document.getElementById("previous-input");
    const displayOperator = document.getElementById("operator");
    const displayCurrentInput = document.getElementById("current-input");
    displayPreviousInput.innerText = previousInput;
    displayOperator.innerText = operator;
    displayCurrentInput.innerText = currentInput || '0';
}
function handleButtonClick(event) {
    const button = event.target;
    const value = button.getAttribute('data-value');
    if (!value)
        return;
    switch (value) {
        case 'C':
            currentInput = '';
            previousInput = '';
            operator = '';
            break;
        case '=':
            if (previousInput && operator) {
                try {
                    currentInput = eval(`${previousInput} ${operator} ${currentInput}`).toString();
                }
                catch (error) {
                    currentInput = 'Error';
                }
                previousInput = '';
                operator = '';
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (currentInput) {
                if (previousInput && operator) {
                    try {
                        currentInput = eval(`${previousInput} ${operator} ${currentInput}`).toString();
                    }
                    catch (error) {
                        currentInput = 'Error';
                    }
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
            break;
        case '%':
            if (currentInput) {
                try {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                }
                catch (error) {
                    currentInput = 'Error';
                }
            }
            break;
        case '.':
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            break;
        case 'DEL':
            currentInput = currentInput.slice(0, -1);
            break;
        default:
            currentInput += value;
    }
    updateDisplay();
}
function changeTheme(theme) {
    const body = document.body;
    if (theme === 'Dark Mode') {
        body.classList.add('dark-mode');
    }
    else {
        body.classList.remove('dark-mode');
    }
}
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
