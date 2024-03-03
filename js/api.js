const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const makeRequest = (route, method, errorText, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = function () {
  return makeRequest(
    '/data',
    'GET',
    'Не удалось загрузить данные. Попробуйте обновить страницу'
  );
};

export { getData };
