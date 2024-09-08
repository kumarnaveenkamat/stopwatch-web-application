let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-list');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let seconds = Math.floor((difference / 1000) % 60);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hoursElement.innerHTML = formatNumber(hours);
    minutesElement.innerHTML = formatNumber(minutes);
    secondsElement.innerHTML = formatNumber(seconds);
    millisecondsElement.innerHTML = formatNumber(milliseconds);
}

function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    hoursElement.innerHTML = '00';
    minutesElement.innerHTML = '00';
    secondsElement.innerHTML = '00';
    millisecondsElement.innerHTML = '00';
    lapList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (running) {
        let lapTime = hoursElement.innerHTML + ':' +
                      minutesElement.innerHTML + ':' +
                      secondsElement.innerHTML + ':' +
                      millisecondsElement.innerHTML;
        let li = document.createElement('li');
        li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(li);
    }
}
