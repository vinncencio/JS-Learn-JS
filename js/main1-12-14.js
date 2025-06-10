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
(async() => {
    let gnrtr = generatorAsync(10);
    for await (const iterator of gnrtr) { // перебираем генератор и получаем все значения
        // console.log(`Id:${iterator.id}\nValue: ${iterator.title}\nFuncCompleted: ${iterator.completed}`); // выводим полученные данные
    }
})();

/* #1.13.1. Модули, введение */
import {obj} from './module-one.js';
// console.log(obj.name); // admin
// console.log(import.meta.url); // http://127.0.0.1:5500/js/main1-12-14.js

/* #1.13.2. Экспорт и импорт */
// Импорт объекта с набором функций.
import expObject from './module-two.js';
expObject.first(); // func first
expObject.second(); // func second
expObject.third(); // func third


