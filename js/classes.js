class Rabbit {
    constructor(name) {this.name = name;}
}
class Rabbit1 extends Object {
    constructor(name) {
        super();
        this.name = name;
    }
}
let rabbit = new Rabbit("Rabbit");
let rabbit1 = new Rabbit1("Кроль");
console.log(rabbit.hasOwnProperty('name')); // true
console.log(rabbit1.hasOwnProperty('name')); // true
// без super() - ошибка - Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
console.log(rabbit); // Rabbit {name: 'Rabbit'}
console.log(rabbit1); // Rabbit1 {name: 'Кроль'}
console.log(Rabbit.__proto__ === Object); // false
console.log(Rabbit.__proto__ === Function.prototype); // true
console.log(Rabbit.__proto__); // ƒ () { [native code] }
console.log(Rabbit1.__proto__ === Object); // true
console.log(Rabbit1.__proto__ === Function.prototype); // false
console.log(Rabbit1.__proto__); // ƒ Object() { [native code] }
