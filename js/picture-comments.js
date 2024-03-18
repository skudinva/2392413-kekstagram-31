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

export { getNextCommentFragment };
