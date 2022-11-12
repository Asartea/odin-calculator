// Constants //

const DEFAULT_DISPLAY = ''
const primaryDisplay = document.querySelector(".primary-display")
const numbers = document.querySelectorAll("[data-type=number]")
const operators = document.querySelectorAll("[data-type=operator]")
const equals = document.querySelector("#equals")
const point = document.querySelector('#point')
const clear = document.querySelector("[data-type=clear]")
const del = document.querySelector("[data-type=delete]")

// Other declarations //
let currentOperation = null
let firstOperand = ''
let secondOperand = ''
// event listeners //

equals.addEventListener('click', evaluate)
del.addEventListener('click', deleteLast)
clear.addEventListener('click', reset)
point.addEventListener('click', addPoint)

function setupNumbers() {
    numbers.forEach(button => {
        button.addEventListener('click', () => {
            addNumber(button.textContent)
        })
    });
}
function setupOperators() {
    operators.forEach(button => {
        button.addEventListener('click', () => {
            addOperation(button.textContent)
        })
    })
}
setupNumbers()
setupOperators()
/* Dom manipulation functions */

function addNumber(nummer) {
    primaryDisplay.textContent += nummer
}

function addPoint() {
    if (primaryDisplay.textContent === '') {
        primaryDisplay.textContent = "0"
    }
    if (primaryDisplay.textContent.includes('.')) {
        return
    }
    primaryDisplay.textContent += '.'
}

function addOperation(operation) {
    if (currentOperation !== null) {
        evaluate()
    }
    firstOperand = primaryDisplay.textContent
    currentOperation = operation
    primaryDisplay.textContent = 0
}

/* Deletion functions */

function deleteLast() {
    primaryDisplay.textContent = primaryDisplay.textContent
        .toString()
        .slice(0, -1)
}
function reset() {
    primaryDisplay.textContent = 0
    secondaryDisplay.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

/* Math functions */
const multiply = (num1, num2) => num1 * num2
const add = (num1, num2) => num1 + num2
const substract = (num1, num2) => num1 - num2
const divide = (num1, num2) => num1 / num2
function round(num) {
    return Math.round(num * 1000) / 1000
}

function evaluate() {
    if (currentOperation === null) {
        return
    } else if (currentOperation === "/" && primaryDisplay.textContent === 0) {
        console.error('Attempted division by 0')
        alert("You can't divide by zero")
        return
    }
    secondOperand = primaryDisplay.textContent
    primaryDisplay.textContent = round(operate(currentOperation, firstOperand, secondOperand))
}
const operate = (operator, num1, num2) => {
    num1 = Number(num1)
    num2 = Number(num2)
    switch (operator) {
        case '+':
            displayResult(add(num1, num2))
            break;
        case '-':
            displayResult(substract(num1, num2))
            break;
        case 'x':
            displayResult(multiply(num1, num2))
            break;
        case '/':
            displayResult(divide(num1, num2))
            break;
        default:
            console.error(`Operator not recognised. The current value of operand is: ${operator}`)
            break;

    }
}
function displayResult(result) {
    console.log(result)
}