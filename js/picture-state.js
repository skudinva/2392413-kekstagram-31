const pictureState = {
  pictures: null,
  selectedPicture: null,
  lastCommentShowItem: -1,
};

const defaultPictureState = { ...pictureState };

const getPictures = function () {
  return pictureState.pictures;
};

const setPictures = function (value) {
  pictureState.pictures = value;
};

const getPictureById = function (pictureId) {
  return pictureState.pictures.find((element) => element.id === pictureId);
};

const getSelectedPicture = function () {
  return pictureState.selectedPicture;
};

const setSelectedPicture = function (pictureId) {
  pictureState.selectedPicture = getPictureById(pictureId);
};

const resetSelectedPicture = function () {
  pictureState.selectedPicture = defaultPictureState.selectedPicture;
  pictureState.lastCommentShowItem = defaultPictureState.lastCommentShowItem;
};

const getComments = function () {
  return pictureState.selectedPicture.comments;
};

const getLastCommentShowItem = function () {
  return pictureState.lastCommentShowItem;
};

const setLastCommentShowItem = function (value) {
  pictureState.lastCommentShowItem = value;
};

export {
  getComments,
  getLastCommentShowItem,
  getPictures,
  getSelectedPicture,
  resetSelectedPicture,
  setLastCommentShowItem,
  setPictures,
  setSelectedPicture,
};
