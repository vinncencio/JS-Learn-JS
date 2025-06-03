/* #1.10.1. Обработка ошибок, try..catch */
try {
    // lavar; // ошибка, переменная не определена
} catch(err) {
    // console.log(err.name); // ReferenceError
    // console.log(err.message); // lavar is not defined
    // console.log(err.stack); // ReferenceError: lavar is not defined at (...стек вызовов)
    // console.log(err); // ReferenceError: lavar is not defined at (...стек вызовов)
} finally {
    // console.log('finish');
}
// console.log('outer finish');

/* #1.10.2. Пользовательские ошибки, расширение Error */
class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = "FormatError";
    }
}
let err = new FormatError("ошибка форматирования");
// console.log( err.message ); // ошибка форматирования
// console.log( err.name ); // FormatError
// console.log( err.stack ); // FormatError: ошибка форматирования at main1-7-9.js:275:11
// console.log( err instanceof FormatError ); // true
// console.log( err instanceof SyntaxError ); // true (потому что наследует от SyntaxError)

/* #1.11.2. Промисы */
// let promise = new Promise(delay(2000), delay(4000))
// .then( // resolve запустит первую функцию, переданную в .then
//     result => console.log(result), // выведет "done!" через одну секунду
//     error => console.log(error) // не будет запущена
// );
function delay(ms) {
    return function(){setTimeout(() => console.log("done!"), ms)};
}

// 1. Что выведет код ниже?
// let promise2 = new Promise(function(resolve, reject) {
//     resolve(1);
//     setTimeout(() => resolve(2), 1000);
// });
// promise2.then(console.log); // 1

// 2. Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен» через ms миллисекунд, так чтобы мы могли добавить к нему .then:
function delay2(ms) {
    // return new Promise(function(resolve, reject){
    //     setTimeout(() => resolve("value"), ms);
    // });
    return new Promise(resolve => setTimeout(resolve, ms));
}
// delay2(3000).then(() => console.log('выполнилось через 3 секунды'));

/* #1.11.3. Цепочка промисов */
// new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)
// ).then((result) => {
//     console.log(result); // 1
//     return new Promise((resolve, reject) => { // (*)
//         setTimeout(() => resolve(result * 3), 1000);
//     });
// }).then((result) => { // (**)
//     console.log(result); // 3
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve(result * 3), 1000);
//     });
// }).then((result) => console.log(result)); // 9

// в каком порядке числа выведутся в консоль:
// new Promise(resolve => resolve())
//     .then(() => {
//         console.log(1);
//         return new Promise(resolve => resolve());
//     }).then(() => console.log(2));
// new Promise(resolve => resolve())
//     .then(() => console.log(3))
//     .then(() => console.log(4))
//     .then(() => console.log(5));
// 1, 3, 4, 5, 2.

/* #1.11.4. Промисы: обработка ошибок */
// проброс и обработка ошибки: catch 1 (*) -> catch 2 (**) -> then
new Promise((resolve, reject) => {
    throw new Error("Новая Ошибка!"); // создаём новую ошибку
}).catch(function(error) { // (*)
    if (error instanceof SyntaxError) { /* обрабатываем ошибку */
    } else {
        // console.log("Не могу обработать ошибку"); // (1)
        throw error; // пробрасывает эту или другую ошибку в следующий catch
    }
}).then(function() { /* не выполнится */
}).catch(error => { // (**)
    // console.log(`Неизвестная ошибка: ${error}`); // (2)
}); // если ничего не возвращаем => выполнение продолжается в нормальном режиме

// 1. Выполнится ли .catch?
// new Promise(function(resolve, reject) {
// 	setTimeout(() => {
// 		throw new Error("Whoops!");
// 	}, 1000);
// }).catch(alert); // Uncaught Error: Whoops!

/* #1.11.5. Promise API, статические методы промисов */
// Promise.all([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).catch(console.log); // Error: Ошибка!

// Promise.allSettled([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(console.log); // (3) [{…}, {…}, {…}]

// let urls = [
//     'https://api.github.com/users/iliakan',
//     'https://api.github.com/users/remy',
//     'https://api.github.com/users/jeresig',
//     'https://no-such-url'
// ];
// let res = [];
// Promise.allSettled(urls.map(url => fetch(url)))
//     .then(results => { // (*)
//         results.forEach((result, num) => {
//             if (result.status == "fulfilled") {
//                 res.push(`${urls[num]}: ${result.value.status}`);
//             }
//             if (result.status == "rejected") {
//                 res.push(`${urls[num]}: ${result.reason}`);
//             }
//         });
//         console.log(results);
//     });
// console.log(res);

// Promise.race([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(console.log); // 1

// Promise.any([
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 1000)),
// 	new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ещё одна ошибка!")), 2000)),
//     // new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
//     // new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
// ])
// .then(console.log) // 2
// .catch(error => {
// 	console.log(error.constructor.name); // AggregateError
// 	console.log(error.errors[0]); // Error: Ошибка!
// 	console.log(error.errors[1]); // Error: Ещё одна ошибка!
// });

/* #1.11.7. Микрозадачи */

// В каком порядке выполнится код?
// const promise = new Promise(res => setTimeout(() => res('Resolve in Promise'), 1000));
// console.log('begin');
// promise.then(res => {return res}).then(alert);
// console.log('end');
// begin, end, alert

/* #1.11.8. Async/await */
// 1. Перепишите один из примеров раздела Цепочка промисов, используя async/await вместо .then/catch:
function loadJson(url) {
    return fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
}
// loadJson('no-such-user.json') // (1)
//     .catch(alert); // Error: 404

async function loadJsonAsync(url) {
    const response = await fetch(url);
    if (response.status == 200) return response.json();
    else throw new Error(response.status);
}
// loadJsonAsync('no-such-user.json') // (2)
//     .catch(alert); // Error: 404

async function loadJson(url) { // (1)
    let response = await fetch(url); // (2)
    if (response.status == 200) {
        let json = await response.json(); // (3)
        return json;
    }
    throw new Error(response.status);
}
// loadJson('no-such-user.json')
//     .catch(alert); // Error: 404 (4)

// 3. Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}
function f() {
    wait().then(res => console.log(res)); // вызвать wait() и дождаться результата "10" от async–функции
}
f();
