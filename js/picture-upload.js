import { sendData } from './api';
import { showError, showSuccess } from './message';
import {
  descriptionInputElement,
  effectsPreviewElement,
  hashtagInputElement,
  inputFieldContainerElement,
  picturePreviewElement,
  submitButtonElement,
  uploadPictureCancelElement,
  uploadPictureFormElement,
  uploadPictureInputElement,
  uploadPictureOverlayElement,
} from './page-elements';
import { initEffectPicture } from './picture-effect';
import { initScalePicture } from './picture-scale';
import { getPristine, setPristine } from './picture-upload-state';
import { pristineInit } from './picture-upload-validate';
import { isEscapeKey } from './utils';

/**
 * Возвращает ссылку на blob фото
 * @param {Elemetn} fileElement указатель на input type="file"
 * @returns {string|null}
 */
const getBlobURL = (fileElement) => URL.createObjectURL(fileElement.files[0]);

const onUploadFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadForm();
  }
};

const onUploadCloseClick = () => {
  closeUploadForm();
};

/**
 * Обработчик события закрытия формы. Срабатывает на Esc и Click
 * по иконке на форме.
 * Необходимо:
 * - вернуть класс hidden;
 * - у элемента body удаляется класс modal-open;
 * - у элемента с выбранным файлом необходимо сбросить value чтобы повторно можно
 * было загрузить одит и тот же файл.
 *
 * Нюанс: если фокус находится в поле ввода хэштега или комментария, нажатие на
 * Esc не должно приводить к закрытию формы редактирования изображения.
 */
function closeUploadForm() {
  document.removeEventListener('keydown', onUploadFormKeydown);
  uploadPictureOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPictureInputElement.value = '';
  descriptionInputElement.value = '';
  hashtagInputElement.value = '';
  getPristine().reset();
  initScalePicture();
  initEffectPicture();
}

/**
 * Обработчик собития change поля с выбором файла.
 * После выбора файла должна появиться модальная форма. Для этого
 * удаляется класс hidden, а для body задаётся класс modal-open.
 * Для закрытия формы добавляем слушателя на событие
 * keydown на документ и событие click на иконку.
 */
const onPictureInputChange = () => {
  if (!getPristine()) {
    setPristine(pristineInit());
  }

  const blobURL = getBlobURL(uploadPictureInputElement);

  picturePreviewElement.src = blobURL;
  effectsPreviewElement.forEach(
    (element) => (element.style.backgroundImage = `url(${blobURL})`)
  );

  initScalePicture();
  initEffectPicture();
  uploadPictureOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadFormKeydown);
  uploadPictureCancelElement.addEventListener('click', onUploadCloseClick);
};

/**
 * Блокировка кнопки отправки формы
 */
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикация изображения...';
};

/**
 * Разблокировка кнопки отправки формы
 */
const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

/**
 * Обработчик события submit (отправка формы).
 * Если Pristine возвращает false, значит где-то есть ошибка.
 */
const onUploadPictureFormSubmit = (evt) => {
  evt.preventDefault();
  if (!getPristine().validate()) {
    return;
  }

  blockSubmitButton();
  sendData(new FormData(evt.target))
    .then(() => {
      closeUploadForm();
      showSuccess();
    })
    .catch(() => {
      showError([{ type: 'keydown', cb: onUploadFormKeydown }]);
    })
    .finally(unblockSubmitButton);
};

/**
 * Инициализация формы загрузки фото.
 */
const initUploadPicture = () => {
  uploadPictureInputElement.setAttribute(
    'accept',
    'image/*'
  );
  uploadPictureFormElement.addEventListener(
    'submit',
    onUploadPictureFormSubmit
  );
  uploadPictureInputElement.addEventListener('change', onPictureInputChange);
  inputFieldContainerElement.addEventListener('keydown', (evt) => evt.stopPropagation()
  );
};

export { initUploadPicture };
