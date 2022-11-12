const DEFAULT_DISPLAY = ''
let operands = [0,0]
let operators = []
const multiply = (num1, num2) => num1*num2
const add = (num1, num2) => num1 + num2
const substract = (num1, num2) => num1 - num2
const divide = (num1, num2) => num1 / num2
const operate = (operator, num1, num2) => {
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
function setupOperand () {
    let numberButtons = document.querySelectorAll('.operand')
    numberButtons.forEach(element => {
        element.addEventListener('click', (e) => {
            /*some code that actually handles calculation
                We already know that we're dealing with a operand, and we need to store the value of the first number (which may be an arbitrary size, the second number, and then calculate the result)
                So we use a array, and check if we have a operator to see if we need to switch arrays
            */
           let value = parseInt(e.target.textContent)
           console.log(value)
           if (operators.length === 0) {
            operands[0] += value
           } else {
            operands[1] += value
           }
           console.log(operands)
        })

    });
}
function setupOperator () {
    let operatorButtons = document.querySelectorAll('.operator')
    operatorButtons.forEach(element => {
        element.addEventListener('click', (e) => {
            let value = e.target.textContent
            if (operators.length === 0) {
                operators[0] = value
                console.log(operators)
            } else {
                operate(operators[0], operands[0], operands[1])
            }
        })
    })
}
const clear = () => {
    let display = document.querySelector('.display')
    display.textContent = DEFAULT_DISPLAY
}
function displayResult(result) {
    console.log(result)
}
setupOperand()
setupOperator()