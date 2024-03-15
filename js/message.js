import {
  recoverPreventEvents,
  resetPreventEvents,
  setPreventEvents,
} from './error-state';
import {
  errorButton,
  errorContainer,
  successButton,
  successContainer,
} from './page-elements';
import { isEscapeKey } from './utils';

const message = function (messageButton, messageContainer) {
  const onMessageButtonKeyDown = function (evt) {
    if (isEscapeKey(evt)) {
      messageFormClose();
    }
  };

  const onOutsideContainerClick = function (evt) {
    if (evt.target === messageContainer) {
      messageFormClose();
    }
  };

  const onMessageButtonClick = function () {
    messageFormClose();
  };

  function messageFormClose() {
    messageContainer.remove();
    document.removeEventListener('keydown', onMessageButtonKeyDown);
    document.removeEventListener('click', onOutsideContainerClick);
    recoverPreventEvents();
    setPreventEvents([]);
  }

  const showMessage = function (preventEvents = []) {
    setPreventEvents(preventEvents);
    resetPreventEvents();
    document.addEventListener('keydown', onMessageButtonKeyDown);
    document.addEventListener('click', onOutsideContainerClick);
    messageButton.addEventListener('click', onMessageButtonClick);
    document.body.appendChild(messageContainer);
  };
  return showMessage;
};

const showError = message(errorButton, errorContainer);
const showSuccess = message(successButton, successContainer);

export { showError, showSuccess };
