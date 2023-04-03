import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";

const START_TIME_KEY = 'Start timer go'
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = 'true'

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(options.defaultDate.getTime() > selectedDates[0].getTime()) {
            Notify.failure('Please choose a date in the future');
        }
        else {
        startBtn.disabled = '';
        localStorage.setItem(START_TIME_KEY, JSON.stringify(selectedDates[0].getTime()));
        console.log(selectedDates[0]);
        }
    },
}

flatpickr('[id="datetime-picker"]', options);

class Timer {
    constructor() {
    this.intarvalId = null;
    this.isActive = false;
    }
    start() {
        if(this.isActive){
            return
        }
        const startTime = JSON.parse(localStorage.getItem(START_TIME_KEY))
        this.isActive = true;
    
        this.intarvalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            if(deltaTime <= 1){
                return
            };
            const {days, hours, minutes, seconds} = convertMs(deltaTime);
            const spans = document.querySelectorAll('.value');
            spans[3].textContent = seconds;
            spans[2].textContent = minutes;
            spans[1].textContent = hours;
            spans[0].textContent = days;
        }, 1000);
    }
}
const timer = new Timer();

startBtn.addEventListener('click', () =>{
    timer.start();
})

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs (ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return {days, hours, minutes, seconds};
};