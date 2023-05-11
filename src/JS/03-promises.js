import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  event.preventDefault();

  let delayInput = Number(event.currentTarget.elements.delay.value);
  let stepInput = Number(event.currentTarget.elements.step.value);
  let amountInput = Number(event.currentTarget.elements.amount.value); 

  for (let i = 1; i <= amountInput; i += 1) {
    if (delayInput > 0 && stepInput > 0 && amountInput >= 0) {
      createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms` 
        );
      });

    delayInput += stepInput;

    } else {
         Notiflix.Notify.failure(
          `❌ Enter a value greater than zero`
        );
    }
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


