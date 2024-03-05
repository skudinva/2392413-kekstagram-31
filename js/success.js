import { onClickUploadClose } from './upload-picture';

const templateSuccess = document.querySelector('#success').content;
const successContainer = templateSuccess
  .querySelector('.success')
  .cloneNode(true);
successContainer.classList.add('hidden');
const successButton = successContainer.querySelector('.success__button');

document.body.appendChild(successContainer);

const showSuccess = function () {
  successContainer.classList.remove('hidden');
};

const onKeyDownSuccessButton = function (evt) {
  if (
    (evt.type === 'keydown' && evt.key === 'Escape') ||
    evt.type === 'click'
  ) {
    successContainer.classList.add('hidden');
    successButton.removeEventListener('keydown', onKeyDownSuccessButton);
    onClickUploadClose(evt);
  }
};

successButton.addEventListener('click', onKeyDownSuccessButton);
document.addEventListener('keydown', onKeyDownSuccessButton);

export { showSuccess };
