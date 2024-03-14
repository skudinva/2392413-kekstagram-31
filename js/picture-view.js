import {
  bigPicture,
  bigPictureCancel,
  bigPictureImgTag,
  commentLoader,
  likesCount,
  pictureComments,
  pictureDescription,
} from './page-elements';
import { initCommentBlock, onCommentLoaderClick } from './picture-comments';
import { getSelectedPicture, resetSelectedPicture } from './picture-state';
import { isEscapeKey } from './utils';

/**
 * Обработчик события клик на закрытие фото (крестик в правом углу)
 * Просто закрываем формыу
 */
const onPictureCloseClick = function () {
  formClose();
};

/**
 * Обработчик события keydown. Должно срабатывать только на Esc.
 * Просто закрываем формыу
 */
const onPictureCloseKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    formClose();
  }
};

/**
 * Закрытие формы просмотра фото.
 */
function formClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureCloseKeydown);
  resetSelectedPicture();
}

/**
 * Функция добавляет фрагмент с пачкой комментариев на форму
 */
const appendNewComments = function (commentFragment) {
  pictureComments.appendChild(commentFragment);
};

/**
 * Отрисовка фото
 */
const renderBigPicture = function () {
  const { url, likes, description } = getSelectedPicture();
  bigPictureImgTag.src = url;
  likesCount.textContent = likes;
  pictureDescription.textContent = description;
  pictureComments.replaceChildren();
  initCommentBlock();
  onCommentLoaderClick(commentLoader, appendNewComments);
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onPictureCloseKeydown);
  document.body.classList.add('modal-open');
};

/**
 * Инициализация формы просмотра фото
 */
const initPictureView = function () {
  bigPictureCancel.addEventListener('click', onPictureCloseClick);

  commentLoader.addEventListener('click', (evt) => {
    onCommentLoaderClick(evt.target, appendNewComments);
  });
};

export { initPictureView, renderBigPicture };
