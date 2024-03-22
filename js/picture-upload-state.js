const pictureUploadState = {
  pristine: null,
};

const getPristine = function () {
  return pictureUploadState.pristine;
};

const setPristine = function (value) {
  pictureUploadState.pristine = value;
};

export { getPristine, setPristine };
