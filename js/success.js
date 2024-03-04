// const ALERT_SHOW_TIME = 5000;

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

const onClickSuccessButton = function () {
  successContainer.classList.add('hidden');
};

successButton.addEventListener('click', onClickSuccessButton);

export { showSuccess };
