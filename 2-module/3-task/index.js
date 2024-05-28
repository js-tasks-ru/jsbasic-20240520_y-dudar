// не совсем понял как я это сделал)

let calculator = {

  read(a, b) {
    this.a = a;
    this.b = b;
  },

  sum() {
    return this.a + this.b;
  },
  
  mul() {
    return this.a * this.b;
  }
};

// function read(a, b) {
//   this.a = a;
//   this.b = b;
// }

// function sum() {
//   return this.a + this.b;
// }

// function mul() {
//   return this.a * this.b;
// }
calculator.read(1, 1);

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
