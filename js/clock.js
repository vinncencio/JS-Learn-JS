let timerPage = document.querySelector('#timer');
class Clock {
    constructor({ template }) {
        this.template = template;
    }
    render() {
        let date = new Date();
        let hours = date.getHours();
        // if (hours < 10) hours = '0' + hours;
        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;
        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;
        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);
        return output;
    }
    start() {
        timerPage.innerText = this.render();
        this.timer = setInterval(() => {
            this.render();
            timerPage.innerText = this.render();
        }, 1000);
    }
    stop() {
        clearInterval(this.timer);
    };
}
let clock = new Clock({template: 'h:m:s'});
timerPage.innerText = clock.render();
const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');
btnStart.onclick = function(){clock.start()};
btnStop.onclick = function(){clock.stop()};

