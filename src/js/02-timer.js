import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const datePicker = document.querySelector('#datetime-picker');

let timer = null;
let flatpickrInstance = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickrInstance = flatpickr('#datetime-picker', options);
btnStart.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCounter() {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;
  btnStart.disabled = true;
  datePicker.disabled = true;

  if (timeDifference < 0) {
    clearInterval(timer);
    btnStart.disabled = false;
    datePicker.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

btnStart.addEventListener('click', () => {
  const selectedDates = flatpickrInstance.selectedDates;
  updateCounter(selectedDates[0]);
  timer = setInterval(updateCounter, 1000);
});
