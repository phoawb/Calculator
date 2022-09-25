const DISPLAY_VALUES = {
  value1: '',
  value2: '',
  operator: '',
};

//Global DOM elements
const NUMBER_BUTTONS = [...document.getElementsByClassName('number')];
const OPERATION_BUTTONS = [...document.getElementsByClassName('operation')];
const AC_BUTTON = document.getElementById('ac');
const C_BUTTON = document.getElementById('c');
const EQUAL_BUTTON = document.getElementById('equal');
const DOT_BUTTON = document.getElementById('dot');
const CALCULATION = document.getElementById('calculation');
if (!CALCULATION)
  throw new Error('Could not find calculation part of the display!');
const ANSWER = document.getElementById('answer');
if (!ANSWER) throw new Error('Could not find answer part of the dispay!');
const CALCULATOR_DISPLAY = document.querySelector('.calculator-display');
if (!CALCULATOR_DISPLAY) throw new Error('Could not find calculator display!');

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => {
  if (y === 0) return 'Dividing by zero? Cringe!';
  return x / y;
};

const modulo = (x, y) => {
  if (y === 0) return 'L + Ratio + Illegal operation';
  return x % y;
};

const OPERATION_OBJ = {
  '+': add,
  '-': subtract,
  x: multiply,
  '/': divide,
  '%': modulo,
};

const operate = (operator, x, y) => {
  console.log(operator);
  return OPERATION_OBJ[operator](parseFloat(x), parseFloat(y));
};

const setCalculation = () =>
  (CALCULATION.textContent = `${DISPLAY_VALUES.value1} ${DISPLAY_VALUES.operator} ${DISPLAY_VALUES.value2}`);

const setAnswer = (ans) => (ANSWER.textContent = `${ans}`);

const isCompleteDisplay = () =>
  DISPLAY_VALUES.value1 && DISPLAY_VALUES.operator && DISPLAY_VALUES.value2
    ? true
    : false;

// Event listeners
NUMBER_BUTTONS.forEach((n) => {
  n.addEventListener('click', () => {
    const value = DISPLAY_VALUES.operator ? 'value2' : 'value1';
    DISPLAY_VALUES[value] += n.textContent;
    setCalculation();
  });
});

OPERATION_BUTTONS.forEach((o) => {
  o.addEventListener('click', () => {
    if (!DISPLAY_VALUES.value1) return;
    if (isCompleteDisplay()) {
      evaluate();
      DISPLAY_VALUES.value1 = ANSWER.innerText;
    }
    if (!parseInt(DISPLAY_VALUES.value1)) {
      clearScreen();
      return;
    }
    DISPLAY_VALUES.operator = o.textContent;
    setCalculation();
  });
});

const clearScreen = () => {
  DISPLAY_VALUES.value1 = '';
  DISPLAY_VALUES.value2 = '';
  DISPLAY_VALUES.operator = '';
  setCalculation();
};

AC_BUTTON.addEventListener('click', () => {
  clearScreen();
  setAnswer('');
});

C_BUTTON.addEventListener('click', () => {
  if (!DISPLAY_VALUES.operator) {
    if (DISPLAY_VALUES.value1) {
      DISPLAY_VALUES.value1 = DISPLAY_VALUES.value1.slice(0, -1);
    }
  } else if (!DISPLAY_VALUES.value2) DISPLAY_VALUES.operator = '';
  else {
    DISPLAY_VALUES.value2 = DISPLAY_VALUES.value2.slice(0, -1);
  }
  setCalculation();
});

DOT_BUTTON.addEventListener('click', () => {
  const value = DISPLAY_VALUES.operator ? 'value2' : 'value1';
  if (!DISPLAY_VALUES[value].includes('.')) DISPLAY_VALUES[value] += '.';
  setCalculation();
});

const evaluate = () => {
  setAnswer(
    operate(
      DISPLAY_VALUES.operator,
      DISPLAY_VALUES.value1,
      DISPLAY_VALUES.value2
    )
  );
  clearScreen();
};

EQUAL_BUTTON.addEventListener('click', () => {
  if (!isCompleteDisplay()) return;
  evaluate();
});
