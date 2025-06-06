import iziToast from 'izitoast';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = new Date();

const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysValueEl = document.querySelector('span[data-days]');
const hoursValueEl = document.querySelector('span[data-hours]');
const minutesValueEl = document.querySelector('span[data-minutes]');
const secondsValueEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate.getTime() <= Date.now()) {
      startBtn.setAttribute('disabled', true);
      iziToast.error({
        progressBar: false,
        position: 'topRight',
        animateInside: false,
        message: 'Please choose a date in the future',
      });
      return;
    }

    startBtn.removeAttribute('disabled');
  },
};

flatpickr(datetimePicker, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTimerValues(timeLeftMs) {
  const { days, hours, minutes, seconds } = convertMs(timeLeftMs);
  daysValueEl.textContent = addLeadingZero(days);
  hoursValueEl.textContent = addLeadingZero(hours);
  minutesValueEl.textContent = addLeadingZero(minutes);
  secondsValueEl.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', e => {
  e.target.setAttribute('disabled', true);
  datetimePicker.setAttribute('disabled', true);
  const timerTarget = userSelectedDate.getTime();

  setTimerValues(timerTarget - Date.now());

  const timerInterval = setInterval(() => {
    const timeLeft = timerTarget - Date.now();
    setTimerValues(timeLeft);

    if (timeLeft < 1000) {
      clearInterval(timerInterval);
      datetimePicker.removeAttribute('disabled');
    }
  }, 1000);
});