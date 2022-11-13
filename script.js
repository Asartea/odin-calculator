// Constants //

const DEFAULT_DISPLAY = ''
const primaryDisplay = document.querySelector(".primary-display")
const secondaryDisplay = document.querySelector(".secondary-display")
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

// Keyboard handling
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        addNumber(e.key)
        return
    }
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === 'x') {
        addOperation(e.key)
        return
    }
    if (e.key === '.') {
        addPoint()
        return
    }
    if (e.key === '=' || e.key === 'Enter') {
        evaluate()
        return
    }
    if (e.key === 'Backspace') {
        deleteLast()
        return
    }
    if (e.key === 'Delete' || e.key === 'Esc') {
        reset()
        return
    }
    if (e.key === '*') {
        addOperation('x')
    }
    e.preventDefault()
})
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
    primaryDisplay.textContent = ''
    secondaryDisplay.textContent = `${firstOperand} ${currentOperation}`
}

/* Deletion functions */

function deleteLast() {
    primaryDisplay.textContent = primaryDisplay.textContent
        .toString()
        .slice(0, -1)
}
function reset() {
    primaryDisplay.textContent = ''
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
    } else if (currentOperation === "/" && primaryDisplay.textContent === '0') {
        console.error('Attempted division by 0')
        alert("You can't divide by zero")
        return
    }
    secondOperand = primaryDisplay.textContent
    primaryDisplay.textContent = operate(currentOperation, firstOperand, secondOperand)
    secondaryDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
    currentOperation = null
}
const operate = (operator, num1, num2) => {
    num1 = Number(num1)
    num2 = Number(num2)
    switch (operator) {
        case '+':
            return round(add(num1, num2))
            break
        case '-':
            return round(substract(num1, num2))
            break;
        case 'x':
            return round(multiply(num1, num2))
            break;
        case '/':
            return round(divide(num1, num2))
            break;
        default:
            console.error(`Operator not recognised. The current value of operand is: ${operator}`)
            break;

    }
}