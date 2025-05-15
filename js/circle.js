let circleBtn = document.querySelector('.circle-btn');

function showCircle(cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);
    return new Promise(resolve => {
        setTimeout(() => {
            div.style.width = radius * 2 + 'px';
            div.style.height = radius * 2 + 'px';
            div.addEventListener('transitionend', function handler() {
                div.removeEventListener('transitionend', handler);
                resolve(div);
                circleBtn.innerText = 'нажать опять';
            });
        }, 0);
    })
};
function goCircle() {
    showCircle(150, 150, 100).then(div => {
        div.classList.add('message-ball');
        div.append("круг");
    });
}

// function showCircle(cx, cy, radius, callback) {
//     let div = document.createElement('div');
//     div.style.width = 0;
//     div.style.height = 0;
//     div.style.left = cx + 'px';
//     div.style.top = cy + 'px';
//     div.className = 'circle';
//     document.body.append(div);
//     setTimeout(() => {
//         div.style.width = radius * 2 + 'px';
//         div.style.height = radius * 2 + 'px';
//     }, 0);
//     div.addEventListener('transitionend', function handler() {
//         div.removeEventListener('transitionend', handler);
//         div.classList.add('message-ball');
//         div.append('окружность');
//         circleBtn.innerText = 'нажать опять';
//     });
// };
// function goCircle() {
//     showCircle(150, 150, 100);
// };
