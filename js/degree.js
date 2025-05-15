function pow(x, deg){
    let numb = x;
    for (i = 1; i < deg; i++) numb *= x;
    return numb;
};

let numb, deg;
const numbInput = document.querySelector('#numbInput');
const numbValue = document.querySelector('#numbValue');
const numbForm = document.querySelector('.numb-input');
numbForm.onsubmit = function(e){
    e.preventDefault();
    numb = parseInt(numbInput.value);
    numbValue.textContent = numb;
    return numb;
}
function numbFormEvent(value){
    numb = parseInt(numbInput.value);
    numbValue.textContent = numb;
    return numb;
}

const degInput = document.querySelector('#degInput');
const degValue = document.querySelector('#degValue');
const degForm = document.querySelector('.deg-input');
degForm.onsubmit = function(e){
    e.preventDefault();
    deg = parseInt(degInput.value);
    degValue.textContent = deg;
    return deg;
}
function degFormEvent(value){
    deg = parseInt(degInput.value);
    degValue.textContent = deg;
    return deg;
}

const resCont = document.querySelector('#result');
function calc(){
    let result = pow(numb, deg).toLocaleString();
    resCont.innerHTML = `результат: ${numb}<sup>${deg}</sup> = ` + result;
    console.log(result);
    return result;
};
// export default degree;