// не совсем понял как я это сделал)

let calculator = {
  read: read,
  sum: sum,
  mul: mul,
};

function read(a, b) {
  calculator.a = a;
  calculator.b = b;
}

function sum() {
  return this.a + this.b;
}

function mul() {
  return this.a * this.b;
}

calculator.read(3, 5);
calculator.sum();
calculator.mul();

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
