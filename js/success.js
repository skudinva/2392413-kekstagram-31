import { successButton, successContainer } from './page-elements';
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

const showSuccess = function () {
  document.addEventListener('keydown', onSuccessButtonKeyDown);
  document.addEventListener('click', onOutsideContainerClick);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.body.appendChild(successContainer);
};

export { showSuccess };
