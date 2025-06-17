import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Get form element
const form = document.querySelector('.form');

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const delay = parseInt(formData.get('delay'));
  const state = formData.get('state');

  // Validate input
  if (isNaN(delay) || delay <= 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid positive number for delay',
      position: 'topRight',
    });
    return;
  }

  if (!state) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please select a promise state',
      position: 'topRight',
    });
    return;
  }

  // Create and handle promise
  createPromise(delay, state)
    .then((delay) => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch((delay) => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .finally(() => {
      // Reset form for next use
      form.reset();
    });
});

// Function to create promise with specified delay and state
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
