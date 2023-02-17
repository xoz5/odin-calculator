// Declare variables
const displayText = document.getElementById('display-text');
const displayTextButtons = document.querySelectorAll('.display-this');
const backspaceButton = document.getElementById('backspace');
const clearButton = document.getElementById('clear');
let displayTextContent = displayText.textContent;

// Initialize objects
const operators = {
  '-': subtract,
  '*': multiply,
  '/': divide,
  '+': add,
};

// Add event listeners
backspaceButton.addEventListener('click', deleteText);
displayTextButtons.forEach(button => button.addEventListener('click', displayValue));
clearButton.addEventListener('click', clearText);


// Functions
function deleteText() {
  displayTextContent = displayTextContent.slice(0, -1) || '0';
  updateDisplayText();
}

function clearText() {
  displayTextContent = '0';
  updateDisplayText();
}

function displayValue(event) {
  const input = event.target.textContent;
  const numbers = displayTextContent.split(/[÷x\-+]/);
  const lastNumber = numbers[numbers.length - 1];
  const firstCharOfLastNumber = lastNumber[0];
  const secondCharOfLastNumber = lastNumber[1];

  const isSymbol = /[-+÷x]/;
  const isDigit = /\d/;

  if (input.match(isDigit)) {
    if (firstCharOfLastNumber === '0' && secondCharOfLastNumber !== '.') {
      displayTextContent = `${displayTextContent.slice(0, -1)}${input}`;
    } else {
      displayTextContent += input;
    }
  } else if (lastNumber === "" && input.match(isSymbol)) {
    displayTextContent = `${displayTextContent.slice(0, -1)}${input}`;
  } else if (lastNumber.includes('.') && input === '.') {
    return;
  } else {
    displayTextContent += input;
  }
  updateDisplayText();
}

function updateDisplayText() {
  displayText.textContent = displayTextContent;
}

function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

function operate(operator, number1, number2) {
  return operators[operator](number1, number2);
}