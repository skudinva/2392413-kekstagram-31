import { ALERT_SHOW_TIME } from './config';
import { alertContainer, errorTitle } from './page-elements';

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
