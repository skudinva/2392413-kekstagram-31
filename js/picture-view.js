import { COMMENT_LOADING_COUNT } from './config';
import {
  bigPicture,
  bigPictureCancel,
  bigPictureCommentCount,
  bigPictureCommentLoader,
  bigPictureComments,
  bigPictureCommentsShowCount,
  bigPictureCommentsTotalCount,
  bigPictureDescription,
  bigPictureImgTag,
  bigPictureLikesCount,
} from './page-elements';
import { getNextCommentFragment } from './picture-comments';
import {
  getComments,
  getLastCommentShowItem,
  getSelectedPicture,
  resetSelectedPicture,
  setLastCommentShowItem,
} from './picture-state';
import { addOrRemoveClass, isEscapeKey } from './utils';

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
 * Обработчиск собития клик на ссылку "Загрузить еще".
 * Подгрузка комментариев. Количество комментариев для подгрузки в
 * константе COMMENT_LOADING_COUNT.
 * Если все комментарии подгружены, то скрываем ссылку.
 */
const onCommentLoaderClick = function () {
  const comments = getComments();

  const lastCommentShowItem = Math.max(getLastCommentShowItem(), 0);
  const newLastCommentShowItem = Math.min(
    lastCommentShowItem + COMMENT_LOADING_COUNT,
    comments.length
  );
  const newComments = getNextCommentFragment(
    lastCommentShowItem,
    newLastCommentShowItem
  );
  bigPictureComments.appendChild(newComments);

  bigPictureCommentsShowCount.textContent = newLastCommentShowItem;
  setLastCommentShowItem(newLastCommentShowItem);
  addOrRemoveClass(
    bigPictureCommentLoader,
    'hidden',
    newLastCommentShowItem >= comments.length
  );
};

/**
 * Инициализация блока с комментариями.
 */
const initCommentBlock = function () {
  bigPictureCommentsTotalCount.textContent = getComments().length;
  bigPictureCommentCount.classList.remove('hidden');
};

/**
 * Отрисовка фото
 */
const renderBigPicture = function () {
  const { url, likes, description } = getSelectedPicture();
  bigPictureImgTag.src = url;
  bigPictureLikesCount.textContent = likes;
  bigPictureDescription.textContent = description;
  bigPictureComments.replaceChildren();
  initCommentBlock();
  onCommentLoaderClick();
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onPictureCloseKeydown);
  document.body.classList.add('modal-open');
};

/**
 * Инициализация формы просмотра фото
 */
const initPictureView = function () {
  bigPictureCancel.addEventListener('click', onPictureCloseClick);
  bigPictureCommentLoader.addEventListener('click', onCommentLoaderClick);
};

export { initPictureView, renderBigPicture };
