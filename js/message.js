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

/**
 * Создание формы сообщение
 * @param {HTMLElement} messageButton указатель на кнопку закрытия формы
 * @param {HTMLElement} messageContainer указатель на контейнер формы
 * @returns {function} функция для отображения формы
 */
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

  /**
   * Показать форму
   * @param {[{ type: string, cb: EventListenerOrEventListenerObject }]} preventEvents при отображения формы события удаляются и восстанавливаются в момент закрытия формы
   */
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
