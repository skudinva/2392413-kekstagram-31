import { errorButton, errorContainer } from './const';
import {
  recoverPreventEvents,
  resetPreventEvents,
  setPreventEvents,
} from './error-state';

const onErrorButtonKeyDown = function (evt) {
  if (evt.key === 'Escape') {
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
