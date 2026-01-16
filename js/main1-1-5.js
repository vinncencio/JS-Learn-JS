// пример с кнопками:
const buttons = document.querySelectorAll('.button');
// решение через замыкание:
// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].innerHTML = `кнопка ${i+1}`;
// 	   buttons[i].onclick = function(x){
//         return function() {console.log(x+1)}
//     }(i);
// }
// решение через let:
for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = `${i+1}`;
	buttons[i].onclick = function(){console.log(i+1)};
}

// Минимальная задержка вложенных таймеров в браузере
// let start = Date.now();
// let times = [];
// let counter = setTimeout(function run() {
//     times.push(Date.now() - start); // запоминаем задержку от предыдущего вызова
//     if (start + 200 < Date.now()) console.log(times); // показываем задержку через 200 мс
//     else setTimeout(run); // если нужно ещё запланировать
// });

// функция, которая выводит число каждую секунду, начиная от from и заканчивая to.
// function printNumbers1(from, to){
//     let current = from;
//     let timerId = setInterval(function() {
//         console.log(current);
//         if (current == to) {clearInterval(timerId)}
//         current++;
//     }, 1000);
// };
// printNumbers1(7,15);

// function printNumbers2(from, to) {
//     let current = from;
//     setTimeout(function go() {
//         console.log(current);
//         if (current < to) {setTimeout(go, 1000)}
//         current++;
//     }, 1000);
// };
// printNumbers2(5, 10);

// let i = 0;
// setTimeout(() => console.log(i), 100); // ?
// for (let j = 0; j < 1000000; j++) {i++}; // предположим, что время выполнения этой функции >100 мс

// let a = Infinity;
// let b = -Infinity;
// console.log(a); // Infinity
// console.log(a+b); // NaN
// console.log(typeof null); // object

// console.log(5 % 2); // 1, остаток от деления 5 на 2
// console.log(9 ** (1/2)); // 3 (степень 1/2 эквивалентна взятию квадратного корня)
// console.log('одна' + 'строка'); // однастрока
// console.log(2 + 2 + '1' ); // "41", а не "221"
// console.log("6" / "2"); // 3
// console.log( +true ); // 1
// console.log( +"" ); // 0
// console.log(c = 3 - (a = (b = 2) + 1)); // 0
// a = b = c = 2 + 2;
// console.log(a, b, c); // 4 4 4

// let n = 2;
// n += 5; // теперь n = 7 (работает как n = n + 5)
// n *= 2; // теперь n = 14 (работает как n = n * 2)
// console.log(n); // 14

// a = (1 + 2, 3 + 4);
// console.log(a); // 7 (результат вычисления 3 + 4)

// let a = 1, b = 1;
// let c = ++a;
// let d = b++;
// console.log(a, b, c, d); // 2 2 2 1

// let y = 2;
// let x = 1 + (y *= 2);
// console.log(y, x); // 4 5

// console.log("" + 1 + 0); // 10
// console.log("" - 1 + 0); // -1
// console.log(true + false); // 1
// console.log(6 / "3"); // 2
// console.log("2" * "3"); // 6
// console.log(4 + 5 + "px"); // 9px
// console.log("$" + 4 + 5); // $45
// console.log("4" - 2); // 2
// console.log("4px" - 2); // NaN
// console.log("  -9  " + 5); //   -9  5
// console.log("  -9  " - 5); // -14
// console.log(null + 1); // 1
// console.log(undefined + 1); // NaN
// console.log(" \t \n" - 2); // -2

// let a = prompt("Первое число?", 1);
// let b = prompt("Второе число?", 2);
// console.log(+a + +b); // 3

// console.log(5 > 4); // true
// console.log("ананас" > "яблоко"); // false
// console.log("2" > "12"); // true
// console.log(undefined == null); // true
// console.log(undefined === null); // false
// console.log(null == "\n0\n"); // false
// console.log(null === +"\n0\n"); // ?false

// let greeting = "Привет", userName = 'John';
// greeting &&= greeting + ", " + userName; // аналогично true && (greeting = greeting + ", " + userName)
// if (greeting) {greeting = greeting + ", " + userName}; // то же самое
// console.log(greeting); // Привет, John

// console.log( null || 2 || undefined ); // 2
// console.log( console.log(1) || 2 || console.log(3) ); // 1 2
// console.log( 1 && null && 2 ); // null
// console.log( console.log(1) && console.log(2) ); // 1 undefined
// console.log( null || 2 && 3 || 4 ); // 3

// Напишите условие if для проверки, что переменная age находится в диапазоне между 14 и 90 включительно.
// let age = 40;
// if (age >= 14 && age <= 90) {console.log('valid')} else {console.log('error')};
// Напишите условие if для проверки, что значение переменной age НЕ находится в диапазоне 14 и 90 включительно.
// if (age < 14 || age > 90) {console.log('valid')} else {console.log('error')};
// if (!(age >= 14 && age <= 90)) {console.log('valid')} else {console.log('error')};

// if (-1 || 0) console.log( 'first' ); // true
// if (-1 && 0) console.log( 'second' ); // false
// if (null || -1 && 1) console.log( 'third' ); // true

// let login = prompt('кто там?', '');
// if (login === 'admin') {
//     let pass = prompt('пароль?', '');
//     if (pass === 'admin') {alert('здравствуйте')} 
//     else {!pass ? alert('отменено') : alert('неверный пароль')};
// } else {!login ? alert('отмена') : alert('я вас не знаю')};

/** 1.2.12 */
// let height = null;
// let width = null;
// console.log((height ?? 100) * (width ?? 50)); // 5000
// console.log(height ?? 100 * width ?? 50); // 0

// let x = (1 && 2) ?? 3;
// console.log(x); // 2
// console.log(undefined ?? NaN ?? null ?? "" ?? " "); // NaN

// let num1 = 10, num2 = 20, result;
// if (result === null || result === undefined) {
//     if (num1 !== null && num1 !== undefined) {
//         result = num1;
//     } else {
//         result = num2;
//     }
// }
// result ??= num1 ?? num2; // тоже самое что и if
// console.log(result); // 10

/** 1.2.13 базовые циклы */
// let i = 3;
// while (i) console.log(i--); // 3 2 1
// когда i будет равно 0, условие станет ложным, и цикл остановится

// for (let i = 0; i < 3; i++) console.log(i); // 0 1 2

// let sum = 0;
// while (true) {
//     let value = +prompt("Введите число", '');
//     if (!value) break; // прекращение выполнения цикла
//     sum += value;
// }
// alert( 'Сумма: ' + sum );

// for (let i = 0; i < 10; i++) {
//     if (i % 2 == 0) continue; // если true, пропустить оставшуюся часть тела цикла
//     console.log(i); // 1, 3, 5, 7, 9
// }; // цикл выводит только нечётные значения

// let i = 0;
// while (++i < 5) console.log(i); // 1 2 3 4
// i = 0;
// while (i++ < 5) console.log(i); // 1 2 3 4 5
// for (let i = 0; i < 5; i++) console.log(i); // 0 1 2 3 4
// for (let i = 0; i < 5; ++i) console.log(i); // 0 1 2 3 4

// При помощи цикла for выведите чётные числа от 2 до 10.
// for (i = 2; i <= 10; i++) {
//     if (i % 2 == 0) console.log(i);
// }; // 2 4 6 8 10

// Перепишите код, заменив цикл for на while, без изменения поведения цикла.
// for (let i = 0; i < 3; i++) {
//     console.log(`number ${i}`);
// }; // number 0 number 1 number 2
// while (i < 3) console.log(`number ${i++}`); // number 0 number 1 number 2

// Напишите цикл, который предлагает prompt ввести число, большее 100. Если посетитель ввёл другое число – попросить ввести ещё раз, и так далее.
// let value;
// do {
//     value = +prompt("Введите число больше 100", '');
//     console.log(value);
// } while (value <= 100 && value); 

// все простые числа из интервала от 2 до n.
// let n = 2;
// n = +prompt('введите число', '');
// next: for (i = 2; i <= n; i++) {
//     for (j = 2; j < i; j++) {
//         if (i % j == 0) continue next;
//     };
//     console.log(i);
// };

/** #1.2.14. Конструкция switch */
// console.log(navigator.userAgent); // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0 (Edition beta)
// Напишите if..else, соответствующий следующему switch:
// switch (browser) {
//     case 'Edge':
//         console.log("You've got the Edge!");
//         break;
//     case 'Chrome':
//     case 'Firefox':
//     case 'Safari':
//     case 'Opera':
//         console.log('Okay we support these browsers too');
//         break;
//     default:
//         console.log('We hope that this page looks ok!');
// };
// if browser == 'Edge') {
//     console.log("You've got the Edge!");
// } else if (browser == 'Chrome' || browser == 'Firefox' || browser == 'Safari' || browser == 'Opera') {
//     console.log('Okay we support these browsers too');
// } else {console.log('We hope that this page looks ok!')};

// Перепишите код с использованием одной конструкции switch:
// const number = +prompt('Введите число между 0 и 3', '');
// if (number === 0) console.log('Вы ввели число 0');
// if (number === 1) console.log('Вы ввели число 1');
// if (number === 2 || number === 3) console.log('Вы ввели число 2 или 3');

// switch (number) {
//     case 0: console.log('Вы ввели число 0'); break;
//     case 1: console.log('Вы ввели число 1'); break;
//     case 2:
//     case 3: console.log('Вы ввели число 2 или 3'); break;
//     default: console.log('вы ввели другое число');
// }; 

/** #1.2.15. Функции */
function doNothing() {return};
// console.log( doNothing() === undefined ); // true

// Перепишите функцию, используя оператор '?' или '||'
// let age = +prompt('сколько вам лет', '');
// function checkAge(age) {
//     if (age > 18) {
//         return true;
//     } else {
//         return confirm('Родители разрешили?');
//     }
// };
// function checkAge(age) {return (age > 18) ? true : confirm('Родители разрешили?')};
// function checkAge(age) {return (age > 18) || confirm('Родители разрешили?')};
// checkAge(age);

// Функция min(a, b)
// let numb1 = +prompt('введите первое число:', '');
// let numb2 = +prompt('введите второе число:', '');
// function min(a, b) {
//     if (a == b) return 'нет, a равно b';
//     return (a > b) ? b : a;
// };
// console.log('меньшее число:', min(numb1, numb2));

// Напишите функцию pow(x,n), которая возводит x в степень n и возвращает результат.
// function pow(x, deg){
//     let numb = x;
//     for (i = 1; i < deg; i++) numb *= x;
//     return numb;
// }
// let x = +prompt('введите число:', '');
// let n = +prompt('введите степень числа:', '');
// if (n >= 1 && n % 1 == 0) {
//     alert(pow(x, n));
// } else {
//     alert(`Степень ${n} не поддерживается, используйте натуральное число`);
// };
// import degree from './degree';

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
};
// ask("Вы согласны?",
//     () => { alert("Вы согласились."); },
//     () => { alert("Вы отменили выполнение."); }
// );

/** #1.4.1. Объекты */
// let user = {name: "John", age: 30};
// let key = "name";
// console.log( user.key ); // undefined
// console.log( user[key] ); // John

let schedule = {};
// console.log(isEmpty(schedule)); // true
schedule["8:30"] = "get up";
// console.log(isEmpty(schedule)); // false
function isEmpty(obj){
    for (let key in obj) return false;
    return true;
}

let salaries = {John: 100, Ann: 160, Pete: 130};
let sum = 0;
for (let key in salaries) {
    sum += salaries[key];
}
// console.log(sum); // 390

// до вызова функции
let menu = {width: 200, height: 300, title: "My menu"};
// console.log(typeof menu.width); // number
multiplyNumeric(menu);
function multiplyNumeric(obj){
    for (let key in obj) {
        if (typeof obj[key] == 'number') obj[key] *= 2; 
    }
}
// после вызова функции
// console.log(menu);

/** #1.4.4. Методы объекта, this */
// function makeUser() {return {name: "John", ref: this}}; 
// let user = makeUser();
// alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
function makeUser() {return {name: "John", ref() {return this}}}; 
// let user = makeUser();
// console.log(user.ref().name); // John

// let calculator = {
//     read(){
//         this.a = +prompt('введите число a');
//         this.b = +prompt('введите число b');
//     },
//     sum(){return this.a + this.b},
//     mul(){return this.a * this.b}
// };
// calculator.read();
// console.log('сумма: ', calculator.sum());
// console.log('произведение: ', calculator.mul());

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep: function() {
        console.log(this.step);
        return this;
    } // показывает текущую ступеньку
};
// ladder.up().up().down().showStep().down().showStep(); // 1 0

/** #1.4.5. Конструктор, оператор new */
let obj = {};
function A() {return obj;}
function B() {return obj;}
let a = new A();
let b = new B();
// console.log( a == b ); // true

function Calculator() {
    this.read = function(){
        this.a = +prompt('введите число a', 0);
        this.b = +prompt('введите число b', 0);
    };
    this.sum = function(){return this.a + this.b};
    this.mul = function(){return this.a * this.b};
};
// let calculator = new Calculator();
// calculator.read();
// console.log('сумма: ', calculator.sum());
// console.log('произведение: ', calculator.mul());

function Accumulator(startingValue){
    this.value = startingValue;
    this.read = function(){
        this.value += +prompt('введите значение: ', 1);
    };
};
// let accumulator = new Accumulator(1); // начальное значение 1
// accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
// accumulator.read(); // прибавляет введённое пользователем значение к текущему значению
// console.log('итоговое значение: ', accumulator.value); // выведет сумму этих значений

/** #1.4.6. Опциональная цепочка '?.' */
let user1 = {};
// console.log(user1.address.street); // Uncaught TypeError: Cannot read properties of undefined (reading 'street')
// console.log(user1?.address?.street); // undefined

/** #1.4.7. Тип данных Symbol */
// let id = Symbol('id');
// console.log(id); // Symbol(id)
// console.log(id.description); // id

let user = {name: "Вася"};
let id = Symbol("id");
user[id] = 1;
// console.log(user[id]); // 1, мы можем получить доступ к данным по ключу-символу
user = {
    name: "Вася",
    age: 30,
    [id]: 123
};
// for (let key in user) console.log(key); // name, age (свойства с ключом-символом нет среди перечисленных)
// хотя прямой доступ по символу работает:
// console.log("Напрямую:", user[id]); // Напрямую: 123
// console.log(Object.getOwnPropertySymbols(user)); // > [Symbol(id)]
// console.log(Reflect.ownKeys(user)); // > (3) ['name', 'age', Symbol(id)]

/** #1.4.8. Преобразование объектов в примитивы */
user = {
    name: "Вася",
    age: 30,
    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.age;
    }
};
// console.log(user); // > Object / {name: 'Вася', age: 30, Symbol(Symbol.toPrimitive): ƒ}
// console.log(+user); // 30
// console.log(user+50); // 80
// alert(user); // {name: 'Вася'}

/** #1.5.1. Методы примитивов */
// console.log( typeof 0 ); // number
// console.log( typeof new Number(0) ); // object
// alert(null.test); // Uncaught TypeError: Cannot read properties of null (reading 'test')

// String.prototype.test = 5
let str = "Привет";
str.test = 5;
// console.log(str.test); // undefined / 5 (c прототипом)
// alert(str.test); // undefined / 5
// console.log(typeof str); // string
// console.log(str); // Привет

// console.log(typeof 1); // number
// console.log(typeof '1'); // string
// console.log(typeof NaN); // number (type of 'Not-a-Number')
// console.log(typeof Number(1)); // number
// console.log(typeof new Number(1)); // object

/** #1.5.2. Числа */
let billion = 1000000000, billion1 = 1_000_000_000;
// console.log(billion, billion1); // 1000000000 1000000000
let billion2 = 1e9;
// console.log(billion2); // 1000000000
let mcs = 0.000001, mcs1 = 1e-6;
// console.log(mcs, mcs1); // 0.000001 0.000001
// console.log(0xff); // 255
// console.log(0xFF); // 255
// let a1 = 0b11111111; // двоичная (бинарная) форма записи числа 255
// let b1 = 0o377; // восьмеричная форма записи числа 255
// console.log(a1 === b1); // true
// let num = 255;
// console.log(num.toString(16)); // ff
// console.log(num.toString(2)); // 11111111
// console.log(123456..toString(36)); // 2n9c

// let num1 = 1.23456;
// console.log(Math.round(num1)); // 1
// console.log(num1.toFixed(2)); // 1.23
// console.log(num1.toFixed(8)); // 1.23456000

// console.log(1e500); // Infinity
// console.log(0.1 + 0.2); // 0.30000000000000004
// console.log((.1 + .2).toFixed(2)); // 0.30

// console.log( 9999999999999999 ); // 10000000000000000
// console.log( 9999999999999999..toLocaleString() ); // 10 000 000 000 000 000

// console.log(isNaN(NaN)); // true
// console.log(isNaN("str")); // true
// console.log(NaN === NaN); // false
// console.log(isFinite("15")); // true
// console.log(isFinite("str")); // false
// console.log(isFinite(Infinity)); // false

// console.log( Number.isNaN(NaN) ); // true
// console.log( Number.isNaN("str" / 2) ); // true
// // Обратите внимание на разный результат:
// console.log( Number.isNaN("str") ); // false, так как "str" является строкой, а не числом
// console.log( isNaN("str") ); // true, так как isNaN сначала преобразует строку "str" в число и в результате преобразования получает NaN
// console.log( Number.isFinite(123) ); // true
// console.log( Number.isFinite(Infinity) ); // false
// console.log( Number.isFinite(2 / 0) ); // false
// // Обратите внимание на разный результат:
// console.log( Number.isFinite("123") ); // false, так как "123" является строкой, а не числом
// console.log( isFinite("123") ); // true, так как isFinite сначала преобразует строку "123" в число 123

// console.log(Object.is(NaN, NaN)); // true
// console.log(Object.is(0, -0)); // false

// console.log( parseInt('100px') ); // 100
// console.log( parseFloat('12.5em') ); // 12.5
// console.log( parseInt('12.3') ); // 12, вернётся только целая часть
// console.log( parseFloat('12.3.4') ); // 12.3, произойдёт остановка чтения на второй точке
// console.log( parseInt('0xff', 16) ); // 255
// console.log( parseInt('ff', 16) ); // 255, без 0x тоже работает
// console.log( parseInt('2n9c', 36) ); // 123456

// console.log(Math.random()); // 0.6533147988889711
// console.log(Math.max(3, 5, -10, 0, 1)); // 5
// console.log(Math.min(1, 2)); // 1
// console.log(Math.pow(2, 10)); // 1024

// let numb1 = +prompt('введите первое число', '');
// let numb2 = +prompt('введите второе число', '');
// alert(numb1+numb2);

// console.log(Math.round(6.35 * 10) / 10); // 6.4

function readNumber(){
    let numb;
    do {numb = prompt('введите число', 0)} while (!isFinite(numb));
    if (numb === null || numb === '') return null;
    return +numb; 
}
// alert(`Число: ${readNumber()}`);
// console.log((2/10).toFixed(20)); // 0.20000000000000001110

// let min = +prompt('введите первое число min', '');
// let max = +prompt('введите второе число max', '');
function random(min, max) {
    if (min >= max) return 'ошибка, введите другие числа';
    return min + ((max - min) * Math.random());
}
// alert(`случайное число между ${min} и ${max} : ${random(min, max)}`);

// let min = +prompt('введите первое число min', '');
// let max = +prompt('введите второе число max', '');
function randomInteger(min, max) {
    if (min >= max) return 'ошибка, введите другие числа';
    let rand = min + ((max + 1 - min) * Math.random());
    return Math.floor(rand);
}
// alert(`случайное целое число между ${min} и ${max} : ${randomInteger(min, max)}`);

/** #1.5.3. Строки */
// Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом.
function ucFirst(str){
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
};
function ucFirst1(str){return str.charAt(0) + str.slice(1)};
// console.log(ucFirst('stringify')); // Stringify
// console.log(ucFirst1('')); // [пустая строка]

// Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false. Функция должна быть нечувствительна к регистру
function checkSpam(str){
    str = str.toLowerCase();
    return console.log(str.includes('viagra') || str.includes('xxx'));
};
// checkSpam('buy ViAgRA now'); // true
// checkSpam('free xxxxx'); // true
// checkSpam("innocent rabbit"); // false

// Создайте функцию truncate(str, maxlength), которая проверяет длину строки str и, если она превосходит maxlength, заменяет конец str на "…", так, чтобы её длина стала равна maxlength. Результатом функции должна быть та же строка, если усечение не требуется, либо, если необходимо, усечённая строка.
function truncate(str, maxlength){
    return (str.length > maxlength) ? str.slice(0, maxlength-1) + '…' : str;
}
// console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20)); // "Вот, что мне хотело…"
// console.log(truncate("Всем привет!", 20)); // "Всем привет!"

/**Есть стоимость в виде строки "$120". То есть сначала идёт знак валюты, а затем – число.
Создайте функцию extractCurrencyValue(str), которая будет из такой строки выделять числовое значение и возвращать его. */
function extractCurrencyValue(str){return +str.slice(1)};
// console.log(extractCurrencyValue('$120') === 120); // true

/** #1.5.4. Массивы */
// let arr = [1, 2, 3];
// console.log(String(arr) === '1,2,3'); // true

// Операции с массивами
// let styles = ['Джаз', 'Блюз'];
// console.log(styles); // (2) ['Джаз', 'Блюз']
// styles.push('Рок-н-ролл');
// console.log(styles); // (3) ['Джаз', 'Блюз', 'Рок-н-ролл']
// // let first = styles.shift();
// // let second = styles.shift();
// // styles.unshift(first, 'Классика');
// styles[Math.floor((styles.length - 1) / 2)] = "Классика";
// console.log(styles); // (3) ['Джаз', 'Классика', 'Рок-н-ролл']
// console.log(styles.shift()); // Джаз
// console.log(styles); // (2) ['Классика', 'Рок-н-ролл']
// styles.unshift('Рэп', 'Регги');
// console.log(styles); // (4) ['Рэп', 'Регги', 'Классика', 'Рок-н-ролл']

let arr = ["a", "b"];
arr.push(function(){console.log(this)});
// arr[2](); // (3) ['a', 'b', ƒ]

/** Сумма введённых чисел */
function sumInput(){
    let arr = [], sum = 0;
    while (true) {
        let numb = prompt('введите число', 0);
        if (!isFinite(numb) || numb === '' || numb === null) break;
        arr.push(+numb);
    };
    for (let i of arr) sum += i;
    return console.log(`сумма элементов массива ${arr} = ` + sum);
}
// sumInput();

/** Подмассив наибольшей суммы */
arr = [1, -2, 3, 4, -9, 6];
function getMaxSubSumSlow(arr){
    let maxSum = 0; // если элементов не будет - возвращаем 0
    for (let i = 0; i < arr.length; i++) {
        let sumFixedStart = 0;
        for (let j = i; j < arr.length; j++) {
            sumFixedStart += arr[j];
            maxSum = Math.max(maxSum, sumFixedStart);
        }
    }
    return maxSum;
}
function getMaxSubSum(arr) {
    let maxSum = 0;
    let partialSum = 0;
    for (let item of arr) { // для каждого элемента массива
        partialSum += item; // добавляем значение элемента к partialSum
        maxSum = Math.max(maxSum, partialSum); // запоминаем максимум на данный момент
        if (partialSum < 0) partialSum = 0; // ноль если отрицательное
    }
    return maxSum;
}
// console.log(getMaxSubSum([-1, 2, 3, -9])); // == 5 (сумма выделенных элементов)
// console.log(getMaxSubSum([2, -1, 2, 3, -9])); // == 6
// console.log(getMaxSubSum([-1, 2, 3, -9, 11])); // == 11
// console.log(getMaxSubSum([-2, -1, 1, 2])); // == 3
// console.log(getMaxSubSum([100, -9, 2, -3, 5])); // == 100
// console.log(getMaxSubSum([1, 2, 3, 2])); // == 8
// console.log(getMaxSubSum([-1, -2, -3])); // 0

/** #1.5.5. Методы массивов */

function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}
arr = [3, 1, 2, 15, 8, 4];
arr.sort(compareNumeric);
// console.log(arr);  // (6) [1, 2, 3, 4, 8, 15]
arr = [1, -2, 15, 2, 0, 8];
arr.sort(function(a, b) {
    // console.log( a + " <> " + b );
    return a - b;
});
// console.log(arr); // (6) [-2, 0, 1, 2, 8, 15]

// 1. Напишите функцию camelize(str), которая преобразует строки вида my-short-string в myShortString.
function camelize(str){
    let arr = str.split('-');
    let arr1 = arr.map((word, index) => index == 0 ? word : ucFirst(word));
    return arr1.join('');
};
function ucFirst(str){
    return (!str) ? str : str[0].toUpperCase() + str.slice(1);
};
function camelize1(str) {
    return str
        .split('-') // разбивает 'my-long-word' на массив ['my', 'long', 'word']
        .map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)) // переводит в верхний регистр первые буквы всех элементом массива за исключением первого;
        .join(''); // соединяет ['my', 'Long', 'Word'] в 'myLongWord'
};
// console.log(camelize("background-color")); // 'backgroundColor';
// console.log(camelize("list-style-image")); // 'listStyleImage';
// console.log(camelize("-webkit-transition")); // 'WebkitTransition';

// 2. Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет элементы со значениями больше или равными a и меньше или равными b и возвращает результат в виде массива.
function filterRange(arr, a, b){
    let arr2 = [...arr];
    arr2.map((value, index) => {
        if (value < a || value > b) arr2.splice(index, 1);
    });
    return arr2;
}
function filterRange2(arr, a, b) {
    return arr.filter(item => (a <= item && item <= b));
}
// arr = [5, 3, 8, 1];
// let filtered = filterRange2(arr, 1, 4);
// console.log( filtered ); // 3,1 (совпадающие значения)
// console.log( arr ); // 5,3,8,1 (без изменений)

// 3. Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr и удаляет из него все значения кроме тех, которые находятся между a и b. То есть, проверка имеет вид a ≤ arr[i] ≤ b.
function filterRangeInPlace(arr, a, b){
    arr.map((item, index) => {
        if (item < a || item > b) arr.splice(index, 1);
    });
}
function filterRangeInPlace1(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (val < a || val > b) {
            arr.splice(i, 1); // удалить, если за пределами интервала
            i--;
        }
    }
}
arr = [5, 3, 8, 1];
filterRangeInPlace1(arr, 1, 4); // удалены числа вне диапазона 1..4
// console.log(arr); // [3, 1]

// 4. Сортировать в порядке по убыванию
arr = [5, 2, 1, -10, 8];
arr.sort((a, b) => b - a);
// console.log(arr); // 8, 5, 2, 1, -10

// 5. Скопировать и отсортировать массив
function copySorted(arr){
    let arr2 = [...arr];
    // return arr2.sort((a, b) => a.localeCompare(b));
    return arr2.sort();
}
function copySorted2(arr) {
    return arr.slice().sort();
}
arr = ["HTML", "JavaScript", "CSS"];
let sorted = copySorted(arr);
// console.log(sorted); // CSS, HTML, JavaScript
// console.log(arr); // HTML, JavaScript, CSS (без изменений)

// 6.Создайте функцию конструктор Calculator, которая создаёт "расширяемые" объекты калькулятора.
function Calculator() {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b
    };
    this.calculate = function(str) {
        let arr = str.split(' '), a = +arr[0], b = +arr[2], op = arr[1];
        if (!this.methods[op] || isNaN(a) || isNaN(b)) return NaN;
        return this.methods[op](a, b);
    }
    this.addMethod = function(name, func){
        this.methods[name] = func;
    }
}
// calc = new Calculator;
// console.log(calc.calculate("3 + 7")); // 10

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);
let result = powerCalc.calculate("2 ** 3");
// console.log( result ); // 8

// 7. Трансформировать в массив имён
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };
let users = [ vasya, petya, masha ];
let names = users.map(item => item.name);
// let names = [];
// for (let nameObj of users) names.push(nameObj.name);
// console.log( names ); // Вася, Петя, Маша

// 8. Напишите код, который создаст ещё один массив объектов с параметрами id и fullName, где fullName – состоит из name и surname.
vasya = { name: "Вася", surname: "Пупкин", id: 1 };
petya = { name: "Петя", surname: "Иванов", id: 2 };
masha = { name: "Маша", surname: "Петрова", id: 3 };
users = [ vasya, petya, masha ];
/** usersMapped = [
    { fullName: "Вася Пупкин", id: 1 },
    { fullName: "Петя Иванов", id: 2 },
    { fullName: "Маша Петрова", id: 3 }
]*/
// let usersMapped = [...users]; // моё
// usersMapped.map(item => item.fullName = item.name + ' ' + item.surname);
let usersMapped = users.map(user => ({ // из учебника
    fullName: `${user.name} ${user.surname}`,
    id: user.id
}));
// console.log( usersMapped[0].id ) // 1
// console.log( usersMapped[0].fullName ) // Вася Пупкин

// 9. Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age и сортирует их по нему.
function sortByAge(users){
    users.sort((a, b) => a.age - b.age);
}
// vasya = { name: "Вася", age: 25 };
// petya = { name: "Петя", age: 30 };
// masha = { name: "Маша", age: 28 };
// arr = [ vasya, petya, masha ];
// sortByAge(arr); // теперь: [vasya, masha, petya]
// console.log(arr[0].name); // Вася
// console.log(arr[1].name); // Маша
// console.log(arr[2].name); // Петя

// 10. Напишите функцию shuffle(array), которая перемешивает (переупорядочивает случайным образом) элементы массива. Многократные прогоны через shuffle могут привести к разным последовательностям элементов.
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
function shuffleFischer(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// arr = [1, 2, 3];
// console.log(shuffle(arr)); 
// console.log(shuffleFischer(arr)); 

// 11. Напишите функцию getAverageAge(users), которая принимает массив объектов со свойством age и возвращает средний возраст. Формула вычисления среднего арифметического значения: (age1 + age2 + ... + ageN) / N.
function getAverageAgeMy(users){
    let sumAges = 0, counter = 0;
    for (let user of users) {
        sumAges = sumAges + user.age;
        counter++;
    }
    return sumAges / counter;
}
function getAverageAge(users) {
    return users.reduce((prev, user) => prev + user.age, 0) / users.length;
}
vasya = { name: "Вася", age: 25 };
petya = { name: "Петя", age: 30 };
masha = { name: "Маша", age: 29 };
arr = [ vasya, petya, masha ];
// console.log( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28

// 12. Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.
function unique(arr){
    let result = [];
    for (let str of arr) {
        if (!result.includes(str)) result.push(str);
    }
    return result;
}
let strings = ["кришна", "кришна", "харе", "харе", "харе", "харе", "кришна", "кришна", ":-O"];
// console.log( unique(strings) ); // кришна, харе, :-O

// 13. Создайте функцию groupById(arr), которая создаст из него объект с id в качестве ключа и элементами массива в качестве значений.
function groupById(array) {
    return array.reduce((obj, value) => {
        obj[value.id] = value;
        return obj;
    }, {});
}
users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
];
let usersById = groupById(users);
// console.log(usersById); 

/** #1.5.6. Перебираемые или итерируемые объекты */
let range = {from: 1, to: 7};
range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {return {done: false, value: this.current++};} 
            else {return {done: true}}
        }
    };
};
// for (let num of range) {console.log(num)}; // 1 2 3 4 5 6 7

/* #1.5.7. Map и Set */
// 1. Создайте функцию unique(arr), которая вернёт массив уникальных, не повторяющихся значений массива arr.
function unique(arr){return Array.from(new Set(arr))};
let values = ["Hare", "Krishna", "Hare", "Krishna", "Krishna", "Krishna", "Hare", "Hare", ":-O"];
// console.log(unique(values)); // ['Hare', 'Krishna', ':-O']
// 2. Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.
function aclean(arr){
    let uniq = new Map();
    for (let word of arr) {
        let lettersArray = Array.from(word);
        let newWord = lettersArray.sort().join('').toLowerCase();
        uniq.set(newWord, word);
    }
    return Array.from(uniq.values());
}
arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
// console.log(aclean(arr)); // (3) ['PAN', 'hectares', 'era']
// 3.
let map = new Map();
map.set("name", "John");
let keys = Array.from(map.keys());
keys.push("more");

/* #1.5.8. WeakMap и WeakSet */
let john = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(john, "...");
weakMap.set(obj, "ok"); // работает (объект в качестве ключа)
// weakMap.set("test", "Whoops"); // Ошибка Uncaught TypeError: Invalid value used as weak map key, потому что "test" не объект (нельзя использовать строку в качестве ключа)
john = null; // перезаписываем ссылку на объект
// console.log(john); // null // объект john удалён из памяти
// console.log(weakMap); // WeakMap {{…} => '...', {…} => 'ok'}

let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
// 1
let readMessages = new WeakSet();
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// console.log(readMessages.has(messages[0])); // true
// console.log(readMessages); // WeakSet {{…}, {…}}
// 2
let readMessage = new WeakMap();
readMessage.set(messages[0], new Date());
// console.log(readMessage); // WeakMap {{…} => Sun Mar 16 2025 14:50:59 GMT+0300 (GMT+03:00)}

/* #1.5.9. Object.keys, values, entries */
// Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат с помощью метода Object.values и цикла for..of.
function sumSalaries(salaries){
    let sum = 0;
    for (let sal of Object.values(salaries)) sum += sal;
    return sum;
}
salaries = {"John": 100, "Pete": 300, "Mary": 250};
// console.log(sumSalaries(salaries)); // 650
// Напишите функцию count(obj), которая возвращает количество свойств объекта:
function count(obj){return Object.entries(obj).length};
user = {name: 'John', age: 30};
// console.log(count(user)); // 2

/* #1.5.10. Деструктурирующее присваивание */
// 1. Напишите деструктурирующее присваивание, которое: cвойство name присвоит в переменную name, свойство years присвоит в переменную age, свойство isAdmin присвоит в переменную isAdmin (false, если нет такого свойства)
user = {name: "John", years: 30};
let {name, years: age, isAdmin = false} = user;
// console.log(name, age, isAdmin); // John 30 false

// 2. Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника. Если объект salaries пустой, то нужно вернуть null. Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
function topSalary(salaries){
    let maxSalary = 0, maxName = null;
    for (let [name, sal] of Object.entries(salaries)) {
        if (sal > maxSalary) {maxSalary = sal; maxName = name};
    }
    return maxName + ': ' + maxSalary;
}
salaries = {"John": 100, "Pete": 300, "Mary": 250};
// console.log(topSalary(salaries)); // Pete: 300
// (function (salaries){
//     let sorted = Object.entries(salaries).sort(([, a], [, b]) => b - a);
//     return console.log(sorted[0][0], ':', sorted[0][1]);
// })(salaries); // Pete : 300

/* #1.5.11. Дата и время */
let Jan01_1970 = new Date(0);
// console.log(Jan01_1970); // Thu Jan 01 1970 03:00:00 GMT+0300 (GMT+03:00)
// let date = new Date("2017-01-26");
// console.log(date); // Thu Jan 26 2017 03:00:00 GMT+0300 (GMT+03:00)
// console.log(date.getDate()); // 26
// console.log(date.getFullYear()); // 2017
// console.log(date.getYear()); // 117
// let dateNow = new Date();
// console.log(dateNow); // Wed Mar 19 2025 09:36:43 GMT+0300 (GMT+03:00)
// console.log(dateNow.getUTCHours()); // 6
// измерение времени выполнения
// let start = new Date(); // начинаем отсчёт времени
// for (let i = 0; i < 100000; i++) {
//     let doSomething = i * i * i;
// }
// let end = new Date(); // заканчиваем отсчёт времени
// console.log(`Цикл отработал за ${end - start} миллисекунд`); // Цикл отработал за 18 миллисекунд
// let start = Date.now(); // начинаем отсчёт времени (количество миллисекунд с 1 января 1970 года)
// for (let i = 0; i < 100000; i++) {let doSomething = i * i * i};
// let end = Date.now(); // заканчиваем отсчёт времени
// console.log( `Цикл отработал за ${end - start} миллисекунд` ); // вычитаются числа, а не даты
// Цикл отработал за 12 миллисекунд
// benchmarks
function diffSubtract(date1, date2) {return date2 - date1};
function diffGetTime(date1, date2) {return date2.getTime() - date1.getTime()};
function bench(func) {
    let date1 = new Date(0);
    let date2 = new Date();
    let start = Date.now();
    for (let i = 0; i < 100000; i++) func(date1, date2);
    return Date.now() - start;
}
// console.log( 'Время diffSubtract: ' + bench(diffSubtract) + 'мс' );// Время diffSubtract: 46мс
// console.log( 'Время diffGetTime: ' + bench(diffGetTime) + 'мс' );// Время diffGetTime: 5мс
let time1 = 0;
let time2 = 0;
// bench(diffSubtract) и bench(diffGetTime) поочерёдно запускаются 10 раз
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}
// console.log('Итоговое время diffSubtract: ' + time1, 'ms'); // Итоговое время diffSubtract: 429 ms
// console.log('Итоговое время diffGetTime: ' + time2, 'ms'); // Итоговое время diffGetTime: 34 ms
// console.log(Date.parse(Jan01_1970)); // 0
// console.log(Date.parse(new Date()).toLocaleString()); // 1 742 368 716 000

// 1. Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут.
let date1 = new Date('2012-02-20 3:12');
// console.log(date1); // Mon Feb 20 2012 03:12:00 GMT+0300 (GMT+03:00)
let d = new Date(2012, 1, 20, 3, 12);
// console.log(d); // Mon Feb 20 2012 03:12:00 GMT+0300 (GMT+03:00)
//2. Напишите функцию getWeekDay(date), показывающую день недели в коротком формате
let date = new Date(2012, 0, 3);
// console.log(date.toLocaleDateString('ru-RU', {weekday: 'short'})); // вт
// console.log(date.getDay()); // 2
function getWeekDay(date){
    return date.toLocaleDateString('ru-RU', {weekday: 'short'}).toUpperCase();
};
function getWeekDay2(date) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}
// console.log(getWeekDay(date)); // ВТ
// 3. Напишите функцию getLocalDay(date), которая возвращает "европейский" день недели для даты date.
function getLocalDay(date){
    let day = date.getDay();
    if (day == 0) day = 7; // день недели 0 (воскресенье) в европейской нумерации будет 7
    return day;
}
// console.log(getLocalDay(date)); // 2
// 4. Создайте функцию getDateAgo(date, days), возвращающую число, которое было days дней назад от даты date.
function getDateAgo(date, days){
    let newDate = new Date(date);
    newDate.setDate(date.getDate() - days);
    let fullDate = newDate.toLocaleDateString({day: "numeric", month: "short", year: "numeric"});
    return newDate.getDate() + ', (' + fullDate + ')';
}
date = new Date(2015, 0, 2);
// console.log( getDateAgo(date, 1) ); // 1, (01.01.2015)
// console.log( getDateAgo(date, 2) ); // 31, (31.12.2014)
// console.log( getDateAgo(date, 365) ); // 2, (02.01.2014)
// 5. Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца.
function getLastDayOfMonth(year, month){
    let date = new Date(year, month+1, 0);
    return console.log(date.getDate());
}
// getLastDayOfMonth(2012, 1); // 29
// 6. Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.
function getSecondsToday(){
    let dateNow = new Date();
    let dateMidNight = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
    return Math.round((dateNow - dateMidNight)/1000);
}
// console.log(getSecondsToday()); // 53905 (14:58)
// 7. Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.
function getSecondsToTomorrow(){
    let dateNow = new Date();
    let dateTomor = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()+1);
    return Math.round((dateTomor - dateNow)/1000);
}
// console.log(getSecondsToTomorrow()); // 31854
// 8. Напишите функцию formatDate(date)
function formatDate(date){
    let diff = (new Date() - new Date(date))/1000;
    if (diff <= 1) return 'прямо сейчас';
    if (diff > 1 && diff <= 60) return `${diff} сек. назад`;
    if (diff > 60 && diff <= 3600) return `${Math.round(diff/60)} мин. назад`;
    // if (diff > 3600) return `${date.getDate()}.${date.getMonth()}.${date.getFullYear().toString().slice(-2)}, ${date.getHours()}:${date.getMinutes()}`;
    if (diff > 3600) {
        let d = date;
		d = ['0' + d.getDate(), '0' + (d.getMonth() + 1), '' + d.getFullYear(), '0' + d.getHours(), '0' + d.getMinutes()].map(component => component.slice(-2)); // взять последние 2 цифры из каждой компоненты
		return d.slice(0, 3).join('.') + ', ' + d.slice(3).join(':'); // соединить компоненты в дату
    };
    // if (diff > 3600) return date.toLocaleString();
};
// console.log(formatDate(new Date(new Date - 1))); // прямо сейчас
// console.log(formatDate(new Date(new Date - 30 * 1000))); // 30 сек. назад
// console.log(formatDate(new Date(new Date - 5 * 60 * 1000))); // 5 мин. назад
// console.log(formatDate(new Date(new Date - 86400 * 1000))); // 18.2.2025, 15:33
// console.log(date.toLocaleString());

/* #1.5.12. Формат JSON */
let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
};
let json = JSON.stringify(student);
// console.log(typeof json); // string

// 1. Преобразуйте user в JSON, затем прочитайте этот JSON в другую переменную.
user = {name: "Василий Иванович", age: 35};
user = JSON.stringify(user);
// console.log(user); // {"name":"Василий Иванович","age":35}
let user2 = JSON.parse(user);
// console.log(user2); // > {name: 'Василий Иванович', age: 35}
// 2. Напишите функцию replacer для JSON-преобразования, которая удалит свойства, ссылающиеся на meetup
let room = {number: 23};
let meetup = {
    title: "Совещание",
    occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
    place: room
};
// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;
/* в результате должно быть:
	{
		"title":"Совещание",
		"occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],
		"place":{"number":23}
	}
*/
// console.log( JSON.stringify(meetup)); // Uncaught TypeError: Converting circular structure to JSON --> starting at object with constructor 'Object'  property 'place' -> object with constructor 'Object'--- property 'occupiedBy' closes the circle
// console.log( JSON.stringify(meetup, function replacer(key, value) {
//     return (key == 'occupiedBy' || key == 'self') ? undefined : value;
// })); // {"title":"Совещание","place":{"number":23}}
// console.log( JSON.stringify(meetup, function replacer(key, value) {
//     return (key != "" && value == meetup) ? undefined : value;
// })); // {"title":"Совещание","occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],"place":{"number":23}}
// console.log( JSON.stringify(meetup, (key, value) =>
//     (key && value === meetup) ? undefined : value
// )); // {"title":"Совещание","occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],"place":{"number":23}}
// console.log( JSON.stringify(meetup, function replacer(key, value) {
//     if (!key) replacer.self = value;
//     if (key && value === replacer.self) return undefined;
//     else return value;
// })); // {"title":"Совещание","occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],"place":{"number":23}}

