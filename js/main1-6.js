/* #1.6.1. Рекурсия и стек */
// 1. Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
// 1.1. С использованием цикла.
function sumTo1(n){
    let sum = 0;
    for (let i = 0; i <= n; i++) sum += i;
    return sum;
}

// 1.2. Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) for n > 1.
function sumTo2(n) {
    if (n == 1) return 1;
    return n + sumTo2(n - 1);
}

// 1.3. С использованием формулы арифметической прогрессии.
function sumTo3(n) {
    return n * (n + 1) / 2;
}
// console.log(sumTo1(100)); // 5050
// console.log(sumTo2(100)); // 5050
// console.log(sumTo3(100)); // 5050

// 2. написать функцию factorial(n), которая возвращает n!, используя рекурсию.
function factorial(n){return (!n) ? 1 : n * factorial(n - 1)};
// console.log(factorial(5)); // 120
// console.log(factorial(6)); // 720

//3. Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.
function fib(n){
    let numb, arr = [];
    arr[0] = 1;
    arr[1] = 1;
    for (let i = 2; i <= n; i++){
        numb = arr[i-1] + arr[i-2];
        arr.push(numb);
    }
    return arr[n-1];
}
// console.log(fib(3)); // 2
// console.log(fib(7)); // 13
// console.log(fib(77)); // 5527939700884757
function fib2(n) {
	let a = 1;
	let b = 1;
	for (let i = 3; i <= n; i++) {
		let c = a + b;
		a = b;
		b = c;
	}
	return b;
}
// let n = +prompt('введите число - ', '');
// let start = Date.now(); // начинаем отсчёт
// console.log(fib(n));
// let end = Date.now(); // заканчиваем отсчёт
// console.log(`расчёт fib1(${n}) длился ${end - start} мс`); // 
// start = Date.now(); // начинаем отсчёт
// console.log(fib2(n));
// end = Date.now(); // заканчиваем отсчёт
// console.log(`расчёт fib2(${n}) длился ${end - start} мс`); // 

// 4. Напишите функцию printList(list), которая выводит элементы списка по одному.
let list = {
    value: 1, next: {
        value: 2, next: {
            value: 3, next: {
                value: 4, next: null
            }
        }
    }
};
function printList(list){
    Object.entries(list).forEach(function([key, val]) {
        if (val !=null && typeof val == 'object') printList(val);
        console.log(key, ':', val);
    });
}
// printList(list); 
function printList2(list) {
    let tmp = list;
    while (tmp) {
        console.log(tmp.value);
        tmp = tmp.next;
    }
}
// printList2(list);
function printList3(list) {
    console.log(list.value); // выводим текущий элемент
    if (list.next) printList3(list.next); // делаем то же самое для остальной части списка
}
// printList3(list);

// 5. Вывод односвязного списка в обратном порядке
// 5.1. цикл
function printListInverse1(list){
    let tmp = list;
    let arr = [];
    while (tmp) {
        arr.push(tmp.value);
        tmp = tmp.next;
    }
    arr.reverse().forEach((val) => console.log(val));
}
// printListInverse1(list); // 4 3 2 1
// 5.2. рекурсия
function printReverseList(list) {
    if (list.next) printReverseList(list.next);
    console.log(list.value);
}
// printReverseList(list); // 4 3 2 1

/* #1.6.3. Область видимости переменных, замыкание */
// замыкание
const add = x => y => {
    const z = x + y;
    console.log(x + '+' + y + '=' + z);
    return z;
};
// const res = add(3)(6); // 3+6=9
// console.log(res); // 9

// let value = "Сюрприз!";
// function f() {
//     let value = "ближайшее значение";
//     function g() {
//         // debugger; // в консоли: напишите alert(value); Сюрприз!
//         console.log('из функции:', value); // из функции: ближайшее значение
//     }
//     return g;
// }
// let g = f();
// g();
// console.log('после функции:', value); // после функции: Сюрприз!

// 1. 
// name = "John";
// function sayHi() {console.log("Hi, " + name)}
// name = "Pete";
// sayHi(); // что будет показано: "John" или "Pete"?
//2. 
function makeWorker() {
    let name = "Pete";
    return function() {console.log(name)};
}
name = "John";
let work = makeWorker(); // создаём функцию
// work(); // Pete

// 5.
// let phrase = "Hello";
// if (true) {
//     let user = "John";
//     function sayHi() {
//     console.log(`${phrase}, ${user}`);
//     }
// }
// sayHi();

// 6. Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b.
function sum2 (a){
    return function(b){return a + b};
}
// console.log(sum2(5)(7)); // 12

// 7. 
// let x = 1;
// function func() {
//     console.log(x); // ? 1
//     let x = 2;
// }
// func();

// 8. набор "готовых к употреблению" фильтров
arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr.filter((e) => {return e >= 3 && e <= 6})); // (4) [3, 4, 5, 6]
function inBetween(a, b) {
    return function(e) {return e >= a && e <= b};
}
// console.log(arr.filter(inBetween(3, 6))); // (4) [3, 4, 5, 6]
function inArray(arr) {
    return function(x) {return arr.includes(x)};
}
// console.log(arr.filter(inArray([1, 2, 10]))); // (2) [1, 2]

// 9. byField()
users = [
    { name: "Иван", age: 20, surname: "Иванов" },
    { name: "Пётр", age: 18, surname: "Петров" },
    { name: "Анна", age: 19, surname: "Каренина" }
];
function byField(param){
    return (a, b) => a[param] > b[param] ? 1 : -1;
}
// console.log(users.sort((a, b) => a.name > b.name ? 1 : -1));
// console.log(users.sort(byField('age'))); // (3) [{…}, {…}, {…}]

// 10. исправить функцию
// function makeArmy() {
//     let shooters = [];
//     let i = 0;
//     while (i < 10) {
//         let j = i;
//         let shooter = function() {return console.log(j)}; // ф-я должна выводить номер
//         shooters.push(shooter); // и добавлять стрелка в массив
//         i++;
//     }
//     console.log(shooters);
//     return shooters; // ...а в конце вернуть массив из всех стрелков
// }
// let army = makeArmy();
// все стрелки выводят 10 вместо их порядковых номеров (0, 1, 2, 3...)
// army[0](); // 10 от стрелка с порядковым номером 0
// army[1](); // 10 от стрелка с порядковым номером 1
// army[2](); // 10 ...и т.д.

/* #1.6.6. Объект функции, NFE */
/** 1. Измените код makeCounter() так, чтобы счётчик мог уменьшать и устанавливать значение:
	counter() должен возвращать следующее значение (как и раньше).
	counter.set(value) должен устанавливать счётчику значение value.
	counter.decrease() должен уменьшать значение счётчика на 1.
*/
function makeCounter() {
    let count = 0;
    function counter() {return count++};
    counter.set = function(value){return count = value};
    counter.decrease = function(){return count--};
    return counter;
}
// let counter = makeCounter();
// console.log( counter() ); // 0
// console.log( counter() ); // 1
// counter.set(10); // установить новое значение счётчика
// console.log( counter() ); // 10
// counter.decrease(); // уменьшить значение счётчика на 1
// console.log( counter() ); // 10 (вместо 11)

// 2. Сумма с произвольным количеством скобок
let sum3 = function(a){return function(b){return a + b}};
// console.log(sum3(1)(2)); // 3
let sum6 = (a) => (b) => (c) => (d) => (e) => (f) => a + b + c + d + e + f;
// console.log(sum6(0)(1)(2)(3)(4)(5)); // 15

function sumA(a){
    let currentSum = a;
    function f(b) {
        currentSum += b;
        return f;
    }
    f.toString = function() {return currentSum};
    // f[Symbol.toPrimitive] = function() {return currentSum};
    return f;
};
// console.log(String(sumA(1)(2))); // 3
// console.log(String(sumA(0)(1)(2)(3)(4)(5))); // 15
// console.log(String(sumA(5)(-1)(2))); // 6
// console.log(String(sumA(6)(-1)(-2)(-3))); // 0

/** #1.6.8. Планирование: setTimeout и setInterval */
// 1. Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.
// 1.1. Используя setInterval.
function printNumbers(from, to){
    let i = from;
    let counter = setInterval(() => {
        console.log(i);
        if (i === to) clearInterval(counter);
        i++;
    }, 1000);
};
// printNumbers(1, 5); // 1 2 3 4 5
// 1.2. Используя рекурсивный setTimeout.
function printNumbers2(from, to){
    let i = from;
    let counter = setTimeout(function run(){
        console.log(i); 
        i++;
        if (i <= to) setTimeout(run, 1000);
    }, 1000);
}
// printNumbers2(1, 5); // 1 2 3 4 5

/* #1.6.9. Декораторы и переадресация вызова, call/apply */
// 1. Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls. Каждый вызов должен сохраняться как массив аргументов.

function spy(func){
    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }
    wrapper.calls = [];
    // console.log('calls', wrapper.calls);
    return wrapper;
}
function workS(a, b) {console.log(a + b)}; // произвольная функция или метод
workS = spy(workS);
// workS(1, 2); // 3
// workS(4, 5); // 9
// console.log(workS.calls); // ?undefined
for (let args of workS.calls) {
    console.log("call:" + args.join()); // "call:1,2", "call:4,5"
}

// 2. Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.

function delay(f, ms){
    return function(){
        return setTimeout(() => f.apply(this, arguments), ms);
    }
}

// function f(x) {console.log(x)};
// создаём обёртки
// let f1000 = delay(f, 1000);
// let f1500 = delay(f, 1500);
// f1000("test"); // показывает "test" после 1000 мс
// f1500("test"); // показывает "test" после 1500 мс

// 3. Напишите декоратор debounce(f, ms): обёртку, которая откладывает вызовы f, пока не пройдёт ms миллисекунд бездействия.
function debounce(f, ms){
    let timeout;
    return function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => f.apply(this, arguments), ms);
    }
}
// function f(value) {console.log(value)};
// let f2 = debounce(f, 1000);
// f2('text'); // показывает "test" после 1000 мс

// 4. Создайте тормозящий декоратор throttle(f, ms), который возвращает обёртку (запускает функцию не чаще, чем указанное время ms).
function throttle(func, ms){
    let isThrottled = false, savedArgs, savedThis;
    function wrapper() {
        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        func.apply(this, arguments); // (1)
        isThrottled = true;
        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}
// function f(a) {console.log(a)}
// let f1000 = throttle(f, 1000); // f1000 передаёт вызовы f максимум раз в 1000 мс
// f1000(1); // показывает 1
// f1000(2); // (ограничение, 1000 мс ещё нет)
// f1000(3); // (ограничение, 1000 мс ещё нет)
// когда 1000 мс истекли, выводим 3, промежуточное значение 2 было проигнорировано

/* #1.6.10. Привязка контекста к функции */
// 4. Исправьте выделенную строку, чтобы всё работало (других строк изменять не надо).
// function askPassword(ok, fail) {
//     let password = prompt("Password?", '');
//     if (password == "rockstar") ok();
//     else fail();
// }
// user = {
//     name: 'Вася',
//     loginOk() {alert(`${this.name} logged in`)},
//     loginFail() {alert(`${this.name} failed to log in`)},
// };
// askPassword(user.loginOk.bind(user), user.loginFail.bind(user)); // работает

// 5. Использование частично применённой функции для логина
function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}
// user = {
//     name: 'John',
//     login(result) {
//         alert( this.name + (result ? ' logged in' : ' failed to log in') );
//     }
// };
// askPassword(user.login.bind(user, true), user.login.bind(user, false)); // работает)

/* #1.6.11. стрелочные функции */
// из коммента к примеру с обёрткой/декоратором
const defer = (f, ms) => (...args) => setTimeout(() => f(...args), ms)
const sayHi = (who) => alert('Hello, ' + who)
let sayHiDeferred = defer(sayHi, 2000);
// sayHiDeferred("John"); // выводит "Hello, John" через 2 секунды


