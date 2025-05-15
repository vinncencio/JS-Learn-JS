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




