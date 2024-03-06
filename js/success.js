import { onUploadCloseClick } from './upload-picture';

const templateSuccess = document.querySelector('#success').content;
const successContainer = templateSuccess
  .querySelector('.success')
  .cloneNode(true);
successContainer.classList.add('hidden');
const successButton = successContainer.querySelector('.success__button');

document.body.appendChild(successContainer);

const onSuccessButtonKeyDown = function (evt) {
  if (
    (evt.type === 'keydown' && evt.key === 'Escape') ||
    evt.type === 'click'
  ) {
    successContainer.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessButtonKeyDown);
    onUploadCloseClick(evt);
  }
};

const showSuccess = function () {
  document.addEventListener('keydown', onSuccessButtonKeyDown);
  successContainer.classList.remove('hidden');
};

successButton.addEventListener('click', onSuccessButtonKeyDown);

export { showSuccess };
