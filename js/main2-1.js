// #3. 2.1.3. Навигация по DOM-элементам
// 2.1.3.1. Дочерние элементы в DOM
// console.log(document.body.firstElementChild); 
// console.log(document.body.firstElementChild.nextElementSibling); 
// console.log(document.body.firstElementChild.nextElementSibling.lastElementChild); 

// 2.1.3.2. Вопрос о соседях
// console.log(document.body.lastChild.nextSibling); // null
// console.log(document.body.children[0].previousSibling); // " "

// 2.1.3.3. Выделите ячейки по диагонали
// td.style.backgroundColor = 'red';
// let table = document.querySelector('#table-one');
// for (let i = 0; i < table.rows.length; i++){
//     table.rows[i].cells[i].style.backgroundColor = 'red';
// }
// console.log(table.rows[0].cells.length);
// for (let i = 0; i < table.rows.length; i++) {
//     let row = table.rows[i];
//     row.cells[i].style.backgroundColor = 'red';
// }


// 2.1.7.5. Создайте дерево из объекта (важность: 5)
// Напишите функцию createTree, которая создаёт вложенный список ul/li из объекта.
let data = {
    "Рыбы": { "форель": {}, "лосось": {} },
    "Деревья": {
        "Огромные": { "секвойя": {}, "дуб": {} },
        "Цветковые": { "яблоня": {}, "магнолия": {} }
    }
};
// let container = document.getElementById('container');
// createTree(container, data); // создаёт дерево в контейнере
/** Результат (дерево):
    Рыбы
        форель
        лосось
    Деревья
        Огромные
            секвойя
            дуб
        Цветковые
            яблоня
            магнолия
Выберите один из двух способов решения этой задачи:
    1. Создать строку, а затем присвоить через container.innerHTML.
    2. Создавать узлы через методы DOM.
Если получится – сделайте оба.
P.S. Желательно, чтобы в дереве не было лишних элементов, в частности -– пустых <ul></ul> на нижнем уровне.*/

function createTree(container, obj) {
    container.innerHTML = createTreeText(obj);
}
function createTreeText(obj) { // отдельная рекурсивная функция
    let li = '';
    let ul;
    for (let key in obj) li += '<li>' + key + createTreeText(obj[key]) + '</li>';
    if (li) ul = '<ul>' + li + '</ul>';
    return ul ?? '';
}

function createTree2(container, obj) {
    container.append(createTreeDOM(obj));
}
function createTreeDOM(obj) {
    if (!Object.keys(obj).length) return; // если нет дочерних элементов, то вызов возвращает undefined и элемент <ul> не будет создан
    let ul = document.createElement('ul');
    for (let key in obj) {
        let li = document.createElement('li');
        li.innerHTML = key;
        let childrenUl = createTreeDOM(obj[key]);
        if (childrenUl) li.append(childrenUl);
        ul.append(li);
    }
    return ul;
}

let container = document.getElementById('container');
// createTree(container, data);
// createTree2(container, data);

// 2.1.7.6. Выведите список потомков в дереве (важность: 5)
// Есть дерево, организованное в виде вложенных списков ul/li.
// Напишите код, который добавит каждому элементу списка <li> количество вложенных в него элементов. Узлы нижнего уровня, без детей – пропускайте.
// Результат: 	Животные [9]...
// let tree = document.getElementById('treeCounts');
// function treeCounts() {
//     let lis = document.getElementsByTagName('li');
//     for (let li of lis) {
//         let descendantsCount = li.getElementsByTagName('li').length; // получить количество всех <li> ниже этого <li>
//         if (!descendantsCount) continue;
//         li.firstChild.data += ' [' + descendantsCount + ']'; // добавить непосредственно к текстовому узлу (добавить к тексту)
//     }
// }
// treeCounts();

// 2.1.7.7. Создайте календарь в виде таблицы (важность: 4)
// Напишите функцию createCalendar(elem, year, month).
// Вызов функции должен создать календарь для заданного месяца month в году year и вставить его в elem.
// Календарь должен быть таблицей, где неделя – это <tr>, а день – это <td>. У таблицы должен быть заголовок с названиями дней недели, каждый день – <th>, первым днём недели должен быть понедельник.

function createCalendar(elem, year, month) {
    let d = new Date(year, month - 1); // месяцы в JS идут от 0 до 11, а не от 1 до 12
    // заголовок таблицы
    let table = '<table><tr>';
    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    for (let i = 0; i < 7; i++){
        table += '<th>' + days[i] + '</th>';
    }
    table += '</tr><tr>';
    // let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    // пробелы для первого ряда с понедельника до первого дня месяца * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }
    // <td> ячейки календаря с датами
    while (d.getMonth() == month - 1) {
        if (getDay(d) == 5 || getDay(d) == 6) table += '<td class="red">' + d.getDate() + '</td>';
        else table += '<td>' + d.getDate() + '</td>';
        if (getDay(d) % 7 == 6) table += '</tr><tr>'; // вс, последний день - перевод строки
        d.setDate(d.getDate() + 1);
    }
    // добить таблицу пустыми ячейками, если нужно 29 30 31 * * * *
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }
    // закрыть таблицу
    table += '</tr></table>';
    elem.innerHTML = table;
    elem.classList.add('table');
    // заголовок перед таблицей
    let title = document.createElement('div');
    title.classList.add('title-calendar');
    const d2 = new Date(year, month - 1);
    const monthTitle = new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(d2);
    title.textContent = `${monthTitle} ${year}`;
    elem.before(title);
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

let cal = document.getElementById('calendar');
createCalendar(cal, 2026, 1);

// 2.1.7.8. Цветные часы с использованием setInterval (важность: 4)
// Создайте цветные часы hh:mm:ss, для стилизации используйте HTML/CSS, JavaScript должен только обновлять время в элементах.
function update2() {
    let clock2 = document.getElementById('clock2');
    let date = new Date(); // текущее время
    let hours = date.getHours();
    // if (hours < 10) hours = '0' + hours;
    clock2.children[0].innerHTML = hours;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    clock2.children[1].innerHTML = minutes;
    let seconds = date.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;
    clock2.children[2].innerHTML = seconds;
}
let timerId2;
const btnStart2 = document.querySelector('#btnStart2');
const btnStop2 = document.querySelector('#btnStop2');
btnStart2.onclick = function clockStart(){
    timerId2 = setInterval(update2, 1000);
    update2(); // чтобы время отображалось сразу после нажатия кнопки 'старт', а не через 1 сек.
}
btnStop2.onclick = function clockStop(){
    clearInterval(timerId2);
    timerId2 = null;
}

// 2.1.7.9. Вставьте HTML в список (важность: 5)
// Напишите код для вставки <li>2</li><li>3</li> между двумя <li>: <li id="one">1</li> <li id="two">4</li>
// const liOne = document.getElementById('one');
// const liIns = '<li>2</li><li>3</li>';
// liOne.insertAdjacentHTML('afterend', liIns);


