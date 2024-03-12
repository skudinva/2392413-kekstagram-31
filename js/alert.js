import { ALERT_SHOW_TIME, alertContainer, errorTitle } from './const';

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
