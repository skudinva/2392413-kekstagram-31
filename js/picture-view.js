import {
  COMMENT_LOADING_COUNT,
  bigPicture,
  bigPictureCancel,
  bigPictureImgTag,
  commentCount,
  commentLoader,
  commentsShowCount,
  commentsTotalCount,
  likesCount,
  pictureComments,
  pictureDescription,
} from './const';
import {
  getComments,
  getLastCommentShowItem,
  getSelectedPicture,
  resetSelectedPicture,
  setLastCommentShowItem,
} from './picture-state';
import { addOrRemoveClass, isEscapeKey } from './utils';

/**
 * Создание иконци аватара в списке с комментариями
 */
const createAvatar = function (avatar, name) {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.src = avatar;
  userAvatar.alt = name;
  userAvatar.width = 35;
  userAvatar.height = 35;
  return userAvatar;
};

/**
 * Создание текста коммментария
 */
const createMessage = function (message) {
  const userMessage = document.createElement('p');
  userMessage.classList.add('social__text');
  userMessage.textContent = message;
  return userMessage;
};

/**
 * Создание комментария
 */
const createComment = function ({ avatar, name, message }) {
  const userComment = document.createElement('li');
  userComment.classList.add('social__comment');
  userComment.appendChild(createAvatar(avatar, name));
  userComment.appendChild(createMessage(message));
  return userComment;
};

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

  comments
    .slice(lastCommentShowItem, newLastCommentShowItem)
    .forEach((comment) => {
      pictureComments.appendChild(createComment(comment));
    });

  commentsShowCount.textContent = newLastCommentShowItem;
  setLastCommentShowItem(newLastCommentShowItem);

  if (newLastCommentShowItem >= comments.length) {
    commentLoader.classList.add('hidden');
  }
};

/**
 * Закрытие формы просмотра фото.
 */
function formClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPictureCloseKeydown);
  commentLoader.removeEventListener('click', onCommentLoaderClick);
  resetSelectedPicture();
}

/**
 * Инициализация блока с комментариями.
 */
const initCommentBlock = function () {
  const comments = getComments();
  commentsTotalCount.textContent = comments.length;
  commentCount.classList.remove('hidden');
  addOrRemoveClass(commentLoader, 'hidden', comments.length === 0);
  pictureComments.replaceChildren();
  commentLoader.addEventListener('click', onCommentLoaderClick);
  onCommentLoaderClick();
};

/**
 * Отрисовка фото
 */
const renderBigPicture = function () {
  const { url, likes, description } = getSelectedPicture();
  bigPictureImgTag.src = url;
  likesCount.textContent = likes;
  pictureDescription.textContent = description;
  initCommentBlock();
  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onPictureCloseClick);
  document.addEventListener('keydown', onPictureCloseKeydown);
  document.body.classList.add('modal-open');
};

export { renderBigPicture };
