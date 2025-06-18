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
}