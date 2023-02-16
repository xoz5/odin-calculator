const displayText = document.getElementById('display-text');
const displayTextButtons = document.querySelectorAll('.display-this');
const backspaceButton = document.getElementById('backspace');

backspaceButton.addEventListener('click', deleteText);
displayTextButtons.forEach(button => button.addEventListener('click', displayValue));

function deleteText() {
  displayText.textContent = displayText.textContent.slice(0, -1) || '0';
}

function displayValue(value) {
    displayText.textContent += value.target.textContent;
}

const operators = {
  '-': subtract,
  '*': multiply,
  '/': divide,
  '+': add,
};

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