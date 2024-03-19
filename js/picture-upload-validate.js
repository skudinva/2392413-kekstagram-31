import { DESCRIPTION_MAX_LENGTH, HASHTAG_MAX_COUNT } from './config';
import {
  descriptionInputElement,
  hashtagInputElement,
  uploadPictureFormElement,
} from './page-elements';
import { validateHashtag, validateStringLen } from './utils';

const pristineInit = function () {
  /**
   * Инициализация Pristine для валидации формы ввода.
   * Дока: https://pristine.js.org/
   */
  const pristine = new Pristine(
    uploadPictureFormElement,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
      errorTextClass: 'img-upload__field-wrapper--error',
    },
    true
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
   *
   * @param {string} hashtag
   * @returns {string}
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

    if (hashtagArray.length > HASHTAG_MAX_COUNT) {
      return `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэштегов`;
    }

    return '';
  };

  /**
   * Добавляем валидатор для поля с HashTag.
   *
   * Проблема: не понятно как можно обойтись одним вызовом getHashtagErrorMessage!!!
   */
  pristine.addValidator(
    hashtagInputElement,
    (hashtag) => getHashtagErrorMessage(hashtag) === '',
    getHashtagErrorMessage
  );

  /**
   * Добавляем валидатор для поля с комментарием.
   *
   * Правила:
   * - комментарий не обязателен;
   * - длина комментария не может составлять больше DESCRIPTION_MAX_LENGTH символов;
   */
  pristine.addValidator(
    descriptionInputElement,
    (description) => validateStringLen(description, DESCRIPTION_MAX_LENGTH),
    `не более ${DESCRIPTION_MAX_LENGTH} символов`
  );

  return pristine;
};

export { pristineInit };
