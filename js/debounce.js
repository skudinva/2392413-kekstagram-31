const debounce = function (callback, timeoutDelay) {
  let timeoutId = 0;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, rest);
    }, timeoutDelay);
  };
};
