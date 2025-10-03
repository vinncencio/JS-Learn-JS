// найти:
// 1. Таблицу с id="age-table".
tableAge = document.getElementById('age-table');
console.log(tableAge);

// 2. Все элементы label внутри этой таблицы (их три).
let labels = tableAge.getElementsByTagName('label');
console.log(labels);

// 3. Первый td в этой таблице (со словом «Age»).
let td1 = document.querySelector('td');
console.log(td1);

// 4. Форму form с именем name="search".
let formSearch = document.getElementsByName('search')[0];
console.log(formSearch); // <form name="search">..</form>
let formSearch1 = document.querySelector('form');
console.log(formSearch1); // <form name="search">..</form>

// 5. Первый input в этой форме.
let formSearchInput1 = formSearch1.querySelector('input');
console.log(formSearchInput1); // <input type="text" name="search">

// 6. Последний input в этой форме.
let formSearchInput2 = formSearch1.getElementsByTagName('input')[1];
console.log(formSearchInput2); // <input type="submit" value="Search!">

