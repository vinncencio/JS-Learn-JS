// кофеварка v1.1
class CoffeeMachine {
    constructor(power, capacity) { // power - мощность, capacity - ёмкость кофеварки
        let waterAmount = 0;
        const water_heat_capacity = 4200;
        let timerId;
        this.isRunning = function() {return !!timerId};
        this.power = power; // мощность кофеварки
        this.capacity = capacity; // ёмкость кофеварки
        this.getWaterAmount = function() {return waterAmount}; // геттер количества воды
        this.setWaterAmount = function(amount) { // сеттер количества воды
            if (amount < 0) throw new Error('Значение должно быть положительным');
            if (amount > capacity) throw new Error('Нельзя залить воды больше, чем ' + capacity);
            waterAmount = amount;
        };
        this.getPower = function() {return power}; // геттер мощности
        this.addWater = function(amount) {this.setWaterAmount(waterAmount + amount)}; // добавление воды
        this.setOnReady = function(newOnReady) {onReady = newOnReady}; // сеттер чтобы код снаружи мог назначить свой onReady
        this.getTime = function(){
            let time = waterAmount * water_heat_capacity * 80 / power;
            const timeValue = document.querySelector('#timeValue');
            timeValue.innerText = Math.round(time/1000) + ' сек.';
            return time;
        };
        this.getState = function(){
            const processValue = document.querySelector('#processValue');
            processValue.innerText = this.isRunning();
            console.log(this.isRunning());
        }
        function getTimeToBoil() {
            return waterAmount * water_heat_capacity * 80 / power;
        };
        function onReady() {
            console.log('Кофе готов: ' + waterAmount + ' мл');
            let result = `Кофе готов: ${waterAmount} мл`;
            const resultDiv = document.querySelector('.coffee-result');
            resultDiv.innerText = result;
            // const processValue = document.querySelector('#processValue');
            processValue.innerText = false;
            return result;
        }; // вывод результата
        this.run = function() { // запуск
            timerId = setTimeout(function () {
                timerId = null;
                onReady();
            }, getTimeToBoil());
        };
    }
};

let power = 500;
let capacity = 1000;

const powerInput = document.querySelector('#powerInput');
const powerValue = document.querySelector('#powerValue');
const powerForm = document.querySelector('.coffee-power-input');
const targError = document.querySelector('.error');
powerForm.onsubmit = function(e){
    e.preventDefault();
    power = parseInt(powerInput.value);
    if (power > 0 && power < 10000) {
        powerValue.textContent = power;
        targError.classList.add('none');
    } else {
        targError.classList.remove('none');
        targError.innerText = 'некорректное значение мощности';
    };
};
// function powerFormEvent(value){
//     power = parseInt(powerInput.value);
//     powerValue.textContent = power;
// }

const capacityInput = document.querySelector('#capacityInput');
const capacityValue = document.querySelector('#capacityValue');
const capacityForm = document.querySelector('.coffee-capacity-input');
capacityForm.onsubmit = function(e){
    e.preventDefault();
    capacity = parseInt(capacityInput.value);
    if (capacity > 0 && capacity < 10000) {
        capacityValue.textContent = capacity;
        targError.classList.add('none');
    } else {
        targError.classList.remove('none');
        targError.innerText = 'некорректное значение ёмкости';
    };
};
// function capacityFormEvent(value){
//     capacity = parseInt(capacityInput.value);
//     capacityValue.textContent = capacity;
// }

const createBtn = document.querySelector('#createBtn');
function create(){
    let coffeeMachine = new CoffeeMachine(power, capacity);
    const inputs = document.querySelector('.coffee-data-inputs');
    inputs.innerText = `создана кофеварка с объёмом ${capacity} мл, и мощностью ${power} W.`;
    
    let water = 100;
    if (water > capacity) {water = capacity};
    coffeeMachine.setWaterAmount(water);
    const waterInput = document.querySelector('#waterInput');
    const waterValue = document.querySelector('#waterValue');
    waterValue.textContent = water;
    // const waterBtn = document.querySelector('#waterBtn');
    const waterForm = document.querySelector('.coffee-volume-input');
    waterForm.onsubmit = function(e){
        e.preventDefault();
        let waterAmount = parseInt(waterInput.value);
        water = water + waterAmount;
        // тут нужны проверки
        waterValue.textContent = water;
        coffeeMachine.setWaterAmount(water);
    };
    coffeeMachine.getState();
    const runBtn = document.querySelector('#runBtn');
    runBtn.onclick = function(){
        coffeeMachine.getTime();
        let time = coffeeMachine.getTime();
        timer(time);
        coffeeMachine.run();
        coffeeMachine.getState();
    };
};

// let coffeeMachine = new CoffeeMachine(power, water);
// coffeeMachine.setWaterAmount(450);
// console.log(coffeeMachine.getWaterAmount()); // 450

// console.log('До: ' + coffeeMachine.isRunning()); // До: false
// // coffeeMachine.run();
// console.log('В процессе: ' + coffeeMachine.isRunning()); // В процессе: true
// coffeeMachine.setOnReady(function() {
//     let amount = coffeeMachine.getWaterAmount();
//     console.log('Кофе готов: ' + amount + ' мл'); // Кофе готов: 50 мл
//     console.log('После: ' + coffeeMachine.isRunning()); // После: false
// });

// timer
function timer(time){
    let t = time;
    const minElem = document.querySelector('#min');
    const secElem = document.querySelector('#sec');
    function updtimer(){
        t = t-1000;
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((t % (1000 * 60)) / 1000);
        // console.log(minutes, ':', seconds);
        minElem.innerText = minutes < 10 ? '0' + minutes : minutes;
        secElem.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    let timer1 = setInterval(updtimer, 1000);
    setTimeout(() => {clearInterval(timer1)}, time);
};

