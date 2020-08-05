const calculator = {
    displayValue: "0",
    operand: null,
    waitingForSecond: false,
    operator: null
};

let currentOperator = null;

function updateDisplay() : void {
    const screen = <HTMLTextAreaElement>document.querySelector(".calculator-screen");
    screen.value = calculator.displayValue;
}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event : Event) => {
    const target = <HTMLInputElement>event.target;

    if (!target.matches("button")) {
        return;
    }

    if (target.classList.contains('operator')) {
        inputOperator(target.value);
        target.style.boxShadow="2px 3px 7px black"
        currentOperator = target;
        //target.classList.add('operator-clicked');
        return;
    } else if (target.classList.contains('equal-sign')) {
        equals();
        return;
    } else if (target.classList.contains('all-clear')) {
        clearAll();
        return;
    } else if (target.classList.contains('decimal')) {
        inputDecimal();
        return;
    }

    inputDigit(target.value);
});

function inputDigit(digit: string) : void {
    if (calculator.waitingForSecond) {
        calculator.waitingForSecond = false;
    }
    if (calculator.displayValue == "0") {
        calculator.displayValue = digit;
    } else {
        calculator.displayValue += digit;
    }
    updateDisplay();
}

function inputDecimal() : void {
    if (calculator.displayValue.match(/\./)) {
        return;
    }
    
    calculator.displayValue += '.';
    updateDisplay();
}

function clearAll() : void {
    calculator.displayValue = "0";
    calculator.operand = null;
    calculator.waitingForSecond = false;
    calculator.operator = null;
    if (currentOperator != null) {
        currentOperator.style.boxShadow = "";
    }
    updateDisplay();
}

function equals() : void {
    if (calculator.waitingForSecond) {
        return;
    }

    if (calculator.operand != null && calculator.operator != null) {
        currentOperator.style.boxShadow = "";
        let calcValue = 0;
        switch (calculator.operator) {
            case "+":
                calcValue = parseFloat(calculator.displayValue) + parseFloat(calculator.operand);
                calculator.displayValue = calcValue.toFixed(2).toString();
                break;
            case "-":
                calcValue = parseFloat(calculator.operand) - parseFloat(calculator.displayValue);
                calculator.displayValue = calcValue.toFixed(2).toString();
                break;
            case "*":
                calcValue = parseFloat(calculator.displayValue) * parseFloat(calculator.operand);
                calculator.displayValue = calcValue.toFixed(2).toString();
                break;
            case "/":
                calcValue = parseFloat(calculator.operand) / parseFloat(calculator.displayValue);
                calculator.displayValue = calcValue.toFixed(2).toString();
                break;
            default:
                calcValue = 0;
                break;
        }
    }
    updateDisplay();
}

function inputOperator(operator: string) : void {
    if (!calculator.waitingForSecond) {
        calculator.waitingForSecond = true;
        calculator.operator = operator;
        calculator.operand = calculator.displayValue;
        calculator.displayValue = "0";
        return;
    }
    return;

}