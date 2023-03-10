// Declare variables
const displayText = document.getElementById('display-text');
const displayTextAnswer = document.getElementById('display-text-answer');
const displayTextButtons = document.querySelectorAll('.display-this');
const backspaceButton = document.getElementById('backspace');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
let displayTextContent = displayText.textContent;
let answerOnDisplay = false;
let answerOnDisplayLength = 0;

// Initialize objects
const operators = {
  '-': subtract,
  'x': multiply,
  '÷': divide,
  '+': add,
};

// Add event listeners
backspaceButton.addEventListener('click', deleteText);
displayTextButtons.forEach(button => button.addEventListener('click', displayValue));
clearButton.addEventListener('click', clearText);
equalsButton.addEventListener('click', operate);
document.addEventListener('keydown', displayKeyboardValue);


// Functions
function deleteText() {
  if (answerOnDisplayLength === displayTextContent.length) {
    updateDisplayTextLength();
    clearText();
  } else {
      displayTextContent = displayTextContent.slice(0, -1) || '0';
  }
  updateDisplayText();
}

function displayKeyboardValue(event) {
  // Declare button variables
  const backspace = document.getElementById('backspace');
  const divide = document.getElementById('divide');
  const multiply = document.getElementById('multiply');
  const plus = document.getElementById('plus');
  const subtract = document.getElementById('subtract');
  const equals = document.getElementById('equals');
  const dot = document.getElementById('dot');
  const zero = document.getElementById('zero');
  const one = document.getElementById('one');
  const two = document.getElementById('two');
  const three = document.getElementById('three');
  const four = document.getElementById('four');
  const five = document.getElementById('five');
  const six = document.getElementById('six');
  const seven = document.getElementById('seven');
  const eight = document.getElementById('eight');
  const nine = document.getElementById('nine');

  switch(event.key) {
    case '0':
      zero.click();
      break;
    case '1':
      one.click();
      break;
    case '2':
      two.click();
      break;
    case '3':
      three.click();
      break;
    case '4':
      four.click();
      break;
    case '5':
      five.click();
      break;
    case '6':
      six.click();
      break;
    case '7':
      seven.click();
      break;
    case '8':
      eight.click();
      break;
    case '9':
      nine.click();
      break;
    case 'x':
    case 'X':
      multiply.click();
      break;
    case '/':
      divide.click();
      break;
    case '+':
      plus.click();
      break;
    case '-':
      subtract.click();
      break;
    case 'Backspace':
      backspace.click();
      break;
    case '.':
      dot.click();
      break;
    case '=':
    case 'Enter':
      equals.click();
      break;
  }
}

function updateDisplayTextLength() {
  answerOnDisplayLength = 0;
}

function clearText() {
  displayTextContent = '0';
  answerOnDisplay = false;
  updateDisplayText();
  updateDisplayTextAnswer();
}

function displayValue(event) {
  const input = event.target.textContent;
  const isSymbol = /[-+÷x]/;
  const isDigit = /\d/;

  yesOrNoClearText(input, isSymbol);

  const numbers = displayTextContent.split(/[÷x\-+]/);
  const lastNumber = numbers[numbers.length - 1];
  const firstCharOfLastNumber = lastNumber[0];
  const secondCharOfLastNumber = lastNumber[1];

  if (input.match(isDigit)) {
    if (firstCharOfLastNumber === '0' && secondCharOfLastNumber !== '.') {
      displayTextContent = `${displayTextContent.slice(0, -1)}${input}`;
    } else {
        displayTextContent += input;
    }
  } else if (displayTextContent === '0' && input === '-') {
      displayTextContent = `${displayTextContent.slice(0, -1)}${input}`;
  } else if (lastNumber === '' && input.match(isSymbol)) {
      displayTextContent = `${displayTextContent.slice(0, -1)}${input}`;
  } else if (lastNumber === '' && input === '.') {
      displayTextContent = `${displayTextContent}0${input}`;
  } else if (lastNumber.includes('.') && input === '.') {
      return;
  } else {
      displayTextContent += input;
  }
  updateDisplayText();
}

function yesOrNoClearText(input, isSymbol) {
  const isWordNotAndNotOperators = /^[a-wyzA-WYZ]+$/;

  if (displayTextContent.match(isWordNotAndNotOperators) ||
      answerOnDisplay && !(input.match(isSymbol))) {
        clearText();
  }

  answerOnDisplay = false;
}

function updateDisplayText() {
  displayText.textContent = displayTextContent;
}

function updateDisplayTextAnswer() {
  displayTextAnswer.textContent = `Ans = ${displayTextContent}`
}

function add(number1, number2) {
  return +number1 + +number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return (number2 == 0 ? 'Undefined' : number1 / number2);
}

function operate() {
  const numbers = displayTextContent.split(/[÷x\-+]/);
  const symbols = displayTextContent.match(/[÷x\-+]/g);
  if (displayTextContent.includes('e')) {
    numbers[0] = `${numbers[0]}+${numbers.splice(1, 1)}`
    symbols.shift();
  }
  let mathSymbol;
  let symbolIndex;
  let mathAnswer;
  let number1;
  let number2;

  while (mathSymbol = symbols.find(char => char.match(/[÷x]/))) {
    symbolIndex = symbols.indexOf(mathSymbol);
    number1 = numbers.splice(symbolIndex, 1);
    number2 = numbers.splice(symbolIndex, 1);
    mathAnswer = operators[mathSymbol](number1, number2);
    numbers.splice(symbolIndex, 0, mathAnswer);
    symbols.splice(symbolIndex, 1);
  }

  while (mathSymbol = symbols.find(char => char.match(/[+-]/))) {
    symbolIndex = symbols.indexOf(mathSymbol);
    number1 = numbers.splice(symbolIndex, 1);
    number2 = numbers.splice(symbolIndex, 1);
    mathAnswer = operators[mathSymbol](number1, number2);
    numbers.splice(symbolIndex, 0, mathAnswer);
    symbols.splice(symbolIndex, 1);
  }

  displayTextContent = numbers.toString();
  updateDisplayText();
  answerOnDisplay = true;
  updateDisplayTextAnswer();
  answerOnDisplayLength = displayTextContent.length;
}