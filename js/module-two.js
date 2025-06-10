// Экспорт по умолчанию для нескольких функций/переменных/объектов или всего модуля, т.е. по факту импортируется объект с набором функций/переменных/объектов.
function first () {console.log('func first')};
function second() {console.log('func second')};
function third() {console.log('func third')};
export default {first, second, third};
