const DISPLAY_VALUES = {
  value1: '',
  value2: '',
  operator: '',
};

//Global DOM elements
const NUMBER_BUTTONS = [...document.getElementsByClassName('number')];
const CALCULATOR_DISPLAY = document.querySelector('.calculator-display');
if (!CALCULATOR_DISPLAY) throw new Error('Could not find calculator display!');

const add = (x, y) => x + y;

const subract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => {
  if (y === 0) return 'Dividing by zero? Cringe!';
  return x / y;
};

const modulo = (x, y) => x % y;

const OPERATION_OBJ = {
  '+': add,
  '-': subract,
  '*': multiply,
  '/': divide,
  '%': modulo,
};

const operate = (operation, x, y) => {
  return OPERATION_OBJ[operation](x, y);
};

const numberClick = (e) => {
  if (!DISPLAY_VALUES.operator) {
    DISPLAY_VALUES.value1 += e.target.value;
  }
};

// Event listeners
NUMBER_BUTTONS.forEach((n) => {
  n.addEventListener('click', (e) => {
    let value = DISPLAY_VALUES.operator ? 'value2' : 'value1';
    DISPLAY_VALUES[value] += n.textContent;
    console.log('display value is: ', DISPLAY_VALUES[value]);
    CALCULATOR_DISPLAY.textContent = `${DISPLAY_VALUES.value1} ${DISPLAY_VALUES.operator} ${DISPLAY_VALUES.value2}`;
    console.log('does this register?');
  });
});
