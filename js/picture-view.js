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
 * Функция добавляет фрагмент с пачкой комментариев на форму
 */
const appendNewComments = function (commentFragment) {
  pictureComments.appendChild(commentFragment);
};

/**
 * Добавляем событие клик на ссылку подгрузки комментариев
 */
commentLoader.addEventListener('click', (evt) => {
  onCommentLoaderClick(evt.target, appendNewComments);
});

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
  bigPictureCancel.addEventListener('click', onPictureCloseClick);
  document.addEventListener('keydown', onPictureCloseKeydown);
  document.body.classList.add('modal-open');
};

export { renderBigPicture };
