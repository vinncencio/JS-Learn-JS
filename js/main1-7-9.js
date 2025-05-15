/* #1.7.1. Флаги и дескрипторы свойств */

user = {name: "John"};
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
// console.log(descriptor); // {value: 'John', writable: true, enumerable: true, configurable: true}

Object.defineProperty(user, "subname", {value: "Smith"});
descriptor = Object.getOwnPropertyDescriptor(user, 'subname');
// console.log(descriptor); // {value: 'Smith', writable: false, enumerable: false, configurable: false}

/* #1.7.2. Свойства-аксессоры - геттеры и сеттеры */
// 1: Геттер и сеттер для объекта.
user = {
    firstName: "Иван",
    lastName: "Иванов",
    get fullName() {return `${this.firstName} ${this.lastName}`},
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};
// console.log(user.fullName); // Иван Иванов
// user.fullName = "Петр Петров";
// console.log(user.firstName); // Петр
// console.log(user.lastName); // Петров

// 2: Валидация данных через сеттер.
const account = {
    _balance: 0, // Внутреннее свойство для хранения баланса
    get balance(){return this._balance},
    set balance(value){
        if (value < 0 || typeof value != "number") return console.log('error');
        this._balance += value;
    }
};
// account.balance = 100;
// console.log(account.balance); // 100
// account.balance = -50; // error
// console.log(account.balance); // 100
// account.balance = "не число"; // error
// console.log(account.balance); // 100
// account.balance = 100;
// console.log(account.balance); // 200

// 3: Вычисляемое свойство
// Создайте объект rectangle с свойствами width и height. Добавьте геттер area, который возвращает площадь прямоугольника (ширина * высота), и сеттер area, который принимает площадь и изменяет ширину и высоту так, чтобы площадь соответствовала переданному значению, сохраняя пропорции.
const rectangle = {
    width: 10,
    height: 5,
    _area : this.width * this.height,
    get area(){return this.width * this.height},
    set area(value){
        this._area = value;
        this.width = this._area / this.height;
        this.height = this._area / this.width;
    }
};
// console.log(rectangle.area); // 50
// rectangle.area = 100;
// console.log(rectangle.width); // 20
// console.log(rectangle.height); // 5

// 4: Защита данных через замыкание
// Создайте объект config, который хранит настройки. Используйте замыкание, чтобы сделать свойство apiKey доступным только через геттер и сеттер. Сеттер должен проверять, что новый ключ является строкой и имеет длину не менее 10 символов.
const config = (() => {
    let _apiKey = "defaultKey123";
    return {
        get apiKey() {return _apiKey},
        set apiKey(value) {
            if (typeof value === "string" && value.length >= 10) {
                _apiKey = value;
            } else {
                console.error("Ошибка: API-ключ должен быть строкой длиной не менее 10 символов.");
            }
        },
    };
})();
// console.log(config.apiKey); // defaultKey123
// config.apiKey = "newKey12345";
// console.log(config.apiKey); // newKey12345
// config.apiKey = "short"; // Должно вывести ошибку в консоль
// console.log(config.apiKey); // Должно остаться "newKey12345"

/* #1.8.1. Прототипное наследование */
// 2.1. С помощью свойства __proto__ задайте прототипы так, чтобы поиск любого свойства выполнялся по следующему пути: pockets → bed → table → head. Например, pockets.pen должно возвращать значение 3 (найденное в table), а bed.glasses – значение 1 (найденное в head).
let head = {glasses: 1};
let table = {pen: 3};
let bed = {sheet: 1, pillow: 2};
let pockets = {money: 2000};
// решение:
pockets.__proto__ = bed;
bed.__proto__ = table;
table.__proto__ = head;
// проверка:
// console.log(pockets.pen); // 3 (найденное в table)
// console.log(bed.glasses); // 1 (найденное в head)

// 3. Какой объект получит свойство full при вызове rabbit.eat(): animal или rabbit?
let animal = {eat() {this.full = true}};
let rabbit = {__proto__: animal};
rabbit.eat();
// console.log(rabbit.full); // ? true
// console.log(animal.full); // ? undefined

// 4. Почему наедаются оба хомяка?
let hamster = {
    stomach: [],
    eat(food) {this.stomach = [food]}
};
let speedy = {__proto__: hamster};
let lazy = {__proto__: hamster};
speedy.eat("apple"); // Этот хомяк нашёл еду
// console.log(speedy.stomach); // ['apple']
// console.log(lazy.stomach); // []

/* #1.8.3. Встроенные прототипы */
// 1. Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.
// Function.prototype.defer = function(ms){setTimeout(this, ms)}
// function f() {console.log("Hello!")};
// f.defer(1000); // выведет "Hello!" через 1 секунду

// 2. Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд.
// Function.prototype.defer = function(ms){
//     return (...args) => {
//         return setTimeout(this, ms, ...args);
//     }
// }
Function.prototype.defer = function (ms) {
    return (...args) => {
        setTimeout(() => {this(...args)}, ms);
    };
};
function f(a, b) {console.log(a + b)};
// f.defer(1000)(1, 2); // выведет 3 через 1 секунду.

/* #1.8.4. Методы прототипов, объекты без свойства __proto__ */
// 1. Добавьте toString в словарь
let dictionary = Object.create(null, {
    toString: { // определяем свойство toString
        value() { // значение -- это функция
            return Object.keys(this).join();
        }
    }
});
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ
// только apple и __proto__ выведены в цикле:
// for (let key in dictionary) {console.log(key)}; // "apple", затем "__proto__"
// метод toString в действии:
// alert(dictionary); // "apple,__proto__"

// 2. Все эти вызовы делают одно и тоже или нет?
// function Rabbit(name) {this.name = name}
// Rabbit.prototype.sayHi = function() {console.log(this.name)};
// rabbit = new Rabbit("Rabbit");

// rabbit.sayHi(); // Rabbit
// Rabbit.prototype.sayHi(); // undefined
// Object.getPrototypeOf(rabbit).sayHi(); // undefined
// rabbit.__proto__.sayHi(); // undefined
// console.log(rabbit);

/* #1.9.1. Класс: базовый синтаксис */
// 1. Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.
function Clock2({ template }) {
    let timer;
    function render() {
        let date = new Date();
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;
        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;
        let output = template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);
        console.log(output);
    }
    this.stop = function() {clearInterval(timer)};
    this.start = function() {
        render();
        timer = setInterval(render, 1000);
    };
}
// let clock2 = new Clock2({template: 'h:m:s'});
// clock2.start();

class Clock1 {
    constructor({ template }) {
        this.template = template;
    }
    render() {
        let date = new Date();
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;
        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;
        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);
        console.log(output);
    }
    stop() {clearInterval(this.timer)}
    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}
// let clock1 = new Clock1({template: 'h:m:s'});
// clock1.start();

/* #1.9.2. Наследование классов */
// 1. Ошибка создания экземпляра класса
class Animal {
    constructor(name) {this.name = name}
}
class Rabbit extends Animal {
    constructor(name) {
        super(name);
        // this.name = name;
        this.created = Date.now();
    }
}
rabbit = new Rabbit("Белый кролик"); // Error: this is not defined
// console.log(rabbit.name); // Белый кролик

// 2. Улучшенные часы
class ExtendedClock extends Clock1 {
    constructor(options) {
        super(options);
        let { precision = 1000 } = options;
        this.precision = precision;
    }
    start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
    }
};

/* #1.9.3. Статические свойства и методы */
class Rabbit2 extends Object {
    constructor(name) {
        super(); // (*)
        this.name = name;
    }
}
let rabbit2 = new Rabbit2("Кроль");
// console.log(rabbit2.hasOwnProperty('name')); // true
// Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor




