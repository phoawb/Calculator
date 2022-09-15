const add = (x, y) => x + y;

const subract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => {
  if (y === 0) return null;
  return x / y;
};

const OPERATION_OBJ = {
  '+': add,
  '-': subract,
  '*': multiply,
  '/': divide,
};

const operate = (operation, x, y) => {
  return OPERATION_OBJ[operation](x, y);
};
