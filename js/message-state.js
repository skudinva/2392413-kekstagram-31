const messageState = {
  preventEvents: [],
};

const getPreventEvents = function () {
  return messageState.preventEvents;
};

const setPreventEvents = function (value) {
  messageState.preventEvents = value;
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
