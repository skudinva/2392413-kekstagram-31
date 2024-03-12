const errorState = {
  preventEvents: [],
};

const getPreventEvents = function () {
  return errorState.preventEvents;
};

const setPreventEvents = function (value) {
  errorState.preventEvents = value;
};

const resetPreventEvents = function () {
  getPreventEvents().forEach((evt) => {
    document.removeEventListener(evt.type, evt.cb);
  });
};

const recoverPreventEvents = function () {
  getPreventEvents().forEach((evt) => {
    document.addEventListener(evt.type, evt.cb);
  });
};

export { recoverPreventEvents, resetPreventEvents, setPreventEvents };
