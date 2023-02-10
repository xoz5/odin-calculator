const displayText = document.getElementById('display-text');
const displayTextValues = document.querySelectorAll('.display-this');
const backspace = document.getElementById('backspace');
backspace.addEventListener('click', deleteText)
displayTextValues.forEach(value => value.addEventListener('click', displayValue));


function deleteText() {
    displayText.textContent = displayText.textContent.slice(0, -1);
}

function displayValue(value) {
    displayText.textContent += value.target.textContent;
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
    switch(operator) {
        case '-':
            return subtract(number1, number2);
        case '*':
            return multiply(number1, number2);
        case '/':
            return divide(number1, number2);
        case '+':
            return add(number1, number2);
    }
}