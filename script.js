const DEFAULT_DISPLAY = ''
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
        case '*':
            displayResult(substract(num1, num2))
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
    let operand = document.querySelectorAll('.operand')
    for (let i = 0; i < operand.length; i++)
        operand[i].addEventListener('onclick', () => {
            //some code that actually handles calculation
        })
}
const clear = () => {
    let display = document.querySelector('.display')
    display.textContent = DEFAULT_DISPLAY
}