import { COMMENT_LOADING_COUNT } from './config';
import {
  bigPictureCommentCount,
  bigPictureCommentsShowCount,
  bigPictureCommentsTotalCount,
} from './page-elements';
import {
  getComments,
  getLastCommentShowItem,
  setLastCommentShowItem,
} from './picture-state';
import { addOrRemoveClass } from './utils';

/**
 * Создание иконци аватара в списке с комментариями
 * @param {string} avatar ссылка на картинку с аватар
 * @param {string} name пользователь
 * @returns {DocumentFragment}
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
 * @param {string} message текст комментария
 * @returns {DocumentFragment}
 */
const createMessage = function (message) {
  const userMessage = document.createElement('p');
  userMessage.classList.add('social__text');
  userMessage.textContent = message;
  return userMessage;
};

/**
 * Создание комментария
 * @param {{avatar: string, name: string, message: string}} данные комментария
 * @returns {DocumentFragment}
 */
const createComment = function ({ avatar, name, message }) {
  const userComment = document.createElement('li');
  userComment.classList.add('social__comment');
  userComment.appendChild(createAvatar(avatar, name));
  userComment.appendChild(createMessage(message));
  return userComment;
};

/**
 * Возвращает фрагмент с очередным блоком с комментариями
 * @param {number} fromIndex с какого индекса взять комментарии
 * @param {number} toIndex до какого индекса взять коммментарии
 * @returns {DocumentFragment}
 */
const getNextCommentFragment = function (fromIndex, toIndex) {
  const comments = getComments();
  const commentFragment = document.createDocumentFragment();
  comments.slice(fromIndex, toIndex).forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });
  return commentFragment;
};

/**
 * Callback для подгрузки комментариев
 * @callback pushComments
 * @param {DocumentFragment} fragment пулл комментариев
 * @returns {void}
 */

/**
 * Обработчиск собития клик на ссылку "Загрузить еще".
 * Подгрузка комментариев. Количество комментариев для подгрузки в
 * константе COMMENT_LOADING_COUNT.
 * Если все комментарии подгружены, то скрываем ссылку.
 * @param {Element} loaderButton указатель на ссылку подгрузки комментариев
 * @param {pushComments} cbPushComment callback функция для добавления комментариев
 */
const onCommentLoaderClick = function (loaderButton, cbPushComment) {
  const comments = getComments();

  const lastCommentShowItem = Math.max(getLastCommentShowItem(), 0);
  const newLastCommentShowItem = Math.min(
    lastCommentShowItem + COMMENT_LOADING_COUNT,
    comments.length
  );

  cbPushComment(
    getNextCommentFragment(lastCommentShowItem, newLastCommentShowItem)
  );

  bigPictureCommentsShowCount.textContent = newLastCommentShowItem;
  setLastCommentShowItem(newLastCommentShowItem);
  addOrRemoveClass(
    loaderButton,
    'hidden',
    newLastCommentShowItem >= comments.length
  );
};

/**
 * Инициализация блока с комментариями.
 */
const initCommentBlock = function () {
  const comments = getComments();
  bigPictureCommentsTotalCount.textContent = comments.length;
  bigPictureCommentCount.classList.remove('hidden');
};

export { initCommentBlock, onCommentLoaderClick };
