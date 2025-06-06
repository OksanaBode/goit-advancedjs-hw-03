import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const state = form.elements.state.value;
  const delay = form.elements.delay.value;
  createNotification(state, delay);
}

const toastDefaultOptions = {
  icon: null,
  progressBar: false,
  position: 'topRight',
  animateInside: false,
};

function createNotification(state, delay) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve() : reject();
    }, delay);
  })
    .then(() => {
      iziToast.success({
        ...toastDefaultOptions,
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        ...toastDefaultOptions,
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}