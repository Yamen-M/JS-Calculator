const display = document.querySelector(".display")

const buttons = [
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '/', type: 'operator' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '*', type: 'operator' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '-', type: 'operator' },
    { value: '0', type: 'number' },
    { value: '.', type: 'decimal' },
    { value: '=', type: 'equals' },
    { value: '+', type: 'operator' },
];

const allButtons = document.querySelector(".buttonsContainer")

const btnContainer = document.querySelector(".buttons")

buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn.value;
    button.setAttribute('data-value', btn.value);
    button.classList.add('btn', `btn-${btn.type}`);
    btnContainer.appendChild(button);
});
document.addEventListener('keydown', (event) => {
    btnClick(event.key);
})
allButtons.addEventListener('click', (event) => {
      if (event.target.classList.contains('btn')) {
        btnClick(event.target.dataset.value);
      }
});

let leftOperand = '';
let rightOperand = '';
let operator = '';
let evalPressed = false;
let errorState = false;

function isNumber(value){
    return typeof(value) === 'number' && !isNaN(value);
}
function setNumber(value) {
    display.style.fontSize = "2em";
    const maxDigits = 15;

    if (evalPressed) {
        if (operator === '') {
            leftOperand = value.toString();
            display.textContent = leftOperand;
        } else {
            rightOperand = value.toString();
            display.textContent = rightOperand;
        }
        evalPressed = false;
        return;
    }

    if (value === '.') {

        if (operator === '') {
            if (!leftOperand.includes('.')) {
                leftOperand += leftOperand === '' ? '0.' : value;
                display.textContent = leftOperand;
            }
        } else {
            if (!rightOperand.includes('.')) {
                rightOperand += rightOperand === '' ? '0.' : value;
                display.textContent = rightOperand;
            }
        }
    } 
    else {

        if (operator === '') {

            if (leftOperand.length < maxDigits) {
                leftOperand += value.toString();
                display.textContent = leftOperand;
            }
        } 
        else {

            if (rightOperand.length < maxDigits) {
                rightOperand += value.toString();
                display.textContent = rightOperand;
            }
        }
    }
}

function isOperator(value){
    return ['+', '-', '*', '/'].includes(value);;
}

function setOperator(value)
{
    if(operator !== ''){
        evaluate();
        operator = value;
    }
    else
        operator = value;    
    
    evalPressed = false;
}

function evaluate(){

    if (!operator || rightOperand === '') {
        evalPressed = true;
        return;
    }

    const result = operate(operator, leftOperand, rightOperand);    
    if (typeof result === 'string') {
        display.textContent = result;
        errorState = true;
        setTimeout(clearValues, 2000);
    } 
    else {
        leftOperand = result.toString();
        display.textContent = leftOperand;
    }
    rightOperand = '';
    operator = '';
    evalPressed = true;
}

function clearValues()
{    
    display.textContent = '0';
    display.style.fontSize = "2em";
    leftOperand = '';
    rightOperand = '';
    operator = '';
    evalPressed = false;
}

function deleteLastInput()
{
    if (rightOperand) {
        rightOperand = rightOperand.slice(0, -1);
        display.textContent = rightOperand || '0';
    } 
    else if (leftOperand) {
        leftOperand = leftOperand.slice(0, -1);
        display.textContent = leftOperand || '0';
    }
}

function btnClick(value)
{
    if(isNumber(parseInt(value)))
        setNumber(parseInt(value));
    else if(isOperator(value))
        setOperator(value);
    else if(value === '.')
        setNumber(value);
    else if(value === '=')
        evaluate();
    else if(value === 'AC')
        clearValues();
    else if(value === '⌫')
        deleteLastInput();
}

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a ,b)
{
    if(b === 0)
        return "Denom cannot be 0! (-_-)";
    else
        return a/b;
}
function operate(operator, val1, val2) {

    let a = parseFloat(val1);
    let b = parseFloat(val2);
    let result = 0;

    if (operator !== '' && val2 !== '') {

        switch (operator) {
            case '+':
                result = add(a, b);
                break;
            case '-':
                result = subtract(a, b);
                break;
            case '*':
                result = multiply(a, b);
                break;
            case '/':
                result = divide(a, b);
                break;
            default:
                alert("ERROR-SWITCH!");
        }
    }
    else {
        return val1;
    }

    if(result.toString().length > 15)
        display.style.fontSize = "1.5em";

    return result;
}
