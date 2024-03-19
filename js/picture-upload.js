import { sendData } from './api';
import { FILE_TYPES } from './config';
import { showErrorData } from './error-data';
import { showError, showSuccess } from './message';
import {
  descriptionInputElement,
  effectsPreviewElement,
  hashtagInputElement,
  inputFieldContainerElement,
  submitButtonElement,
  uploadPictureFormCancelElement,
  uploadPictureFormElement,
  uploadPictureInputElement,
  uploadPictureOverlayElement,
  uploadPicturePreviewImgElement,
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
const getBlobURL = function (fileElement) {
  const file = fileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (!matches) {
    showErrorData('Формат файла не поддерживается.');
    return;
  }
  return URL.createObjectURL(file);
};

const onUploadFormKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    uploadFormClose();
  }
};

const onUploadCloseClick = function () {
  uploadFormClose();
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
function uploadFormClose() {
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
const onPictureInputChange = function () {
  if (!getPristine()) {
    setPristine(pristineInit());
  }

  const blobURL = getBlobURL(uploadPictureInputElement);

  uploadPicturePreviewImgElement.src = blobURL;
  effectsPreviewElement.forEach(
    (element) => (element.style.backgroundImage = `url(${blobURL})`)
  );

  initScalePicture();
  initEffectPicture();
  uploadPictureOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadFormKeydown);
  uploadPictureFormCancelElement.addEventListener('click', onUploadCloseClick);
};

/**
 * Блокировка кнопки отправки формы
 */
const blockSubmitButton = function () {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикация изображения...';
};

/**
 * Разблокировка кнопки отправки формы
 */
const unblockSubmitButton = function () {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

/**
 * Обработчик события submit (отправка формы).
 * Если Pristine возвращает false, значит где-то есть ошибка.
 */
const onUploadPictureFormSubmit = function (evt) {
  evt.preventDefault();
  if (!getPristine().validate()) {
    return;
  }

  blockSubmitButton();
  sendData(new FormData(evt.target))
    .then(() => {
      uploadFormClose();
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
const initUploadPicture = function () {
  uploadPictureInputElement.setAttribute(
    'accept',
    `image/${FILE_TYPES.join(', image/')}`
  );
  uploadPictureFormElement.addEventListener(
    'submit',
    onUploadPictureFormSubmit
  );
  uploadPictureInputElement.addEventListener('change', onPictureInputChange);
  inputFieldContainerElement.addEventListener('keydown', (evt) =>
    evt.stopPropagation()
  );
};

export { initUploadPicture };
