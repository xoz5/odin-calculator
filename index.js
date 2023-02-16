const displayText = document.getElementById('display-text');
const displayTextButtons = document.querySelectorAll('.display-this');
const backspaceButton = document.getElementById('backspace');

backspaceButton.addEventListener('click', deleteText);
displayTextButtons.forEach(button => button.addEventListener('click', displayValue));

function deleteText() {
  displayText.textContent = displayText.textContent.slice(0, -1) || '0';
}

function displayValue(event) {
  const input = event.target.textContent;
  const numbers = displayText.textContent.split(/[÷x\-+]/);
  const lastNumber = numbers[numbers.length - 1];
  const firstCharOfLastNumber = lastNumber[0];
  const secondCharOfLastNumber = lastNumber[1];

  const isSymbol = /[-+÷x]/;
  const isDigit = /\d/;

  if (input.match(isDigit)) {
    if (firstCharOfLastNumber === '0' && secondCharOfLastNumber !== '.') {
      return displayText.textContent = `${numbers.slice(0, -1)}${input}`;
    } else {
      return displayText.textContent += input;
    }
  } else if (lastNumber === "" && input.match(isSymbol)) {
    return displayText.textContent = `${displayText.textContent.slice(0, -1)}${input}`;
  } else if (lastNumber.includes('.') && input === '.') {
    return;
  } else {
    return displayText.textContent += input;
  }
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