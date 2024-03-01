import {
  bigPicture,
  bigPictureCancel,
  commentBlock,
  commentsShowCount,
  commentsTotalCount,
  img,
  likes,
  newComment,
  pictureComments,
  pictureDescription,
} from './const';

const prepareComment = function (comment) {
  const userComment = document.createElement('li');
  userComment.classList.add('social__comment');
  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.src = comment.avatar;
  userAvatar.alt = comment.name;
  userAvatar.width = '35';
  userAvatar.height = '35';
  userComment.appendChild(userAvatar);
  const userMessage = document.createElement('p');
  userMessage.classList.add('social__text');
  userMessage.textContent = comment.message;
  userComment.appendChild(userMessage);
  return userComment;
};

const onClickClose = function (evt) {
  if (
    (evt.type === 'keydown' && evt.key === 'Escape') ||
    evt.type === 'click'
  ) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onClickClose);
  }
};

export const onClickPicture = function (picture) {
  img.src = picture.url;
  likes.textContent = picture.likes;
  commentsShowCount.textContent = picture.comments.length;
  commentsTotalCount.textContent = picture.comments.length;
  pictureDescription.textContent = picture.description;
  pictureComments.replaceChildren();
  picture.comments.forEach((element) =>
    pictureComments.appendChild(prepareComment(element))
  );

  bigPicture.classList.remove('hidden');
  commentBlock.classList.add('hidden');
  newComment.classList.add('hidden');

  bigPictureCancel.addEventListener('click', onClickClose);
  document.addEventListener('keydown', onClickClose);
  document.body.classList.add('modal-open');
};
