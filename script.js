
let display = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let operator = null;

function updateDisplay() {
    let displayText;
    if (previousInput !== null && operator !== null) {
        displayText = previousInput.toString() + ' ' + operator + ' ' + (currentInput || '');
    } else {
        displayText = currentInput || '0';
    }
    display.textContent = displayText.trim();
}

function appendToDisplay(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
        return;
    }

    // Handle non-operator input (digits or decimal)
    if (value === '.') {
        if (currentInput.includes('.')) {
            return; // Already has decimal
        }
        if (currentInput === '' || currentInput === '0') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
    } else { // Digit
        if (currentInput === '0' || currentInput === '') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    updateDisplay();
}

function handleOperator(nextOperator) {
    if (currentInput !== '') {
        const inputValue = parseFloat(currentInput);
        if (previousInput === null) {
            previousInput = inputValue;
        } else if (operator !== null) {
            const result = performCalculation(previousInput, inputValue, operator);
            previousInput = result;
        }
        operator = nextOperator;
    } else {
        // Consecutive operators: replace the last one
        operator = nextOperator;
    }
    currentInput = '';
    updateDisplay();
}

function performCalculation(first, second, op) {
    switch (op) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return second !== 0 ? first / second : 0;
        default: return second;
    }
}

function calculate() {
    if (previousInput === null || operator === null || currentInput === '') {
        return;
    }
    let curr = parseFloat(currentInput);
    if (isNaN(curr)) {
        return;
    }
    let result;
    switch (operator) {
        case '+':
            result = previousInput + curr;
            break;
        case '-':
            result = previousInput - curr;
            break;
        case '*':
            result = previousInput * curr;
            break;
        case '/':
            if (curr === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = previousInput / curr;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    previousInput = null;
    operator = null;
    updateDisplay();
}
