import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }}, delay);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valueDelay = Number(inputDelay.value);
  let valueStep = Number(inputStep.value);
  let valueAmount = Number(inputAmount.value);
  console.log({valueDelay, valueStep, valueAmount});
  let inputAmountTotal = 0;
  setInterval(() => {
    inputAmountTotal += 1;
    if(inputAmountTotal > valueAmount){
      return
    };
    let position = inputAmountTotal;
    let delay = valueDelay;
    delay += valueStep;
    setTimeout(() => { 
      createPromise(position, delay)
      .then(({position, delay}) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }, valueDelay);
  }, valueStep);
})