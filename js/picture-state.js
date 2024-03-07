import { getUniqueRandomArrayElement } from './utils';

const pictureState = {
  pictures: null,
  selectedPicture: null,
  lastCommentShowItem: -1,
  selectedFilter: null,
};

const defaultPictureState = { ...pictureState };

const getPictures = function () {
  const currentFilter = pictureState.selectedFilter.id;
  if (currentFilter === 'filter-default') {
    return pictureState.pictures;
  } else if (currentFilter === 'filter-random') {
    return getUniqueRandomArrayElement(pictureState.pictures, 10);
  } else if (currentFilter === 'filter-discussed') {
    return pictureState.pictures
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length);
  }
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

const getSelectedFilter = function () {
  return pictureState.selectedFilter;
};

const setSelectedFilter = function (value) {
  pictureState.selectedFilter = value;
};

export {
  getComments,
  getLastCommentShowItem,
  getPictures,
  getSelectedFilter,
  getSelectedPicture,
  resetSelectedPicture,
  setLastCommentShowItem,
  setPictures,
  setSelectedFilter,
  setSelectedPicture,
};
