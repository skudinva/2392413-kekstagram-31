import {
  recoverPreventEvents,
  resetPreventEvents,
  setPreventEvents,
} from './error-state';
import { errorButton, errorContainer } from './page-elements';
import { isEscapeKey } from './utils';

const onErrorButtonKeyDown = function (evt) {
  if (isEscapeKey(evt)) {
    errorFormClose();
  }
};

const onOutsideContainerClick = function (evt) {
  if (evt.target === errorContainer) {
    errorFormClose();
  }
};

const onErrorButtonClick = function () {
  errorFormClose();
};

function errorFormClose() {
  errorContainer.remove();
  document.removeEventListener('keydown', onErrorButtonKeyDown);
  document.removeEventListener('click', onOutsideContainerClick);
  recoverPreventEvents();
  setPreventEvents([]);
}

errorButton.addEventListener('click', onErrorButtonClick);

const showError = function (preventEvents) {
  setPreventEvents(preventEvents);
  resetPreventEvents();
  document.addEventListener('keydown', onErrorButtonKeyDown);
  document.addEventListener('click', onOutsideContainerClick);
  document.body.appendChild(errorContainer);
};

export { showError };
