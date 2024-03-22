const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

/**
 * Выполнить запрос к серверу
 * @param {string} route
 * @param {string} method
 * @param {string} errorText
 * @param {FormData} body
 * @returns {Promise<Response>}
 */
const makeRequest = async function (route, method, errorText, body = null) {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch {
    throw new Error(errorText);
  }
};
/**
 * Получить данные от сервера
 * @returns
 */
const getData = function () {
  return makeRequest(
    '/data',
    'GET',
    'Не удалось загрузить данные. Попробуйте обновить страницу'
  );
};

/**
 * Отправить данные на сервер
 * @param {FormData} body
 * @returns
 */
const sendData = function (body) {
  return makeRequest(
    '/',
    'POST',
    'Не удалось отправить данные. Попробуйте обновить страницу',
    body
  );
};

export { getData, sendData };
