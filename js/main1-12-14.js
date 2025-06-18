/* #1.12.1. Генераторы */
let rangeNumb = {
    from: 1,
    to: 5,
    // [Symbol.iterator]: function* () {
    *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
        for (let value = this.from; value <= this.to; value++) yield value;
    }
};
// console.log([...rangeNumb]); // (5) [1, 2, 3, 4, 5]

// генератор с композицией
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}
function* generatePasswordCodes() {
    yield* generateSequence(48, 57); // 0..9
    yield* generateSequence(65, 90); // A..Z
    yield* generateSequence(97, 122); // a..z
}
let strPass = '';
for (let code of generatePasswordCodes()) {
    strPass += String.fromCharCode(code);
}
// console.log(strPass); // 0..9A..Za..z // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

// 1. Сеяный псевдослучайный генератор
function* pseudoRandom(seed) {
    let value = seed;
    while (true) {
        value = value * 16807 % 2147483647
        yield value;
    }
}
let generator = pseudoRandom(1);
// console.log(generator.next().value); // 16807
// console.log(generator.next().value); // 282475249
// console.log(generator.next().value); // 1622650073

// console.log(1 * 16807 % 2147483647); // 16807
// console.log(16807 * 16807 % 2147483647); // 282475249
// console.log(282475249 * 16807 % 2147483647); // 1622650073

/* #1.12.2. Асинхронные итераторы и генераторы */
async function* asyncGenerateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // можно использовать await
        yield i;
    }
}
// (async () => {
//     let generator = asyncGenerateSequence(1, 5);
//     for await (let value of generator) {
//         // console.log(value); // 1, потом 2, потом 3, потом 4, потом 5
//     }
// })();

/* функция-генератор, параметр count - кол-во запросов */
async function* generatorAsync(count) {
    for (let index = 1; index < count; index++) {
        let responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`); // делаем запрос на сервер
        // let responce = await new Promise (resolve => resolve(fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)));
        let data = await responce.json(); // получаем результат в json-формате
        yield data; // возвращаем результат запроса
    }
}
(async () => {
    let gnrtr = generatorAsync(10);
    for await (const iterator of gnrtr) { // перебираем генератор и получаем все значения
        // console.log(`Id:${iterator.id}\nValue: ${iterator.title}\nFuncCompleted: ${iterator.completed}`); // выводим полученные данные
    }
})();

/* #1.13.1. Модули, введение */
import { obj } from './module-one.js';
// console.log(obj.name); // admin
// console.log(import.meta.url); // http://127.0.0.1:5500/js/main1-12-14.js

/* #1.13.2. Экспорт и импорт */
// Импорт объекта с набором функций.
import expObject from './module-two.js';
// expObject.first(); // func first
// expObject.second(); // func second
// expObject.third(); // func third

/* #1.13.3. Динамические импорты */
// скрипт внутри index.html > section.dynImport

/* #1.14.1. Proxy и Reflect */
// #1. Proxy
let numbers = [0, 1, 2];
numbers = new Proxy(numbers, {
    get(target, prop) {
        if (prop in target) return target[prop]
        else return 0; // значение по умолчанию
    }
});
// console.log(numbers[1]); // 1
// console.log(numbers[123]); // 0 (нет такого элемента)

numbers = new Proxy(numbers, { // (*)
    set(target, prop, val) { // для перехвата записи свойства
        if (typeof val == 'number') {
            target[prop] = val;
            return true;
        } else {
            return false;
        }
    }
});
numbers.push(1); // добавилось успешно
numbers.push(2); // добавилось успешно
// console.log("Длина: " + numbers.length); // 2
// numbers.push("тест"); // TypeError (ловушка set на прокси вернула false)
// console.log("Интерпретатор никогда не доходит до этой строки (из-за ошибки в строке выше)");

// "В диапазоне" с ловушкой has
let range = { start: 1, end: 10 };
range = new Proxy(range, {
    has(target, prop) {
        return prop >= target.start && prop <= target.end
    }
});
// console.log(5 in range); // true
// console.log(50 in range); // false

// декоратор-обёртка задержки delay(f, ms)
function delay(f, ms) { // возвращает обёртку, которая вызывает функцию f через таймаут
    // return function() {setTimeout(() => f.apply(this, arguments), ms)}; // (*)
    return new Proxy(f, {
        apply(target, thisArg, args) {
            setTimeout(() => target.apply(thisArg, args), ms);
        }
    });
}
function sayHi(user) {
    console.log(`Привет, ${user}!`);
}
sayHi = delay(sayHi, 3000); // после обёртки вызовы sayHi будут срабатывать с задержкой в 3 секунды
// console.log(sayHi.length); // 1
// sayHi("Вася"); // Привет, Вася! (через 3 секунды)

// #2. Reflect
let user = { name: "Вася" };
user = new Proxy(user, {
    get(target, prop, receiver) {
        // console.log(`GET ${prop}`);
        return Reflect.get(target, prop, receiver); // (1)
    },
    set(target, prop, val, receiver) {
        // console.log(`SET ${prop}=${val}`);
        return Reflect.set(target, prop, val, receiver); // (2)
    }
});
let name = user.name; // выводит "GET name"
user.name = "Петя"; // выводит "SET name=Петя"

// унаследуем от проксированного user объект admin
user = {
    _name: "Гость",
    get name() { return this._name }
};
let userProxy = new Proxy(user, {
    get(target, prop, receiver) { // receiver = admin
        // return Reflect.get(target, prop, receiver); // (*)
        return Reflect.get(...arguments);
    }
});
let admin = {
    __proto__: userProxy,
    _name: "Админ"
};
// console.log(admin.name); // Админ

// приватные поля классов
class User {
    #name = "Гость";
    getName() { return this.#name }
}
user = new User();
user = new Proxy(user, {
    get(target, prop, receiver) {
        let value = Reflect.get(...arguments);
        return typeof value == 'function' ? value.bind(target) : value;
    }
});
// console.log(user.getName()); // Гость

// 1. Ошибка при чтении несуществующего свойства
user = { name: "John" };
function wrap(target) {
    return new Proxy(target, {
        get(target, prop, receiver) {
            if (prop in target) {
                // return target[prop];
                return Reflect.get(target, prop, receiver);
            } else {
                // throw new Error("такого свойства не существует");
                throw new ReferenceError(`Свойство не существует: "${prop}"`)
            }
        }
    });
}
user = wrap(user);
// console.log(user.name); // John
// console.log(user.age); // Ошибка: такого свойства не существует

// 2. 
let array = [1, 2, 3];
array = new Proxy(array, {
    get(target, prop, receiver) {
        if (prop < 0) prop = +prop + target.length;
        // return target[prop];
        return Reflect.get(target, prop, receiver);
    }
});
console.log(array[-1]); // 3
console.log(array[-2]); // 2
console.log(array[2]); // 3

// 3. Создайте функцию makeObservable(target), которая делает объект «наблюдаемым», возвращая прокси.
let handlers = Symbol('handlers');
function makeObservable(target) {
    target[handlers] = []; // 1. Создадим хранилище обработчиков
    target.observe = function(handler) {
        this[handlers].push(handler); // положим туда функции-обработчики для вызовов в будущем
    };
    return new Proxy(target, { // 2. Создадим прокси для реакции на изменения
        set(target, property, value, receiver) {
            let success = Reflect.set(...arguments); // перенаправим операцию к оригинальному объекту
            if (success) { // если не произошло ошибки при записи свойства
                target[handlers].forEach(handler => handler(property, value)); // вызовем обработчики
            }
            return success;
        }
    });
}
user = {};
user = makeObservable(user);
user.observe((key, value) => console.log(`SET ${key}=${value}`));
user.name = "John"; // SET name=John

