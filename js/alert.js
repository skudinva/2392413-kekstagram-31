const ALERT_SHOW_TIME = 5000;

const alertTemplate = document.querySelector('#data-error').content;
const alertContainer = alertTemplate
  .querySelector('.data-error')
  .cloneNode(true);
const errorTitle = alertContainer.querySelector('.data-error__title');

const showAlert = function (alertText) {
  if (alertText) {
    errorTitle.textContent = alertText;
  }
  document.body.appendChild(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert };
