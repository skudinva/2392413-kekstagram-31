import { isEscapeKey, validateHashtag, validateStringLen } from './utils';

import { showAlert } from './alert';
import { sendData } from './api';
import { FILE_TYPES } from './config';
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
} from './const';
import { showError } from './error';
import { initEffectPicture } from './picture-effect';
import { initScalePicture } from './picture-scale';
import { showSuccess } from './success';

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
 * Инициализация Pristine для валидации формы ввода.
 * Дока: https://pristine.js.org/
 */
const pristine = new Pristine(
  uploadPictureForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  },
  true
);

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
  pristine.reset();
  initScalePicture();
  initEffectPicture();
}

const initUploadPicture = function () {
  uploadPictureInput.setAttribute(
    'accept',
    `image/${FILE_TYPES.join(', image/')}`
  );

  /**
   * Функция для валидации Hashtag.
   * Если вернуло не пустую строку - ошибка.
   *
   * Правила:
   * - хэштег начинается с символа # (решётка);
   * - строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
   * - хеш-тег не может состоять только из одной решётки;
   * - максимальная длина одного хэштега 20 символов, включая решётку;
   * - хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
   * - хэштеги разделяются пробелами;
   * - один и тот же хэштег не может быть использован дважды;
   * - нельзя указать больше пяти хэштегов;
   * - хэштеги необязательны.
   */
  const getHashtagErrorMessage = function (hashtag) {
    const hashtagNormalize = hashtag.trim().toLowerCase().replace(/\s+/g, ' ');

    if (hashtagNormalize === '') {
      return '';
    }

    const hashtagArray = hashtagNormalize.split(' ');
    if (hashtagArray.length === 0) {
      return '';
    }

    if (!hashtagArray.every(validateHashtag)) {
      return 'Начинается с #, до 19 символов и цифр';
    }

    if (new Set(hashtagArray).size !== hashtagArray.length) {
      return 'Есть дублирующие хэштеги';
    }

    if (hashtagArray.length > 5) {
      return 'Нельзя указать больше пяти хэштегов';
    }

    return '';
  };

  /**
   * Добавляем валидатор для поля с HashTag.
   *
   * Проблема: не понятно как можно обойтись одним вызовом getHashtagErrorMessage!!!
   */
  pristine.addValidator(
    hashtagInput,
    (hashtag) => getHashtagErrorMessage(hashtag) === '',
    getHashtagErrorMessage
  );

  /**
   * Добавляем валидатор для поля с комментарием.
   *
   * Правила:
   * - комментарий не обязателен;
   * - длина комментария не может составлять больше 140 символов;
   */
  pristine.addValidator(
    descriptionInput,
    (description) => validateStringLen(description, 140),
    'не более 140 символов'
  );

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
   * Добавляем слушателя на событие submit (отправка формы).
   * Если Pristine возвращает false, значит где-то есть ошибка и
   * необходимо прервать поводение браузера по умолчанию.
   */
  uploadPictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!pristine.validate()) {
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
  });

  /**
   * Добавляем слушателя на событие change поля выбора файла.
   * После выбора файла должна появиться модальная форма. Для этого
   * удаляется класс hidden, а для body задаётся класс modal-open.
   * Для закрытия формы добавляем слушателя на событие
   * keydown на документ и событие click на иконку.
   */
  uploadPictureInput.addEventListener('change', () => {
    const file = uploadPictureInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (!matches) {
      showAlert('Формат файла не поддерживается.');
      return;
    }
    const blobURL = URL.createObjectURL(file);
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
  });
};

export { initUploadPicture, uploadFormClose };
