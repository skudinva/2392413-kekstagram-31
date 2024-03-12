import { successButton, successContainer } from './const';
import { isEscapeKey } from './utils';

const onSuccessButtonKeyDown = function (evt) {
  if (isEscapeKey(evt)) {
    successFormClose(evt);
  }
};

const onOutsideContainerClick = function (evt) {
  if (evt.target === successContainer) {
    successFormClose(evt);
  }
};

const onSuccessButtonClick = function () {
  successFormClose();
};

function successFormClose() {
  successContainer.remove();
  document.removeEventListener('keydown', onSuccessButtonKeyDown);
  document.removeEventListener('click', onOutsideContainerClick);
}

successButton.addEventListener('click', onSuccessButtonClick);

const showSuccess = function () {
  document.addEventListener('keydown', onSuccessButtonKeyDown);
  document.addEventListener('click', onOutsideContainerClick);
  document.body.appendChild(successContainer);
};

export { showSuccess };
