// #3. 2.1.3. Навигация по DOM-элементам
// 1. Дочерние элементы в DOM
// console.log(document.body.firstElementChild); 
// console.log(document.body.firstElementChild.nextElementSibling); 
// console.log(document.body.firstElementChild.nextElementSibling.lastElementChild); 

// 2. Вопрос о соседях
// console.log(document.body.lastChild.nextSibling); // null
// console.log(document.body.children[0].previousSibling); // " "

// 3. Выделите ячейки по диагонали
// td.style.backgroundColor = 'red';
let table = document.querySelector('#table-one');
for (let i = 0; i < table.rows.length; i++){
    table.rows[i].cells[i].style.backgroundColor = 'red';
}
// console.log(table.rows[0].cells.length);
// for (let i = 0; i < table.rows.length; i++) {
//     let row = table.rows[i];
//     row.cells[i].style.backgroundColor = 'red';
// }


