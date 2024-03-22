const messageState = {
  preventEvents: [],
};

const setPreventEvents = function (value) {
  messageState.preventEvents = value;
};

const resetPreventEvents = function () {
  messageState.preventEvents.forEach((evt) => {
    document.removeEventListener(evt.type, evt.cb);
  });
};

const recoverPreventEvents = function () {
  messageState.preventEvents.forEach((evt) => {
    document.addEventListener(evt.type, evt.cb);
  });
};

export { recoverPreventEvents, resetPreventEvents, setPreventEvents };
