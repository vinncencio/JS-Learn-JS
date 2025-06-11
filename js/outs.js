export function out1(){
    const btn = document.querySelector('#dynImport');
    btn.insertAdjacentHTML('afterend', '<p>вывод 1</p>');
    console.log('вывод 1');
}
export function out2(){
    const btn = document.querySelector('#dynImport2');
    btn.insertAdjacentHTML('afterend', '<p>вывод 2</p>');
    console.log('вывод 2');
}
export default function(){
    const btn = document.querySelector('#dynImport2');
    btn.insertAdjacentHTML('afterend', '<p>дефолтный вывод</p>');
    console.log('дефолтный вывод');
}
