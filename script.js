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
    { value: '.', type: 'number' },
    { value: '=', type: 'equals' },
    { value: '+', type: 'operator' },
];

const btnContainer = document.querySelector(".buttons")

buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn.value;
    button.setAttribute('data-value', btn.value);
    button.classList.add('btn', `btn-${btn.type}`);
    btnContainer.appendChild(button);
});


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
        return "Denom cannot be 0! (-_-)"
    else
        return a/b;
}

function operate(operator, val1, val2)
{
    let result = 0;
    switch(operator)
    {
        case "+":
            result = add(val1,val2);
            break;
        case "-":
            result = subtract(val1,val2);
            break;
        case "*":
            result = multiply(val1, val2);
            break;
        case "/":
            result = divide(val1, val2);
            break;
        default:
            alert("ERROR-SWITCH!");
    }
    return result;
}