import { successButton, successContainer } from './const';

const onSuccessButtonKeyDown = function (evt) {
  if (evt.key === 'Escape') {
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
