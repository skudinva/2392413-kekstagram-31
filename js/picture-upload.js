import { showAlert } from './alert';
import { sendData } from './api';
import { FILE_TYPES } from './config';
import { showError, showSuccess } from './message';
import {
  descriptionInput,
  effectsPreview,
  hashtagInput,
  submitButton,
  uploadPictureForm,
  uploadPictureFormCancel,
  uploadPictureInput,
  uploadPictureOverlay,
  uploadPicturePreviewImg,
} from './page-elements';
import { initEffectPicture } from './picture-effect';
import { initScalePicture } from './picture-scale';
import { getPristine, setPristine } from './picture-upload-state';
import { pristineInit } from './picture-upload-validate';
import { isEscapeKey } from './utils';

const getBlobURL = function (fileElement) {
  const file = fileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (!matches) {
    showAlert('Формат файла не поддерживается.');
    return;
  }
  return URL.createObjectURL(file);
};

const onUploadFormKeydown = function (evt) {
  if (
    isEscapeKey(evt) &&
    evt.target !== hashtagInput &&
    evt.target !== descriptionInput
  ) {
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
 *
 *
 * Проблема: определить что фокус находится в элементах ввода смог опредлелить только
 * через evt.target. Мне кажется можно как-то по другому.
 */
function uploadFormClose() {
  document.removeEventListener('keydown', onUploadFormKeydown);
  uploadPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPictureInput.value = '';
  descriptionInput.value = '';
  hashtagInput.value = '';
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

  const blobURL = getBlobURL(uploadPictureInput);

  uploadPicturePreviewImg.src = blobURL;
  effectsPreview.forEach(
    (element) => (element.style.backgroundImage = `url(${blobURL})`)
  );

  initScalePicture();
  initEffectPicture();
  uploadPictureOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadFormKeydown);
  uploadPictureFormCancel.addEventListener('click', onUploadCloseClick);
};

/**
 * Блокировка кнопки отправки формы
 */
const blockSubmitButton = function () {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация изображения...';
};

/**
 * Разблокировка кнопки отправки формы
 */
const unblockSubmitButton = function () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
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
  uploadPictureInput.setAttribute(
    'accept',
    `image/${FILE_TYPES.join(', image/')}`
  );

  uploadPictureForm.addEventListener('submit', onUploadPictureFormSubmit);
  uploadPictureInput.addEventListener('change', onPictureInputChange);
};

export { initUploadPicture };
