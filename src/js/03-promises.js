import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayValue = parseInt(form.elements.delay.value);
  const stepValue = parseInt(form.elements.step.value);
  const amountValue = parseInt(form.elements.amount.value);

  if (delayValue < 0 || stepValue < 0 || amountValue < 0) {
    alert('Please enter positive values for all fields.');
  } else {
    for (let i = 0; i < amountValue; i += 1) {
      const position = i + 1;

      createPromise(position, delayValue + stepValue * i)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
  form.reset();
});
