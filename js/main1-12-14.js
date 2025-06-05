/* #1.12.1. Генераторы */
let rangeNumb = {
    from: 1,
    to: 5,
    // [Symbol.iterator]: function* () {
    *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
        for (let value = this.from; value <= this.to; value++) yield value;
    }
};
console.log([...rangeNumb]); // (5) [1, 2, 3, 4, 5]

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
console.log(strPass); // 0..9A..Za..z // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

// 1. Сеяный псевдослучайный генератор
function* pseudoRandom(seed) {
    let value = seed;
    while (true) {
        value = value * 16807 % 2147483647
        yield value;
    }
}
let generator = pseudoRandom(1);
console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073

// console.log(1 * 16807 % 2147483647); // 16807
// console.log(16807 * 16807 % 2147483647); // 282475249
// console.log(282475249 * 16807 % 2147483647); // 1622650073

