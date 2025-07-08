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

// 2. Получение элемента массива с отрицательной позицией
let array = [1, 2, 3];
array = new Proxy(array, {
    get(target, prop, receiver) {
        if (prop < 0) prop = +prop + target.length;
        // return target[prop];
        return Reflect.get(target, prop, receiver);
    }
});
// console.log(array[-1]); // 3
// console.log(array[-2]); // 2
// console.log(array[2]); // 3

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
// user.name = "John"; // SET name=John

/* #1.14.2. Eval: выполнение строки кода */
let value = eval('1+1');
// console.log(value); // 2

// 1. Создайте калькулятор, который запрашивает ввод какого-нибудь арифметического выражения и возвращает результат его вычисления.
// let val = prompt('введите запрос', '');
// alert(eval(val));
// alert(eval(prompt('введите пример', '')));

/* #1.14.3. Каррирование (перенос аргументов) */
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}
// Пример использования:
function sum(a, b, c) {return a + b + c}
let curriedSum = curry(sum);
// console.log( curriedSum(1, 2, 3) ); // 6, всё ещё можно вызывать нормально
// console.log( curriedSum(1)(2,3) ); // 6, каррирование первого аргумента
// console.log( curriedSum(1)(2)(3) ); // 6, каррирование всех аргументов

/* #1.14.4. Ссылочный тип */
// 'use strict'
user = {
    name: "John",
    hi() {console.log('Hi', this.name, '!')},
    bye() {console.log("By", this.name)}
};
// user.hi(); // Hi John !
// (user.name == "John" ? user.hi : user.bye)(); // Uncaught TypeError: Cannot read properties of undefined (reading 'name')
// (user.name == "John" ? user.bye.bind(user) : user.hi.bind(user))(); // работает

// 1. Проверка синтаксиса. Каким будет результат выполнения этого кода?
user = {
	name: "John",
	go: function() { console.log(this.name) }
}
// (user.go)(); // Uncaught TypeError: {(intermediate value)(intermediate value)} is not a function
// пропущена точка с запятой после объекта user
;

//2. Объясните значение this
let obj1, method;
obj1 = { go: function() { console.log(this) }};
// obj1.go();               // (1) [object Object]
// (obj1.go)();             // (2) [object Object]
// (method = obj1.go)();    // (3) undefined
// (obj1.go || obj1.stop)(); // (4) undefined

/* #1.14.5. Побитовые операторы */
// console.log('Bitwise AND: 2 & 3 =', 2 & 3); // 2
// console.log('Bitwise OR: 2 | 3 =', 2 | 3); // 3
// console.log('Bitwise XOR: 2 ^ 3 =', 2 ^ 3); // 1
// console.log('Bitwise NOT: ~2 =', ~2 ); // -3
// console.log('Bitwise left shift: 2 << 3 =', 2 << 3); // 16
// console.log('Bitwise right shift: 2 >> 3 =', 2 >> 3); // 0
// console.log('Bitwise unsigned right shift: 2 >>> 3 =', 2 >>> 3); // 0
// // битовые операции отбрасывающие десятичную часть:
// console.log(2.66 ^ 0); // 2
// console.log(~~2.66); // 2
// поиск символа в строке; str.indexOf("подстрока") возвращает позицию подстроки в str, или -1 если не нашёл.
let str = "Проверка";
// if (~str.indexOf("верка")) { // Сочетание "if (~...indexOf)" читается как "если найдено"
//     console.log( 'найдено!' );
// }

// 2. Напишите функцию isInteger(num), которая возвращает true, если num – целое число, иначе false.
// function isInteger(num){
//     if (~~num === num) return true
//     else return false;
// }
function isInteger(num) {
    return (num ^ 0) === num;
}
// console.log( isInteger(1) ); // true
// console.log( isInteger(1.5) ); // false
// console.log( isInteger(-0.5) ); // false

/* #1.14.6. BigInt */
const bigIntEx = 1234567890123456789012345678901234567890n;
const sameBigint = BigInt("1234567890123456789012345678901234567890");
const bigintFromNumber = BigInt(10); // то же самое, что и 10n
// console.log(typeof bigIntEx); // bigint
// console.log(typeof sameBigint); // bigint
// console.log(typeof bigintFromNumber); // bigint

// console.log(1n + 2n); // 3n
// console.log(5n / 2n); // 2n

let bigint = 1n;
let number = 2;
// console.log(bigint + BigInt(number)); // 3n // конвертируем number в bigint
// console.log(Number(bigint) + number); // 3 // конвертируем bigint в number

// console.log( 1 == 1n ); // true
// console.log( 1 === 1n ); // false

// console.log( 1n || 2 ); // 1n
// console.log( 0n || 2 ); // 2

// // потеря точности обычных чисел
// console.log(1.15 + 2.30); // 3.4499999999999997

/* #1.14.7. Юникод, внутреннее устройство строк */
// console.log('𝒳'[0]); // � показывает странные символы...
// console.log('𝒳'[1]); // � ...части суррогатной пары
// console.log('𝒳'.charCodeAt(0)); // 55349
// console.log('𝒳'.codePointAt(0)); // 119987
// console.log('𝒳'.charCodeAt(0).toString(16)); // d835
// console.log('𝒳'.codePointAt(0).toString(16)); // 1d4b3
// // диакритические знаки
// console.log('u\u0308'); // ü
// console.log('e\u0301'); // é
// // нормализация
// console.log("S\u0307\u0323" == "S\u0323\u0307"); // false
// console.log("S\u0307\u0323".normalize() == "S\u0323\u0307".normalize()); // true

/* #1.14.8. Intl: интернационализация в JavaScript */
let date = Date.now();
let formatter1 = new Intl.DateTimeFormat("ru");
let formatter2 = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    // weekday: "long",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric"
});
console.log( formatter1.format(date) ); // 08.07.2025
console.log( formatter2.format(date) ); // 08.07.2025, 15:43

/** 1. Отсортируйте массив с буквой ё (важность: 5)
Используя Intl.Collator, отсортируйте массив:
	let animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];
	// ... ваш код ...
	alert( animals ); // АИСТ,ёж,енот,ехидна,тигр,ЯК
В этом примере порядок сортировки не должен зависеть от регистра. Что касается буквы "ё", то мы следуем обычным правилам сортировки буквы ё, по которым «е» и «ё» считаются одной и той же буквой, за исключением случая, когда два слова отличаются только в позиции буквы «е» / «ё» – тогда слово с «е» ставится первым.*/
let animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];
let collator = new Intl.Collator(undefined, {sensitivity: "accent"});
animals.sort((a, b) => collator.compare(a, b))
console.log( animals ); // (6) ['АИСТ', 'ёж', 'енот', 'ехидна', 'тигр', 'ЯК']




