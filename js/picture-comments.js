import { getComments } from './picture-state';

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
 * Комментарий
 * @typedef {{avatar: string, name: string, message: string}} Comment
 */

/**
 * Создание комментария
 * @param {Comment} данные комментария
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
 * Возвращает объект с комментариями
 * @param {number} fromIndex с какого индекса взять комментарии
 * @param {number} toIndex до какого индекса взять коммментарии
 * @returns {Comment[]}
 */
const getNextComments = function (fromIndex, toIndex) {
  return getComments().slice(fromIndex, toIndex);
};

/**
 * Возвращает фрагмент с очередным блоком с комментариями
 * @param {Comment[]} comments с какого индекса взять комментарии
 * @returns {DocumentFragment}
 */
const renderComments = function (comments) {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });
  return commentFragment;
};

/**
 * Возвращает объект с комментариями
 * @param {number} fromIndex с какого индекса взять комментарии
 * @param {number} toIndex до какого индекса взять коммментарии
 * @returns {DocumentFragment}
 */
const renderNextComments = function (fromIndex, toIndex) {
  return renderComments(getNextComments(fromIndex, toIndex));
};

export { getNextComments, renderComments, renderNextComments };
