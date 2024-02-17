/* eslint-disable no-console */
function strLenCheck(str, len) {
  return String(str).length <= len;
}

function palindromeCheck(str) {
  const clearStr = String(str).replaceAll(" ", "").toLowerCase();
  if (clearStr.length === 0) {
    return false;
  }
  for (let i = 0; i < Math.round(clearStr.length / 2); i++) {
    if (clearStr.charAt(i) !== clearStr.substr(-i - 1, 1)) {
      return false;
    }
  }
  return true;
}

function recognizeNum(str) {
  const numberStr = String(str).replace(/[^0-9]/g, "");
  return parseInt(numberStr);
}

// Строка короче 20 символов
//console.log(strLenCheck("проверяемая строка", 20)); // true
// Длина строки ровно 18 символов
//console.log(strLenCheck("проверяемая строка", 18)); // true
// Строка длиннее 10 символов
//console.log(strLenCheck("проверяемая строка", 10)); // false
//-----------------
//console.log(palindromeCheck("Лёша на полке клопа нашёл "));
//---------------
//console.log(recognizeNum("2023 год")); // 2023
//console.log(recognizeNum("ECMAScript 2022")); // 2022
//console.log(recognizeNum("1 кефир, 0.5 батона")); // 105
//console.log(recognizeNum("агент 007")); // 7
//console.log(recognizeNum("а я томат")); // NaN
//console.log(recognizeNum(2023)); // 2023
//console.log(recognizeNum(-1)); // 2023
//console.log(recognizeNum(1.5)); // 2023
