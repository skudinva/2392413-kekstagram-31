const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const img = bigPictureImg.querySelector('img');
const likes = bigPicture.querySelector('.social__likes');
const commentsShowCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureComments = bigPicture.querySelector('.social__comments');
const commentBlock = bigPicture.querySelector('.social__comment-count');
const newComment = bigPicture.querySelector('.comments-loader');

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

const onClickClose = function(evt) {
  if (evt.type === 'keydown' && evt.key === 'Escape'
    || evt.type === 'click') {
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
  picture.comments.forEach(
    (element) =>
      pictureComments.appendChild(prepareComment(element))
  );

  bigPicture.classList.remove('hidden');
  commentBlock.classList.add('hidden');
  newComment.classList.add('hidden');

  bigPictureCancel.addEventListener('click', onClickClose);
  document.addEventListener('keydown', onClickClose);
  document.body.classList.add('modal-open');
};
