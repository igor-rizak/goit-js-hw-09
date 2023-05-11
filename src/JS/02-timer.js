import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
    dateTimeInput: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector("[data-start]"),
    btnReset: document.querySelector("[data-reset]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}

refs.btnReset.addEventListener('click', resetTimer);

function resetTimer() {
    refs.btnReset.disabled = true;
    refs.dateTimeInput.value = '';
    clearInterval(timerId);
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.minutes.textContent = '00';
    refs.seconds.textContent = '00';
    refs.dateTimeInput.disabled = false; 
}


const CURRENT_DATE = new Date();
let SELECTED_DATE = new Date();
let delta;
let timerId;

refs.btnStart.disabled = true;
refs.btnReset.disabled = true;


function startTimer() {
    refs.btnStart.disabled = true;
    refs.btnReset.disabled = false;
    refs.dateTimeInput.disabled = true;
    getDeltaTime();
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < CURRENT_DATE) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.btnStart.disabled = false;
            SELECTED_DATE = selectedDates[0];
      }
  },
};

flatpickr(refs.dateTimeInput, options);


refs.btnStart.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day) < 10 ? addLeadingZero(Math.floor(ms / day)) : Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)) ;

  return { days, hours, minutes, seconds };
}



function getDeltaTime() {
        timerId = setInterval(() => {
        delta = SELECTED_DATE - Date.now();
        const dateOffset = convertMs(delta);
        
        if (delta <= 0) {
             clearInterval(timerId);
        } else {
            clockView(dateOffset);
        }
        }, 1000);
}



function clockView(dateOffset) {
    refs.days.textContent = dateOffset.days;
    refs.hours.textContent = dateOffset.hours;
    refs.minutes.textContent = dateOffset.minutes;
    refs.seconds.textContent = dateOffset.seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

